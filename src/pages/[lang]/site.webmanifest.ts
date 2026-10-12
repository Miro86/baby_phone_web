import type { APIRoute } from "astro";
import { languageManifest } from "../../utils/manifest";
import { supportedLocales, type Locale } from "../../i18n/ui";
export function getStaticPaths() { return supportedLocales.map((lang) => ({ params: { lang } })); }
export const GET: APIRoute = ({ params }) => languageManifest(params.lang as Locale);
