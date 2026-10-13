import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(process.argv[2] ?? "dist");
const locales = ["de", "en", "fr", "it", "es", "hr", "sr"];
const slugs = ["", "features/", "parents/", "contact/", "privacy/", "terms/"];
const routes = locales.flatMap((locale) =>
  slugs.map((slug) => `${locale}/${slug}`),
);
const read = (file) => fs.readFile(path.join(root, file), "utf8");
const sitemap = await read("sitemap-0.xml");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1],
);
const site = new URL(sitemapUrls[0]);
site.pathname = site.pathname.replace(/(?:de|en|fr|it|es|hr|sr)\/.*$/, "");
const store =
  "https://play.google.com/store/apps/details?id=de.minidodoapps.babyphone";
assert.deepEqual(
  new Set(sitemapUrls),
  new Set(routes.map((route) => new URL(route, site).href)),
  "Sitemap must contain all 42 localized public URLs",
);

const routeFile = (route) =>
  route === "404.html" ? route : `${route}index.html`;
const getId = (id) => id.replace(/[.*+?^\${}()|[\]\\]/g, "\\$&");

async function checkLink(value, pageUrl) {
  if (/^(mailto:|tel:|data:)/.test(value)) return;
  const url = new URL(value.replaceAll("&amp;", "&"), pageUrl);
  if (url.origin !== site.origin || !url.pathname.startsWith(site.pathname))
    return;
  const relative = decodeURIComponent(url.pathname.slice(site.pathname.length));
  const file = path.join(
    root,
    relative === "" || relative.endsWith("/")
      ? `${relative}index.html`
      : relative,
  );
  await fs
    .access(file)
    .catch(() => assert.fail(`Broken local URL: ${url.href}`));
  if (url.hash && file.endsWith(".html")) {
    const html = await fs.readFile(file, "utf8");
    assert.match(
      html,
      new RegExp(`id=["']${getId(decodeURIComponent(url.hash.slice(1)))}["']`),
      `Missing fragment: ${url.href}`,
    );
  }
}

