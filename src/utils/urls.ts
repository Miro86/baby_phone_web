const normalizedBase = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

export function withBase(path = "") {
  const cleanPath = path.replace(/^\/+/, "");
  return `${normalizedBase}${cleanPath}`;
}
