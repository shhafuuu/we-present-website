import { NextResponse, type NextRequest } from "next/server";
import {
  PROVIDER,
  STATE_COOKIE,
  isSecureOrigin,
  readConfig,
  resolveScope,
} from "@/lib/cmsAuth";

/**
 * Step one of the content portal login (WO-63).
 *
 * Decap opens this in a popup as `/api/auth?provider=github&site_id=…&scope=…`. All it
 * does is bounce the editor to GitHub's consent screen with a one-time `state` value,
 * which is also stored in an httpOnly cookie so `/api/callback` can prove the reply
 * belongs to a request this site actually made.
 */
export async function GET(request: NextRequest) {
  const result = readConfig();
  if ("error" in result) {
    return new NextResponse(result.error, {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
  const { clientId, siteUrl } = result.config;

  const provider = request.nextUrl.searchParams.get("provider");
  if (provider && provider !== PROVIDER) {
    return new NextResponse(`Unsupported provider: ${provider}`, {
      status: 400,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const state = crypto.randomUUID();
  const scope = resolveScope(request.nextUrl.searchParams.get("scope"));

  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.searchParams.set("client_id", clientId);
  authorize.searchParams.set("redirect_uri", `${siteUrl}/api/callback`);
  authorize.searchParams.set("scope", scope);
  authorize.searchParams.set("state", state);

  const response = NextResponse.redirect(authorize.toString());
  response.cookies.set(STATE_COOKIE, state, {
    httpOnly: true,
    secure: isSecureOrigin(siteUrl),
    // GitHub sends the editor back by top-level GET navigation, which Lax allows and
    // Strict would not — the cookie would be withheld and every login would fail.
    sameSite: "lax",
    path: "/api",
    maxAge: 600,
  });
  return response;
}
