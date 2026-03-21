type StoredPkce = {
  state: string;
  codeVerifier: string;
  redirectUri: string;
  createdAt: number;
};

export type GoogleSession = {
  accessToken: string;
  idToken?: string;
  expiresAt: number;
  profile?: { name?: string; email?: string; picture?: string };
};

const PKCE_KEY = "rennovatech_google_pkce";
const SESSION_KEY = "rennovatech_google_session";

function baseUrlPath(): string {
  // BASE_URL comes with trailing slash in Vite builds.
  const base = import.meta.env.BASE_URL ?? "/";
  return base.endsWith("/") ? base : `${base}/`;
}

function absoluteRedirectUri(): string {
  const base = baseUrlPath();
  return new URL(`${base}oauth/callback`, window.location.origin).toString();
}

function randomString(bytes: number) {
  const data = new Uint8Array(bytes);
  crypto.getRandomValues(data);
  return Array.from(data, (b) => b.toString(16).padStart(2, "0")).join("");
}

function toBase64Url(bytes: ArrayBuffer) {
  const bin = String.fromCharCode(...new Uint8Array(bytes));
  const b64 = btoa(bin);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function sha256(input: string) {
  const data = new TextEncoder().encode(input);
  return crypto.subtle.digest("SHA-256", data);
}

async function pkceChallenge(codeVerifier: string) {
  return toBase64Url(await sha256(codeVerifier));
}

function savePkce(value: StoredPkce) {
  sessionStorage.setItem(PKCE_KEY, JSON.stringify(value));
}

function readPkce(): StoredPkce | null {
  try {
    const raw = sessionStorage.getItem(PKCE_KEY);
    return raw ? (JSON.parse(raw) as StoredPkce) : null;
  } catch {
    return null;
  }
}

function clearPkce() {
  sessionStorage.removeItem(PKCE_KEY);
}

function saveSession(session: GoogleSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession(): GoogleSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GoogleSession;
    if (!parsed?.accessToken || typeof parsed.expiresAt !== "number") return null;
    if (Date.now() > parsed.expiresAt - 30_000) {
      clearSession();
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function decodeJwtPayload(idToken: string): Record<string, unknown> | null {
  const parts = idToken.split(".");
  if (parts.length < 2) return null;
  const base64 = parts[1]!.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "===".slice((base64.length + 3) % 4);
  try {
    const json = atob(padded);
    return JSON.parse(json) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export async function startGoogleLogin(opts: { clientId: string; redirectUri?: string }) {
  const redirectUri = opts.redirectUri ?? absoluteRedirectUri();
  const state = randomString(16);
  const codeVerifier = randomString(32);
  const codeChallenge = await pkceChallenge(codeVerifier);

  savePkce({ state, codeVerifier, redirectUri, createdAt: Date.now() });

  const params = new URLSearchParams({
    client_id: opts.clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    include_granted_scopes: "true",
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
    prompt: "select_account",
  });

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  const w = window.open(authUrl, "_blank", "noopener,noreferrer");
  if (!w) {
    // Popup blocked; fallback to same-tab navigation.
    window.location.assign(authUrl);
  }
}

export async function finishGoogleLoginFromCallbackUrl(locationUrl: string, clientId: string): Promise<GoogleSession> {
  const url = new URL(locationUrl);
  const error = url.searchParams.get("error");
  if (error) throw new Error(error);

  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  if (!code || !state) throw new Error("missing_code_or_state");

  const pkce = readPkce();
  if (!pkce) throw new Error("missing_pkce");
  if (pkce.state !== state) throw new Error("invalid_state");
  if (Date.now() - pkce.createdAt > 10 * 60_000) throw new Error("pkce_expired");

  const body = new URLSearchParams({
    client_id: clientId,
    grant_type: "authorization_code",
    code,
    redirect_uri: pkce.redirectUri,
    code_verifier: pkce.codeVerifier,
  });

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!tokenRes.ok) throw new Error("token_exchange_failed");

  const tokenJson = (await tokenRes.json()) as {
    access_token?: string;
    id_token?: string;
    expires_in?: number;
    token_type?: string;
    scope?: string;
  };

  const accessToken = tokenJson.access_token;
  const expiresIn = tokenJson.expires_in ?? 3600;
  if (!accessToken) throw new Error("missing_access_token");

  const session: GoogleSession = {
    accessToken,
    idToken: tokenJson.id_token,
    expiresAt: Date.now() + expiresIn * 1000,
  };

  const payload = tokenJson.id_token ? decodeJwtPayload(tokenJson.id_token) : null;
  if (payload) {
    session.profile = {
      name: typeof payload.name === "string" ? payload.name : undefined,
      email: typeof payload.email === "string" ? payload.email : undefined,
      picture: typeof payload.picture === "string" ? payload.picture : undefined,
    };
  }

  // Fallback to userinfo if profile is incomplete.
  if (!session.profile?.email) {
    const infoRes = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (infoRes.ok) {
      const info = (await infoRes.json()) as { name?: string; email?: string; picture?: string };
      session.profile = {
        name: info.name,
        email: info.email,
        picture: info.picture,
      };
    }
  }

  clearPkce();
  saveSession(session);
  return session;
}

export async function logoutGoogle() {
  const session = getSession();
  clearSession();
  if (!session?.accessToken) return;
  try {
    await fetch(`https://oauth2.googleapis.com/revoke?token=${encodeURIComponent(session.accessToken)}`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
  } catch {
    // ignore
  }
}

