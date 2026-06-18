import { NextResponse, type NextRequest } from "next/server";
import { LANG_COOKIE, detectLangFromAcceptLanguage } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();

  if (!request.cookies.get(LANG_COOKIE)) {
    const lang = detectLangFromAcceptLanguage(
      request.headers.get("accept-language")
    );
    response.cookies.set(LANG_COOKIE, lang, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|logo.webp|opengraph-image|.*\\.(?:webp|png|jpg|jpeg|svg|ico|css|js|map)).*)",
  ],
};
