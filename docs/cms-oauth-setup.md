# Turning on the content portal login

Everything in the repository is done (WO-63). What is left is a one-time setup in
GitHub and in the hosting platform, which only someone with COATI organisation access
can do. Budget ten minutes.

Once this is finished, the client edits the site at `https://wepresent.org/admin` — tour
dates, resort copy, prices — with no developer involved.

---

## 1. Register the OAuth App

**GitHub → the COATI organisation → Settings → Developer settings → OAuth Apps → New OAuth App**

| Field | Value |
|---|---|
| Application name | We Present content portal |
| Homepage URL | `https://wepresent.org` |
| Authorization callback URL | `https://wepresent.org/api/callback` |

Register it under the **COATI organisation**, not a personal account — the client owns
this at handover, and an app tied to an individual's account has to be rebuilt when that
person leaves.

## 2. Copy the credentials

Copy the **Client ID**, then press **Generate a new client secret** and copy that too.
The secret is shown once; if it is lost, generate another and update step 3.

## 3. Set three environment variables on the host

| Variable | Value |
|---|---|
| `GITHUB_OAUTH_CLIENT_ID` | the Client ID from step 2 |
| `GITHUB_OAUTH_CLIENT_SECRET` | the client secret from step 2 |
| `SITE_URL` | `https://wepresent.org` |

`SITE_URL` must be the site's own origin with **no trailing slash**, and must match
`base_url` in `web/public/admin/config.yml`. Decap only accepts the access token from a
message whose origin matches that value exactly, so a wrong value fails closed — it
cannot leak a token, it simply will not log anyone in.

**The client secret is a credential.** It belongs in the host's environment settings and
nowhere else — never in the repository, never in `config.yml`, never in a commit. If one
is ever committed, rotate it in GitHub; deleting the commit does not un-expose it.

## 4. Redeploy, then sign in

Environment variables only take effect on a new deploy. After redeploying, go to
`https://wepresent.org/admin` and sign in with a GitHub account that has write access to
the site's repository.

---

## A second app for local development

Register a **separate** OAuth App with callback `http://localhost:3000/api/callback`
rather than adding localhost to the production app. A single app can only hold one
callback URL, and pointing the production app at localhost would break the live portal.

Local editing does not actually need any of this: `local_backend: true` in `config.yml`
lets the CMS run against real repository files via `npx decap-server`, with no OAuth at
all. That line is safe to leave in production — verified against the Decap bundle, the
local proxy is only ever contacted when the hostname is `localhost` or `127.0.0.1`.

---

## If something goes wrong

**"Content portal login is not configured: missing …"** — exactly what it says. One or
more of the three variables is not reaching the running app. Check spelling, and check
the deploy actually picked them up.

**The popup opens, GitHub asks for consent, then nothing happens.** Almost always
`SITE_URL` not matching the site's real origin, or `base_url` in `config.yml` disagreeing
with it. Both must be the bare origin, no trailing slash, no path.

**"Login session expired or invalid."** The one-time `state` did not come back intact.
Usually a stale tab left open for more than ten minutes — just try again. If it happens
every time, something is stripping cookies between the site and GitHub.

---

## Before relying on any of this

**Check that github.com is reachable from a Russian network without a VPN.** The client's
editors are in Moscow and St Petersburg. If GitHub is not reachable, this whole approach
fails and the backend has to move to GitLab (which needs no handler) or a self-hosted
Gitea. Worth testing early, before the handover depends on it.

## At handover

Two values still point at the current development setup and must be repointed when the
repository moves to the COATI organisation:

- `backend.repo` in `web/public/admin/config.yml` — currently `shhafuuu/we-present-website`
- `base_url` in the same file, and `SITE_URL` in the host environment, if the final
  domain differs from `wepresent.org`

Separately, publishing from the portal only reaches the live site after a rebuild. Wire
the host to rebuild on push to `main` — see item 10 in
[handover-blocked-items.md](handover-blocked-items.md).
