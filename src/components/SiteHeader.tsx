import { useEffect, useMemo, useState } from "react";
import { Code2, Moon, Sun } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import Button from "@/components/Button";
import Container from "@/components/Container";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";
import { getSession, logoutGoogle, startGoogleLogin } from "@/lib/googleAuth";

const homeAnchors = [
  { label: "Benefícios", href: "#beneficios" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Prova social", href: "#prova-social" },
];

export default function SiteHeader() {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const clientId = useMemo(() => import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "", []);
  const [sessionEmail, setSessionEmail] = useState<string | null>(() => getSession()?.profile?.email ?? null);

  const isHome = location.pathname === "/";
  const anchorBase = isHome ? "" : "/";

  useEffect(() => {
    function refresh() {
      setSessionEmail(getSession()?.profile?.email ?? null);
    }

    function onMessage(e: MessageEvent) {
      if (e.origin !== window.location.origin) return;
      if (typeof e.data !== "object" || !e.data) return;
      if ((e.data as { type?: unknown }).type === "rennovatech:google_login") refresh();
    }

    window.addEventListener("message", onMessage);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("message", onMessage);
      window.removeEventListener("storage", refresh);
    };
  }, []);

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
          <span className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">RennovaTech</span>
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

          {sessionEmail ? (
            <Button
              variant="secondary"
              onClick={async () => {
                await logoutGoogle();
                setSessionEmail(null);
              }}
              title={sessionEmail}
            >
              Sair
            </Button>
          ) : (
            <Button
              variant="secondary"
              disabled={!clientId}
              onClick={() => startGoogleLogin({ clientId })}
              title={!clientId ? "Defina VITE_GOOGLE_CLIENT_ID para habilitar o login" : "Entrar com Google"}
            >
              Login
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

