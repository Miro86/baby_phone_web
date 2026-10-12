import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import vm from "node:vm";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(path.join(root, "package.json"));
const ts = require("typescript");
const compiler = require("@astrojs/compiler-rs");
const postcss = require("postcss");
const locales = ["de", "en", "fr", "it", "es", "hr", "sr"];
const productNames = {
  de: "Baby Phone: Tiergeräusche",
  en: "Baby Phone: Animal Sounds",
  fr: "Baby Phone: Sons d'animaux",
  it: "Baby Phone: Versi degli animali",
  es: "Baby Phone: Sonidos de animales",
  hr: "Baby Phone: Zvukovi životinja",
  sr: "Baby Phone: Звукови животиња",
};
const read = (file) => fs.readFile(path.join(root, file), "utf8");
const catalogs = Object.fromEntries(await Promise.all(locales.map(async (locale) => [locale, JSON.parse(await read('src/i18n/locales/' + locale + '.json'))])));
const keys = Object.keys(catalogs.en).sort();
const placeholders = (copy) => [...copy.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();
for (const locale of locales) {
  assert.deepEqual(Object.keys(catalogs[locale]).sort(), keys, 'Catalog coverage: ' + locale);
  for (const key of keys) {
    assert.ok(catalogs[locale][key].trim(), locale + ': empty ' + key);
    assert.deepEqual(placeholders(catalogs[locale][key]), placeholders(catalogs.en[key]), locale + ': placeholders ' + key);
    if (catalogs.en[key].includes(productNames.en)) {
      assert.ok(catalogs[locale][key].includes(productNames[locale]), locale + ': product name ' + key);
      const withoutName = catalogs[locale][key].replaceAll(productNames[locale], '');
      assert.ok(!/Baby Phone\s*:/.test(withoutName), locale + ': nonstandard product name ' + key);
    }
    if (locale !== 'en') assert.ok(!catalogs[locale][key].includes(productNames.en), locale + ': untranslated product name ' + key);
  }
  assert.equal('Baby Phone: ' + catalogs[locale].m202, productNames[locale]);
  assert.equal(catalogs[locale].m415, 'Baby Phone', locale + ': preserve the English product brand');
}
for (const key of ['m135', 'm136', 'm231', 'm388']) {
  assert.match(catalogs.sr[key], /[А-Яа-я]/u, 'Serbian navigation must use Cyrillic: ' + key);
  assert.ok(!/[A-Za-z]/.test(catalogs.sr[key]));
}
const files = [];
async function walk(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(file);
    else files.push(file);
  }
}
await walk(path.join(root, 'src'));
for (const file of files.filter((file) => /\.(astro|ts)$/.test(file))) {
  const source = await fs.readFile(file, 'utf8');
  for (const match of source.matchAll(/\bt\("(m\d{3})"/g)) assert.ok(keys.includes(match[1]), file + ': unknown key ' + match[1]);
  if (file.endsWith('.astro')) {
    const result = compiler.transform(source, { filename: path.relative(root, file).replaceAll('\\', '/'), internalURL: 'astro/runtime/server/index.js' });
    assert.deepEqual(result.diagnostics.filter((entry) => entry.severity === 'error' || entry.severity === 1), [], file);
  } else {
    const result = ts.transpileModule(source, { reportDiagnostics: true, compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext } });
    assert.deepEqual(result.diagnostics.filter((entry) => entry.category === ts.DiagnosticCategory.Error), [], file);
  }
}
postcss.parse(await read('src/styles/global.css'));
assert.match(await read('astro.config.mjs'), /routing:\s*"manual"/);
assert.ok(existsSync(path.join(root, 'src/middleware.ts')), 'Manual i18n requires a registered src/middleware.ts');
for (const base of ['/', '/mini-dodo/']) {
  const cache = new Map();
  function load(file) {
    file = path.resolve(file);
    if (cache.has(file)) return cache.get(file).exports;
    const module = { exports: {} };
    cache.set(file, module);
    if (file.endsWith('.json')) module.exports = JSON.parse(readFileSync(file, 'utf8'));
    else {
      const source = readFileSync(file, 'utf8').replaceAll('import.meta.env.BASE_URL', JSON.stringify(base));
      const code = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, esModuleInterop: true } }).outputText;
      const relativeRequire = (specifier) => {
        if (specifier === "astro:middleware") return { defineMiddleware: (handler) => handler };
        let target = path.resolve(path.dirname(file), specifier);
        if (!existsSync(target)) target += '.ts';
        return load(target);
      };
      const run = new vm.Script('(function(require,module,exports){' + code + '\n})').runInThisContext();
      run(relativeRequire, module, module.exports);
    }
    return module.exports;
  }
  const ui = load(path.join(root, 'src/i18n/ui.ts'));
  const urls = load(path.join(root, 'src/utils/urls.ts'));
  const data = load(path.join(root, 'src/data/app.ts'));
  const seo = load(path.join(root, 'src/utils/seo.ts'));
  const { onRequest } = load(path.join(root, 'src/middleware.ts'));
  assert.equal(typeof onRequest, 'function');
  assert.equal(ui.defaultLocale, 'de');
  assert.deepEqual([...ui.supportedLocales], locales);
  assert.deepEqual(Object.keys(ui.languageNames), locales);
  for (const locale of locales) {
    assert.deepEqual(Object.keys(ui.languageNames[locale]), locales);
    const displayNames = new Intl.DisplayNames(ui.languages[locale].htmlLang, { type: 'language' });
    for (const candidate of locales) {
      const label = ui.languageNames[locale][candidate];
      assert.equal(label.toLocaleLowerCase(locale), displayNames.of(candidate).toLocaleLowerCase(locale), locale + ': language label ' + candidate);
      if (locale === 'sr') assert.match(label, /^[\p{Script=Cyrillic}]+$/u);
    }
    const t = ui.createTranslator(locale);
    assert.equal(ui.productName(locale), productNames[locale]);
    const app = seo.appSchema(new URL(base + locale + '/', 'https://example.test'), locale);
    assert.equal(app.name, productNames[locale]);
    assert.equal(app.description, t('m297'));
    assert.ok(app.description.includes(productNames[locale]));
    for (const key of keys) t(key, Object.fromEntries(placeholders(catalogs.en[key]).map((parameter) => [parameter, parameter === 'languages' ? 'A, B' : 5])));
    for (const page of urls.pageKeys) {
      const expected = base + locale + '/' + (page === 'home' ? '' : page + '/');
      assert.equal(urls.pagePath(page, locale), expected);
      assert.equal(ui.getLocale(new URL(expected, 'https://example.test')), locale);
      assert.equal(urls.pageKeyFromUrl(new URL(expected, 'https://example.test')), page);
    }
    assert.equal(urls.localizedPath('features/#download', locale), base + locale + '/features/#download');
    assert.equal(urls.localizedPath('favicon.png', locale), base + 'favicon.png');
    const htmlResponse = new Response('<!doctype html>', { headers: { 'Content-Type': 'text/html' } });
    const context = { url: new URL(base + locale + '/features/', 'https://example.test') };
    assert.equal(await onRequest(context, async () => htmlResponse), htmlResponse);
    assert.equal(htmlResponse.headers.get('Content-Language'), ui.languages[locale].htmlLang);
    assert.equal(context.url.pathname, base + locale + '/features/');
    assert.equal(data.getAppData(locale).appFaqs.length, 8);
    assert.equal(data.getAppData(locale).parentFaqs.length, 8);
    assert.equal(data.getAppData(locale).categories.length, 5);
    assert.ok(!ui.legalDate(locale).includes('Invalid'));
  }
  const entryContext = { url: new URL(base, 'https://example.test'), request: new Request('https://example.test', { headers: { 'Accept-Language': 'fr' } }) };
  const entryResponse = new Response(null);
  assert.equal(await onRequest(entryContext, async () => entryResponse), entryResponse);
  assert.equal(entryResponse.status, 200);
  assert.equal(entryResponse.headers.get('Content-Language'), 'de');
  for (const contentType of ['application/manifest+json', 'text/plain', 'image/png']) {
    const response = new Response('', { headers: { 'Content-Type': contentType } });
    assert.equal(await onRequest(entryContext, async () => response), response);
    assert.equal(response.headers.get('Content-Language'), null);
  }
  assert.equal(ui.getLocale(new URL(base, 'https://example.test')), 'de');
  assert.equal(ui.isLocale('__proto__'), false);
  assert.throws(() => ui.createTranslator('de')('missing'));
}
for (const file of ['nunito-latin.woff2', 'nunito-latin-ext.woff2', 'nunito-cyrillic.woff2']) assert.equal(readFileSync(path.join(root, 'public/fonts', file)).subarray(0, 4).toString(), 'wOF2');
console.log('Passed: seven complete catalogs, 49 localized language labels, exact localized product names and app metadata, placeholders, Cyrillic navigation with English product branding, Astro/TypeScript syntax, CSS, localized URLs with and without a base path, app facts, legal dates, font files, and registered manual middleware behavior.');
