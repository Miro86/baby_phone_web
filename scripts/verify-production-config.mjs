import assert from "node:assert/strict";
import fs from "node:fs/promises";

// Fail before uploading if stale repository variables would publish a subdirectory site.
const expected = "https://minidodoapps.de";
const site = new URL(process.env.SITE_URL ?? expected);
assert.equal(
  site.href,
  `${expected}/`,
  "Production SITE_URL must be https://minidodoapps.de",
);
assert.equal(
  process.env.BASE_PATH ?? "/",
  "/",
  "Production BASE_PATH must be /",
);
assert.equal(
  (await fs.readFile("public/CNAME", "utf8")).trim(),
  site.hostname,
  "CNAME must match the canonical production host",
);
console.log("Verified production host minidodoapps.de and root base path.");