for (const route of [...routes, ...locales.map((locale) => `${locale}/404/`)]) {
  const html = await read(routeFile(route));
  const pageUrl = new URL(route, site);
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) ?? []).length,
    1,
    `One H1 required: ${route}`,
  );
  assert.equal(
    (html.match(/<title>/g) ?? []).length,
    1,
    `One title required: ${route}`,
  );
  const locale = route.split("/")[0];
  assert.ok(
    html.includes(`<html lang="${locale === "sr" ? "sr-Cyrl" : locale}"`),
  );
  assert.match(html, /name="description" content="[^"]+"/);
  assert.match(
    html,
    /name="viewport" content="width=device-width, initial-scale=1"/,
  );
  assert.match(html, /Nunito/);
  assert.match(html, /font-display: swap/);
  // Safari 15.8 ignores entire range-syntax queries, including mobile navigation.
  for (const [, css] of html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g)) {
    assert.doesNotMatch(
      css,
      /@media\s*[^{}]*[<>]/,
      `CSS breakpoints must work in Safari 15.8: ${route}`,
    );
  }
  for (const [, media] of html.matchAll(/\bmedia="([^"]+)"/g)) {
    assert.doesNotMatch(
      media,
      /[<>]|&(?:lt|gt);/,
      `Image and stylesheet media conditions must work in Safari 15.8: ${route}`,
    );
  }
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
  assert.equal(
    canonical,
    pageUrl.href,
    `Canonical must preserve the URL: ${route}`,
  );
  if (!route.endsWith("/404/")) {
    const alternates = [
      ...html.matchAll(/rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g),
    ];
    assert.equal(alternates.length, 8);
    assert.ok(
      alternates.some(
        (match) =>
          match[1] === "x-default" &&
          match[2] === new URL(route.replace(/^[^/]+/, "de"), site).href,
      ),
    );
  }
  const json = html.match(
    /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/,
  )?.[1];
  assert.ok(json, `Structured data missing: ${route}`);
  const schema = JSON.parse(json);
  assert.equal(schema["@context"], "https://schema.org");
  assert.ok(
    schema["@graph"].some((entity) => entity["@type"] === "Organization"),
  );
  assert.ok(schema["@graph"].some((entity) => entity["@type"] === "WebSite"));
  const organization = schema["@graph"].find(
    (entity) => entity["@type"] === "Organization",
  );
  const website = schema["@graph"].find(
    (entity) => entity["@type"] === "WebSite",
  );
  assert.equal(organization.name, "Mini Dodo");
  assert.equal(organization.address.streetAddress, "Oberer Hoppenlauweg 10");
  assert.equal(organization.address.postalCode, "70174");
  assert.equal(organization.address.addressLocality, "Stuttgart");
  assert.equal(organization.address.addressCountry, "DE");
  assert.equal(organization["@id"], new URL("#organization", site).href);
  assert.equal(website.name, "Mini Dodo");
  assert.equal(website["@id"], new URL("#website", site).href);
  assert.equal(website.url, site.href);
  assert.equal(website.publisher["@id"], organization["@id"]);
  const webpage = schema["@graph"].find((entity) =>
    ["WebPage", "ContactPage"].includes(entity["@type"]),
  );
  assert.equal(webpage.isPartOf["@id"], website["@id"]);
  assert.equal(webpage.publisher["@id"], organization["@id"]);
  const app = schema["@graph"].find(
    (entity) => entity["@type"] === "MobileApplication",
  );
  if (app) {
    assert.equal(app["@id"], new URL("features/#baby-phone", site).href);
    assert.equal(app.publisher["@id"], organization["@id"]);
    assert.equal(app.url, new URL(`${locale}/features/`, site).href);
    assert.equal(app.installUrl, store);
    assert.equal(app.operatingSystem, "Android");
    assert.equal(app.aggregateRating, undefined, "Do not invent reviews");
    assert.equal(app.offers, undefined, "Do not invent pricing");
  }
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g))
    await checkLink(match[1], pageUrl);
  for (const match of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const candidate of match[1].split(","))
      await checkLink(candidate.trim().split(/\s+/)[0], pageUrl);
  }
  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    assert.match(
      match[0],
      /\balt(?:=|\s|>)/,
      "Image must have alternative text",
    );
    assert.match(match[0], /width="\d+"/, "Image must reserve width");
    assert.match(match[0], /height="\d+"/, "Image must reserve height");
  }
  if (route.endsWith("/404/")) assert.match(html, /noindex, follow/);
  else
    assert.ok(
      !html.includes('content="noindex'),
      `Public page must be indexable: ${route}`,
    );
  if (route.endsWith("/contact/")) {
    assert.match(html, /Danijela Devedlaka/);
    assert.match(html, /Oberer Hoppenlauweg 10/);
    assert.match(html, /70174/);
    assert.match(html, /Stuttgart/);
  }
}

const home = await read("en/index.html");
const entry = await read("index.html");
assert.match(entry, /noindex, follow/);
const entrySchema = JSON.parse(
  entry.match(/type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)[1],
);
assert.equal(
  entrySchema["@graph"].find((node) => node["@type"] === "WebSite").url,
  site.href,
  "Domain-root entry page must declare the same WebSite identity",
);
for (const slug of slugs) {
  const redirect = await read(`${slug}index.html`);
  assert.match(redirect, /noindex, follow/);
  assert.ok(
    redirect.includes(new URL(`de/${slug}`, site).href),
    "Preserve original URL destinations",
  );
}
const parents = await read("en/parents/index.html");
const features = await read("en/features/index.html");
assert.match(
  home,
  /id="download"/,
  "Preserve the original home download fragment",
);
assert.match(
  parents,
  /id="privacy"/,
  "Preserve the original parent privacy fragment",
);
assert.match(parents, /id="download"/);
assert.match(features, /id="download"/);
for (const file of ["llms.txt", "llms-full.txt"]) {
  const body = await read(file);
  assert.ok(body.includes(store));
  assert.match(body, /iOS/);
  assert.match(body, /coming soon/);
  assert.ok(!body.includes("https://example.com"));
}
const robots = await read("robots.txt");
assert.match(robots, /User-agent: \*\nAllow: \//);
assert.ok(robots.includes(new URL("sitemap-index.xml", site).href));
const manifest = JSON.parse(await read("site.webmanifest"));
assert.equal(manifest.start_url, `${site.pathname}de/`);
assert.equal(manifest.lang, "de");
assert.equal(manifest.icons.length, 2);
for (const icon of manifest.icons) await checkLink(icon.src, site);
console.log(
  "Verified all localized routes, fragments, local links, assets, canonicals, sitemap, structured data, crawler references, and manifest.",
);
