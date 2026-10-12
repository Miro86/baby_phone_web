import { defaultLocale, isLocale, type Locale } from "../i18n/ui";

const normalizedBase = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export function withBase(path = "") {
  const cleanPath = path.replace(/^\/+/, "");
  return `${normalizedBase}${cleanPath}`;
}

export const pageKeys = ["home", "features", "parents", "contact", "privacy", "terms", "404"] as const;
export type PageKey = (typeof pageKeys)[number];
export function localizedPath(path = "", locale: Locale = defaultLocale) {
  const clean = path.replace(/^\/+/, "");
  const [route] = clean.split(/[?#]/);
  if (route && !pageKeys.some((page) => page !== "home" && (route === page || route === `${page}/`)) && route !== "404.html") return withBase(clean);
  return withBase(`${locale}/${clean === "404.html" ? "404/" : clean}`);
}
export function pageKeyFromUrl(url: URL): PageKey {
  const pathname = url.pathname.startsWith(normalizedBase) ? url.pathname.slice(normalizedBase.length) : url.pathname.slice(1);
  const segments = pathname.replace(/\/+$/, "").split("/");
  if (isLocale(segments[0])) segments.shift();
  const page = segments.join("/") || "home";
  return pageKeys.includes(page as PageKey) ? page as PageKey : "home";
}
export function pagePath(page: PageKey, locale: Locale) {
  return localizedPath(page === "home" ? "" : `${page}/`, locale);
}
