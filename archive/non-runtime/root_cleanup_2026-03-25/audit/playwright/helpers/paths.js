const crypto = require("crypto");
const fs = require("fs/promises");

async function ensureDir(pathToDir) {
  await fs.mkdir(pathToDir, { recursive: true });
}

function sanitizeSegment(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function shortHash(value) {
  return crypto.createHash("sha1").update(value).digest("hex").slice(0, 8);
}

function slugifyUrl(urlValue) {
  const url = new URL(urlValue);
  const pathname = url.pathname.replace(/\/$/, "");
  const pathPart = pathname === "" ? "homepage" : pathname.split("/").filter(Boolean).join("-");

  const host = sanitizeSegment(url.hostname);
  const pathSlug = sanitizeSegment(pathPart || "homepage");
  const querySuffix = url.search ? "-q-" + shortHash(url.search) : "";

  return `${host}-${pathSlug}${querySuffix}`;
}

module.exports = {
  ensureDir,
  slugifyUrl
};
