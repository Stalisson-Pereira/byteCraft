import { useEffect, useMemo, useState } from "react";
import { Chrome, LogIn, LogOut, ShieldCheck } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Button from "@/components/Button";
import Container from "@/components/Container";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { cn } from "@/lib/utils";

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

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/";
  const [profile, setProfile] = useState<GoogleProfile | null>(() => loadStoredProfile());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clientId = useMemo(() => import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "", []);

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
          navigate(redirectTo, { replace: true });
        },
      });
    };
    document.head.appendChild(script);
  }, [clientId, navigate, redirectTo]);

  async function handleGoogleLogin() {
    setError(null);
    if (!clientId) {
      setError("Login com Google indisponível: configure VITE_GOOGLE_CLIENT_ID.");
      return;
    }
    setSubmitting(true);
    try {
      const g = (window as unknown as { google?: any }).google;
      if (!g?.accounts?.id) {
        setError("Não foi possível carregar o Google Identity. Recarregue a página e tente novamente.");
        return;
      }
      g.accounts.id.prompt();
    } catch (err) {
      setError("Não foi possível fazer login. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogout() {
    setError(null);
    setSubmitting(true);
    try {
      localStorage.removeItem("bytecraft_google_profile");
      const g = (window as unknown as { google?: any }).google;
      g?.accounts?.id?.disableAutoSelect?.();
      setProfile(null);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900 dark:bg-[#0B1020] dark:text-slate-100">
      <SiteHeader />

      <main className="relative py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-24 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-violet-600/25 via-cyan-400/20 to-transparent blur-3xl dark:from-violet-500/20 dark:via-cyan-300/16" />
          <div className="absolute -bottom-28 right-[-6rem] h-[22rem] w-[22rem] rounded-full bg-gradient-to-br from-cyan-400/18 via-sky-400/12 to-transparent blur-3xl dark:from-cyan-300/14 dark:via-sky-300/10" />
        </div>

        <Container>
          <div className="mx-auto max-w-2xl rounded-3xl border border-slate-900/10 bg-white p-8 shadow-sm shadow-slate-900/10 dark:border-slate-200/10 dark:bg-white/5 dark:shadow-none sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
              <ShieldCheck className="h-4 w-4 text-cyan-700 dark:text-cyan-200" />
              Login com Google
            </div>

            <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Acesse sua conta
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300/80">
              Entre rapidamente usando sua conta Google.
            </p>

            {!clientId ? (
              <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-900 dark:text-amber-100">
                Para habilitar o login com Google, defina `VITE_GOOGLE_CLIENT_ID` no `.env.local`.
              </div>
            ) : null}

            {error ? (
              <div className="mt-6 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-200">
                {error}
              </div>
            ) : null}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                type="button"
                onClick={handleGoogleLogin}
                disabled={submitting || !clientId}
                className="w-full justify-center sm:w-auto"
              >
                <Chrome className="h-4 w-4" />
                Entrar com Google
              </Button>

              <button
                type="button"
                onClick={() => navigate("/", { replace: true })}
                className={cn(
                  "inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition",
                  "text-slate-700 hover:bg-slate-900/5 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-slate-100",
                  "sm:w-auto",
                )}
              >
                <LogIn className="h-4 w-4" />
                Voltar
              </button>

              {profile ? (
                <Button type="button" variant="secondary" onClick={handleLogout} disabled={submitting} className="w-full sm:w-auto">
                  <LogOut className="h-4 w-4" />
                  Sair
                </Button>
              ) : null}
            </div>
          </div>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
