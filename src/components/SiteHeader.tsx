import { useEffect, useMemo, useRef, useState } from "react";
import { Code2, Moon, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import Button from "@/components/Button";
import Container from "@/components/Container";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

const homeAnchors = [
  { label: "Benefícios", href: "#beneficios" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Prova social", href: "#prova-social" },
];

type GoogleSession = {
  accessToken: string;
  profile: { name?: string; email?: string; picture?: string };
};

function loadStoredSession(): GoogleSession | null {
  try {
    const raw = localStorage.getItem("bytecraft_google_session");
    return raw ? (JSON.parse(raw) as GoogleSession) : null;
  } catch {
    return null;
  }
}

function clearStoredSession() {
  localStorage.removeItem("bytecraft_google_session");
}

function storeSession(session: GoogleSession) {
  localStorage.setItem("bytecraft_google_session", JSON.stringify(session));
}

function getGoogle() {
  return (window as unknown as { google?: any }).google;
}

async function loadGoogleIdentityServices(): Promise<void> {
  if (getGoogle()?.accounts) return;

  const existing = document.querySelector('script[data-google-identity="true"]') as HTMLScriptElement | null;
  if (!existing) {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.dataset.googleIdentity = "true";
    document.head.appendChild(script);
  }

  const start = Date.now();
  while (!getGoogle()?.accounts?.oauth2?.initTokenClient) {
    if (Date.now() - start > 8000) throw new Error("Google Identity Services not available.");
    await new Promise((r) => setTimeout(r, 50));
  }
}

export default function SiteHeader() {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const clientId = useMemo(() => import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "", []);
  const [googleReady, setGoogleReady] = useState(false);
  const [session, setSession] = useState<GoogleSession | null>(() => loadStoredSession());
  const [loadingLogin, setLoadingLogin] = useState(false);

  const tokenClientRef = useRef<any>(null);

  const isHome = location.pathname === "/";
  const anchorBase = isHome ? "" : "/";

  useEffect(() => {
    if (!clientId) return;
    let cancelled = false;
    loadGoogleIdentityServices()
      .then(() => {
        if (!cancelled) setGoogleReady(true);
      })
      .catch(() => {
        if (!cancelled) setGoogleReady(false);
      });
    return () => {
      cancelled = true;
    };
  }, [clientId]);

  useEffect(() => {
    if (!clientId || !googleReady) return;
    if (tokenClientRef.current) return;

    const google = getGoogle();
    if (!google?.accounts?.oauth2?.initTokenClient) return;

    tokenClientRef.current = google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "openid email profile",
      callback: async (tokenResponse: { access_token?: string; error?: string }) => {
        try {
          if (tokenResponse?.error) throw new Error(tokenResponse.error);
          const accessToken = tokenResponse?.access_token;
          if (!accessToken) throw new Error("missing_access_token");

          const res = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          if (!res.ok) throw new Error("userinfo_failed");
          const profile = (await res.json()) as { name?: string; email?: string; picture?: string };

          const nextSession: GoogleSession = { accessToken, profile };
          storeSession(nextSession);
          setSession(nextSession);
        } catch {
          clearStoredSession();
          setSession(null);
        } finally {
          setLoadingLogin(false);
        }
      },
    });
  }, [clientId, googleReady]);

  function handleLogin() {
    if (!clientId || !googleReady || !tokenClientRef.current) return;
    setLoadingLogin(true);
    tokenClientRef.current.requestAccessToken({ prompt: "consent" });
  }

  function handleLogout() {
    const accessToken = session?.accessToken;
    clearStoredSession();
    setSession(null);
    if (!accessToken) return;

    const google = getGoogle();
    google?.accounts?.oauth2?.revoke?.(accessToken, () => {});
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-slate-900/10 dark:border-slate-200/10",
        "bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50",
        "dark:bg-[#0B1020]/70 dark:supports-[backdrop-filter]:bg-[#0B1020]/50",
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-400 shadow-sm shadow-violet-900/30">
            <Code2 className="h-5 w-5 text-white" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">ByteCraft</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {homeAnchors.map((a) =>
            isHome ? (
              <a
                key={a.href}
                href={a.href}
                className="rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-900/5 hover:text-slate-900 dark:text-slate-200/80 dark:hover:bg-white/5 dark:hover:text-slate-100"
              >
                {a.label}
              </a>
            ) : (
              <Link
                key={a.href}
                to={`${anchorBase}${a.href}`}
                className="rounded-lg px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-900/5 hover:text-slate-900 dark:text-slate-200/80 dark:hover:bg-white/5 dark:hover:text-slate-100"
              >
                {a.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-900/10 bg-slate-900/5 text-slate-900 transition hover:bg-slate-900/10 dark:border-slate-200/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
            aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {session ? (
            <Button variant="secondary" onClick={handleLogout} title={session.profile.email ?? "Sair"}>
              Sair
            </Button>
          ) : (
            <Button
              variant="secondary"
              onClick={handleLogin}
              disabled={!clientId || !googleReady || loadingLogin}
              title={!clientId ? "Defina VITE_GOOGLE_CLIENT_ID" : !googleReady ? "Carregando Google..." : "Entrar com Google"}
            >
              {loadingLogin ? "Abrindo..." : "Login"}
            </Button>
          )}

          <Link to="/contato">
            <Button variant="primary">Contato</Button>
          </Link>
        </div>
      </Container>
    </header>
  );
}

