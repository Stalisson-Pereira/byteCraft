import { useEffect, useMemo, useState } from "react";
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

type GoogleProfile = {
  name?: string;
  email?: string;
  picture?: string;
};

function b64UrlDecode(input: string) {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "===".slice((base64.length + 3) % 4);
  const json = atob(padded);
  return decodeURIComponent(
    json
      .split("")
      .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join(""),
  );
}

function parseJwtPayload(credential: string): GoogleProfile | null {
  const parts = credential.split(".");
  if (parts.length < 2) return null;
  try {
    return JSON.parse(b64UrlDecode(parts[1]!)) as GoogleProfile;
  } catch {
    return null;
  }
}

function loadStoredProfile(): GoogleProfile | null {
  try {
    const raw = localStorage.getItem("bytecraft_google_profile");
    return raw ? (JSON.parse(raw) as GoogleProfile) : null;
  } catch {
    return null;
  }
}

export default function SiteHeader() {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const clientId = useMemo(() => import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "", []);
  const [profile, setProfile] = useState<GoogleProfile | null>(() => loadStoredProfile());

  const isHome = location.pathname === "/";
  const anchorBase = isHome ? "" : "/";

  useEffect(() => {
    if (!clientId) return;
    if (document.querySelector('script[data-google-identity="true"]')) return;

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.dataset.googleIdentity = "true";
    script.onload = () => {
      const g = (window as unknown as { google?: any }).google;
      if (!g?.accounts?.id) return;

      g.accounts.id.initialize({
        client_id: clientId,
        callback: (resp: { credential?: string }) => {
          const credential = resp.credential;
          if (!credential) return;
          const payload = parseJwtPayload(credential);
          if (!payload) return;
          localStorage.setItem("bytecraft_google_profile", JSON.stringify(payload));
          setProfile(payload);
        },
      });
    };
    document.head.appendChild(script);
  }, [clientId]);

  function handleLogin() {
    if (!clientId) return;
    const g = (window as unknown as { google?: any }).google;
    g?.accounts?.id?.prompt?.();
  }

  function handleLogout() {
    localStorage.removeItem("bytecraft_google_profile");
    const g = (window as unknown as { google?: any }).google;
    g?.accounts?.id?.disableAutoSelect?.();
    setProfile(null);
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-900/10 bg-slate-900/5 text-slate-900 transition hover:bg-slate-900/10 dark:border-slate-200/10 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10"
            aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {clientId ? (
            profile ? (
              <Button variant="secondary" onClick={handleLogout} title={profile.email ?? "Sair"}>
                Sair
              </Button>
            ) : (
              <Button variant="secondary" onClick={handleLogin}>
                Login
              </Button>
            )
          ) : null}

          <Link to="/contato">
            <Button variant="primary">Contato</Button>
          </Link>
        </div>
      </Container>
    </header>
  );
}

