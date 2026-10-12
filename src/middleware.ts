import { defineMiddleware } from "astro:middleware";
import { getLocale, languages } from "./i18n/ui";

// Static localized routes and LocaleRedirect own the routing decisions.
// A server redirect here would bypass the browser's saved language preference.
export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();

  // Astro may assign a page response's HTML content type after middleware.
  const contentType = response.headers.get("content-type");
  if (contentType === null || contentType.includes("text/html")) {
    const locale = getLocale(context.url);
    response.headers.set("Content-Language", languages[locale].htmlLang);
  }

  return response;
});
