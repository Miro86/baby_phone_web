import assert from "node:assert/strict";

// Read-only checks against the actual hosted HTML, without executing JavaScript.
// Optional origin supports checking a local production preview before release.
const target = new URL(process.argv[2] ?? "https://minidodoapps.de/");
const site = new URL("https://minidodoapps.de/");
assert.equal(
  target.pathname,
  "/",
  "This release must be served at the domain root",
);
const locales = ["de", "en", "fr", "it", "es", "hr", "sr"];
const slugs = ["", "features/", "parents/", "contact/", "privacy/", "terms/"];
const routes = locales.flatMap((locale) =>
  slugs.map((slug) => `${locale}/${slug}`),
);
const store =
  "https://play.google.com/store/apps/details?id=de.minidodoapps.babyphone";
const issues = [];
const documents = new Map();
const assets = new Set();
const fragments = [];
const graph = (html) =>
  JSON.parse(
    html.match(
      /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/,
    )?.[1] ?? "null",
  )?.["@graph"];
const tags = (html, name) =>
  [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "g"))].map((match) =>
    Object.fromEntries(
      [...match[0].matchAll(/([\w:-]+)="([^"]*)"/g)].map((attribute) => [
        attribute[1],
        attribute[2].replaceAll("&amp;", "&"),
      ]),
    ),
  );
const meta = (html, name) =>
  tags(html, "meta").find((tag) => tag.name === name || tag.property === name)
    ?.content;
