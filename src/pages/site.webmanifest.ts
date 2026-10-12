import type { APIRoute } from "astro";
import { languageManifest } from "../utils/manifest";
import { defaultLocale } from "../i18n/ui";
export const GET: APIRoute = () => languageManifest(defaultLocale);
