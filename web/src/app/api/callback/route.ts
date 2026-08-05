import { NextResponse, type NextRequest } from "next/server";
import {
  STATE_COOKIE,
  handshakePage,
  isSecureOrigin,
  readConfig,
  safeEqual,
} from "@/lib/cmsAuth";

/**
 * Step two of the content portal login (WO-63).
 *
 * GitHub redirects the popup here with a short-lived `code`. That code is worth nothing
 * on its own — it has to be exchanged for an access token using the client *secret*,
 * which is why this runs on the server. The token then goes to the CMS window by
 * `postMessage`; it is never written to a cookie, a URL or the page body.
 */
export async function GET(request: NextRequest) {
  const result = readConfig();
  if ("error" in result) {
    return new NextResponse(result.error, {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
  const { clientId, clientSecret, siteUrl } = result.config;

  const page = (body: { token: string } | { error: string }, status = 200) => {
    const response = new NextResponse(handshakePage(siteUrl, body), {
      status,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        // The response carries an access token; never let it be stored or shared.
        "Cache-Control": "no-store, max-age=0",
        // No Referrer-Policy here on purpose: next.config.ts sends security headers for
        // "/(.*)", which wins over anything set on the response, so a stricter value
        // here would look load-bearing while doing nothing. The site-wide
        // strict-origin-when-cross-origin already keeps this URL's `code` and `state`
        // out of cross-origin referrers, which is the property that matters.
      },
    });
    // One-time value: clear it whichever way the exchange went.
    response.cookies.set(STATE_COOKIE, "", {
      httpOnly: true,
      secure: isSecureOrigin(siteUrl),
      sameSite: "lax",
      path: "/api",
      maxAge: 0,
    });
    return response;
  };

  const params = request.nextUrl.searchParams;

  // GitHub reports a refused consent screen here rather than by status code.
  const oauthError = params.get("error");
  if (oauthError) {
    return page({
      error: params.get("error_description") ?? oauthError,
    });
  }

  const code = params.get("code");
  const state = params.get("state");
  const expectedState = request.cookies.get(STATE_COOKIE)?.value;

  if (!code || !state || !expectedState || !safeEqual(state, expectedState)) {
    // Deliberately one message for every failure mode: a caller probing this endpoint
    // learns nothing about which half of the check it failed.
    return page({ error: "Login session expired or invalid. Please try again." }, 400);
  }

  let token: string;
  try {
    const exchange = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: `${siteUrl}/api/callback`,
      }),
      cache: "no-store",
    });

    if (!exchange.ok) {
      return page({ error: `GitHub rejected the token exchange (${exchange.status}).` });
    }

    const data = (await exchange.json()) as {
      access_token?: string;
      error?: string;
      error_description?: string;
    };

    // GitHub answers 200 with an error body when the code is stale or already spent.
    if (data.error || !data.access_token) {
      return page({ error: data.error_description ?? data.error ?? "No access token returned." });
    }
    token = data.access_token;
  } catch {
    return page({ error: "Could not reach GitHub to complete sign-in." });
  }

  return page({ token });
}