const url = (path) => new URL(path, site).href;
async function request(path, options = {}) {
  const response = await fetch(new URL(path, target), {
    redirect: "manual",
    signal: AbortSignal.timeout(20000),
    ...options,
  });
  return {
    response,
    body: options.method === "HEAD" ? "" : await response.text(),
  };
}
async function check(label, task) {
  try {
    await task();
  } catch (error) {
    issues.push(`${label}: ${error.message}`);
  }
}
async function parallel(items, task) {
  const queue = [...items];
  await Promise.all(
    Array.from({ length: Math.min(6, queue.length) }, async () => {
      while (queue.length) await task(queue.shift());
    }),
  );
}
function identity(html) {
  const nodes = graph(html);
  assert.ok(nodes, "Missing JSON-LD graph");
  const organization = nodes.find((node) => node["@type"] === "Organization");
  const website = nodes.find((node) => node["@type"] === "WebSite");
  assert.equal(organization?.name, "Mini Dodo");
  assert.equal(organization["@id"], url("#organization"));
  assert.equal(organization.founder?.name, "Danijela Devedlaka");
  assert.equal(organization.address?.streetAddress, "Oberer Hoppenlauweg 10");
  assert.equal(organization.address.postalCode, "70174");
  assert.equal(organization.address.addressLocality, "Stuttgart");
  assert.equal(organization.address.addressCountry, "DE");
  assert.equal(website?.name, "Mini Dodo");
  assert.equal(website["@id"], url("#website"));
  assert.equal(website.url, site.href);
  assert.equal(website.publisher["@id"], organization["@id"]);
  return nodes;
}
function discover(html, page) {
  for (const tag of tags(html, "a")) {
    if (!tag.href || /^(mailto:|tel:)/.test(tag.href)) continue;
    const target = new URL(tag.href, url(page));
    if (target.origin !== site.origin) continue;
    if (target.hash) fragments.push({ page, target });
    if (!routes.includes(target.pathname.slice(1)) && target.pathname !== "/")
      assets.add(target.pathname);
  }
  for (const tag of [
    ...tags(html, "img"),
    ...tags(html, "source"),
    ...tags(html, "script"),
    ...tags(html, "link"),
  ]) {
    const candidates = [
      tag.src,
      ...(tag.srcset?.split(",").map((entry) => entry.trim().split(/\s+/)[0]) ??
        []),
    ];
    if (
      tag.href &&
      [
        "icon",
        "apple-touch-icon",
        "manifest",
        "stylesheet",
        "preload",
      ].includes(tag.rel)
    )
      candidates.push(tag.href);
    for (const candidate of candidates.filter(Boolean)) {
      if (candidate.startsWith("data:")) continue;
      const target = new URL(candidate, url(page));
      if (target.origin === site.origin) assets.add(target.pathname);
    }
  }
}
await parallel(routes, (route) =>
  check(route, async () => {
    const { response, body } = await request(route);
    assert.equal(response.status, 200, "Expected HTTP 200");
    documents.set(route, body);
    assert.match(response.headers.get("content-type") ?? "", /text\/html/);
    const locale = route.split("/")[0];
    assert.match(
      body,
      new RegExp(`<html lang="${locale === "sr" ? "sr-Cyrl" : locale}"`),
    );
    assert.equal((body.match(/<h1(?:\s|>)/g) ?? []).length, 1);
    assert.match(body, /<title>[^<]+<\/title>/);
    for (const key of [
      "description",
      "og:title",
      "og:description",
      "og:image",
      "twitter:title",
      "twitter:description",
      "twitter:image",
    ])
      assert.ok(meta(body, key), `Missing ${key}`);
    assert.equal(meta(body, "og:site_name"), "Mini Dodo");
    assert.equal(meta(body, "og:url"), url(route));
    assert.ok(
      !meta(body, "robots")?.includes("noindex"),
      "Public page is noindex",
    );
    const links = tags(body, "link");
    assert.equal(
      links.find((link) => link.rel === "canonical")?.href,
      url(route),
    );
    const alternates = links.filter(
      (link) => link.rel === "alternate" && link.hreflang,
    );
    assert.equal(alternates.length, 8);
    for (const candidate of locales)
      assert.ok(
        alternates.some(
          (link) =>
            link.hreflang === (candidate === "sr" ? "sr-Cyrl" : candidate) &&
            link.href === url(route.replace(/^[^/]+/, candidate)),
        ),
        `Missing alternate ${candidate}`,
      );
    assert.ok(
      alternates.some(
        (link) =>
          link.hreflang === "x-default" &&
          link.href === url(route.replace(/^[^/]+/, "de")),
      ),
    );
    const nodes = identity(body);
    if (route.endsWith("/contact/")) {
      assert.match(body, /Danijela Devedlaka/);
      assert.match(body, /Oberer Hoppenlauweg 10/);
      assert.match(body, /70174/);
      assert.match(body, /Stuttgart/);
    }
    const webpage = nodes.find((node) =>
      ["WebPage", "ContactPage"].includes(node["@type"]),
    );
    assert.equal(webpage?.url, url(route));
    assert.equal(webpage.isPartOf["@id"], url("#website"));
    const app = nodes.find((node) => node["@type"] === "MobileApplication");
    if (app) {
      assert.equal(app["@id"], url("features/#baby-phone"));
      assert.equal(app.publisher["@id"], url("#organization"));
      assert.equal(app.installUrl, store);
      assert.equal(app.operatingSystem, "Android");
      assert.equal(app.url, url(`${locale}/features/`));
      assert.equal(app.offers, undefined);
      assert.equal(app.aggregateRating, undefined);
      assert.ok(tags(body, "a").some((tag) => tag.href === store));
      assert.ok(
        !tags(body, "a").some((tag) => tag.href?.includes("apps.apple.com")),
        "iOS is not published",
      );
    }
    discover(body, route);
  }),
);
await check("sitemap", async () => {
  const index = await request("sitemap-index.xml");
  assert.equal(index.response.status, 200);
  assert.ok(index.body.includes(url("sitemap-0.xml")));
  const { response, body } = await request("sitemap-0.xml");
  assert.equal(response.status, 200);
  assert.deepEqual(
    new Set(
      [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]),
    ),
    new Set(routes.map(url)),
  );
  for (const entry of body.matchAll(/<url>([\s\S]*?)<\/url>/g))
    assert.equal((entry[1].match(/hreflang=/g) ?? []).length, 8);
});
await check("robots.txt", async () => {
  const { response, body } = await request("robots.txt");
  assert.equal(response.status, 200);
  assert.match(body, /User-agent: \*\s+Allow: \//);
  assert.ok(body.includes(url("sitemap-index.xml")));
  assert.ok(!body.includes("Disallow: /"));
});
for (const path of ["llms.txt", "llms-full.txt"])
  await check(path, async () => {
    const { response, body } = await request(path);
    assert.equal(response.status, 200);
    assert.ok(body.includes(store));
    assert.match(body, /iOS.*coming soon/);
    assert.ok(body.includes(url("en/")));
  });
for (const slug of slugs)
  await check(`Original URL /${slug}`, async () => {
    const { response, body } = await request(slug);
    assert.equal(response.status, 200);
    assert.ok(meta(body, "robots")?.includes("noindex"));
    assert.equal(
      tags(body, "link").find((tag) => tag.rel === "canonical")?.href,
      url(`de/${slug}`),
    );
    assert.match(body, /location\.replace/);
    if (!slug) identity(body);
  });
await check("404", async () => {
  const { response, body } = await request("__minidodo_missing_page__/");
  assert.equal(response.status, 404);
  assert.ok(meta(body, "robots")?.includes("noindex"));
  assert.match(body, /Mini Dodo/);
});
await parallel(locales, (locale) =>
  check(`${locale}/404/`, async () => {
    const { response, body } = await request(`${locale}/404/`);
    assert.equal(
      response.status,
      200,
      "Direct localized error document must exist",
    );
    assert.ok(meta(body, "robots")?.includes("noindex"));
    assert.match(
      body,
      new RegExp(`<html lang="${locale === "sr" ? "sr-Cyrl" : locale}"`),
    );
  }),
);
await parallel([...assets], (asset) =>
  check(asset, async () => {
    const { response } = await request(asset, { method: "HEAD" });
    assert.equal(response.status, 200, "Broken internal asset/link");
  }),
);
for (const { page, target } of fragments)
  await check(`Fragment on /${page}`, async () => {
    const document = documents.get(target.pathname.slice(1));
    if (!document) return; // Non-content endpoints were checked above.
    assert.ok(
      tags(document, "[a-z][a-z0-9]*").some(
        (tag) => tag.id === decodeURIComponent(target.hash.slice(1)),
      ),
      `Missing ${target.href}`,
    );
  });
if (target.origin === site.origin) {
  for (const origin of [
    "https://www.minidodoapps.de",
    "http://minidodoapps.de",
  ])
    await check(`Redirect ${origin}`, async () => {
      const path = "/en/features/?redirect-check=1";
      const { response } = await request(origin + path);
      assert.equal(response.status, 301);
      assert.equal(response.headers.get("location"), site.origin + path);
    });
  await check("GitHub Pages alias", async () => {
    const { response } = await request(
      "https://miro86.github.io/baby_phone_web/en/features/",
    );
    assert.equal(response.status, 301);
    assert.equal(response.headers.get("location"), url("en/features/"));
  });
}
console.log(
  `Checked ${routes.length} localized pages, ${assets.size} assets/internal destinations, crawler files, original entry URLs and 404 on ${target.origin}.`,
);
if (issues.length) {
  for (const issue of issues) console.error(`FAIL ${issue}`);
  process.exitCode = 1;
} else
  console.log(
    "Production HTTP/HTML checks passed. Search Console indexing, official validators, browser interaction and PageSpeed/Core Web Vitals still require their own checks.",
  );
