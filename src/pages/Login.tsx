import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Chrome, Lock, Mail, ShieldCheck, UserPlus, LogIn, KeyRound } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import Button from "@/components/Button";
import Container from "@/components/Container";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/lib/authStore";

type Mode = "login" | "signup";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const user = useAuthStore((s) => s.user);
  const status = useAuthStore((s) => s.status);
  const error = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);
  const loginWithGoogle = useAuthStore((s) => s.loginWithGoogle);
  const loginWithEmail = useAuthStore((s) => s.loginWithEmail);
  const signUpWithEmail = useAuthStore((s) => s.signUpWithEmail);
  const resetPassword = useAuthStore((s) => s.resetPassword);

  const redirectTo = searchParams.get("redirect") || "/";

  const initialMode: Mode = useMemo(() => {
    const m = searchParams.get("mode");
    return m === "signup" ? "signup" : "login";
  }, [searchParams]);

  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    if (user) navigate(redirectTo, { replace: true });
  }, [navigate, redirectTo, user]);

  const emailOk = email.length === 0 ? true : isValidEmail(email);
  const passwordOk = password.length === 0 ? true : password.length >= 6;
  const canSubmit = isValidEmail(email) && password.length >= 6 && !submitting;

  async function handleEmailSubmit(e: FormEvent) {
    e.preventDefault();
    clearError();
    setResetSent(false);
    setSubmitting(true);
    try {
      if (mode === "signup") {
        await signUpWithEmail(email.trim(), password);
      } else {
        await loginWithEmail(email.trim(), password);
      }
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
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
              <div className="rounded-3xl border border-slate-900/10 bg-white p-8 shadow-sm shadow-slate-900/10 dark:border-slate-200/10 dark:bg-white/5 dark:shadow-none sm:p-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                      <ShieldCheck className="h-4 w-4 text-cyan-700 dark:text-cyan-200" />
                      Acesso seguro
                    </div>
                    <h1 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                      {mode === "signup" ? "Crie sua conta" : "Bem-vindo de volta"}
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300/80">
                      {mode === "signup"
                        ? "Cadastre-se com e-mail e senha ou continue com Google."
                        : "Entre com Google ou com seu e-mail e senha."}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 rounded-2xl border border-slate-900/10 bg-slate-900/5 p-1 dark:border-white/10 dark:bg-white/5">
                  <button
                    type="button"
                    onClick={() => {
                      clearError();
                      setResetSent(false);
                      setMode("login");
                    }}
                    className={cn(
                      "flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition",
                      mode === "login"
                        ? "bg-white text-slate-900 shadow-sm shadow-slate-900/10 dark:bg-[#0B1020] dark:text-slate-100 dark:shadow-black/40"
                        : "text-slate-700 hover:bg-white/60 hover:text-slate-900 dark:text-slate-200/80 dark:hover:bg-white/10 dark:hover:text-slate-100",
                    )}
                  >
                    Entrar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      clearError();
                      setResetSent(false);
                      setMode("signup");
                    }}
                    className={cn(
                      "flex-1 rounded-xl px-3 py-2 text-sm font-semibold transition",
                      mode === "signup"
                        ? "bg-white text-slate-900 shadow-sm shadow-slate-900/10 dark:bg-[#0B1020] dark:text-slate-100 dark:shadow-black/40"
                        : "text-slate-700 hover:bg-white/60 hover:text-slate-900 dark:text-slate-200/80 dark:hover:bg-white/10 dark:hover:text-slate-100",
                    )}
                  >
                    Criar conta
                  </button>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Button
                type="button"
                variant="secondary"
                onClick={async () => {
                  clearError();
                  setResetSent(false);
                  setSubmitting(true);
                  try {
                    await loginWithGoogle();
                  } finally {
                    setSubmitting(false);
                  }
                }}
                disabled={submitting}
                className="w-full justify-center"
              >
                <Chrome className="h-4 w-4" />
                Continuar com Google
              </Button>
                  <div className="hidden items-center justify-center rounded-2xl border border-slate-900/10 bg-gradient-to-br from-white to-slate-50 px-4 py-3 text-xs font-semibold text-slate-600 dark:border-white/10 dark:from-white/5 dark:to-white/0 dark:text-slate-200/70 sm:flex">
                    Sem senha salva aqui
                  </div>
                </div>

                <div className="mt-7 flex items-center gap-3">
                  <div className="h-px flex-1 bg-slate-900/10 dark:bg-white/10" />
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-300/60">ou</span>
                  <div className="h-px flex-1 bg-slate-900/10 dark:bg-white/10" />
                </div>

                <form className="mt-7 space-y-4" onSubmit={handleEmailSubmit}>
                  <label className="block">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">E-mail</span>
                    <div
                      className={cn(
                        "mt-2 flex items-center gap-2 rounded-2xl border bg-white px-4 py-3 shadow-sm shadow-slate-900/5 dark:bg-white/5 dark:shadow-none",
                        emailOk
                          ? "border-slate-900/10 dark:border-white/10"
                          : "border-rose-500/40 ring-1 ring-rose-500/30",
                      )}
                    >
                      <Mail className="h-4 w-4 text-slate-500 dark:text-slate-300/70" />
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        autoComplete="email"
                        placeholder="voce@exemplo.com"
                        className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-400/70"
                      />
                    </div>
                    {!emailOk ? (
                      <p className="mt-2 text-xs text-rose-600 dark:text-rose-300">Digite um e-mail válido.</p>
                    ) : null}
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Senha</span>
                    <div
                      className={cn(
                        "mt-2 flex items-center gap-2 rounded-2xl border bg-white px-4 py-3 shadow-sm shadow-slate-900/5 dark:bg-white/5 dark:shadow-none",
                        passwordOk
                          ? "border-slate-900/10 dark:border-white/10"
                          : "border-rose-500/40 ring-1 ring-rose-500/30",
                      )}
                    >
                      <Lock className="h-4 w-4 text-slate-500 dark:text-slate-300/70" />
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        autoComplete={mode === "signup" ? "new-password" : "current-password"}
                        placeholder="Minimo 6 caracteres"
                        className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder:text-slate-400/70"
                      />
                    </div>
                    {!passwordOk ? (
                      <p className="mt-2 text-xs text-rose-600 dark:text-rose-300">Use pelo menos 6 caracteres.</p>
                    ) : null}
                  </label>

                  {resetSent ? (
                    <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-200">
                      Se existir uma conta para este e-mail, enviamos um link de redefinição.
                    </div>
                  ) : null}

                  {error ? (
                    <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-700 dark:text-rose-200">
                      {error}
                    </div>
                  ) : null}

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Button type="submit" disabled={!canSubmit || status !== "ready"} className="w-full sm:w-auto">
                      {mode === "signup" ? (
                        <>
                          <UserPlus className="h-4 w-4" />
                          Criar conta
                        </>
                      ) : (
                        <>
                          <LogIn className="h-4 w-4" />
                          Entrar
                        </>
                      )}
                    </Button>

                    {mode === "login" ? (
                      <button
                        type="button"
                        onClick={async () => {
                          clearError();
                          setResetSent(false);
                          if (!isValidEmail(email.trim())) return;
                          setSubmitting(true);
                          try {
                            await resetPassword(email.trim());
                            setResetSent(true);
                          } finally {
                            setSubmitting(false);
                          }
                        }}
                        className={cn(
                          "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition",
                          "text-slate-700 hover:bg-slate-900/5 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-white/5",
                          !isValidEmail(email.trim()) || submitting ? "opacity-50" : "",
                        )}
                        disabled={!isValidEmail(email.trim()) || submitting}
                      >
                        <KeyRound className="h-4 w-4" />
                        Esqueci minha senha
                      </button>
                    ) : (
                      <Link
                        to="/"
                        className="text-center text-sm text-slate-600 hover:text-slate-900 dark:text-slate-200/80 dark:hover:text-slate-100"
                      >
                        Voltar para a home
                      </Link>
                    )}
                  </div>
                </form>

                <p className="mt-6 text-xs leading-5 text-slate-500 dark:text-slate-300/60">
                  Ao continuar, você concorda com os termos do app. Autenticação e banco usam Firebase (Auth + Firestore).
                </p>
              </div>

              <aside className="rounded-3xl border border-slate-900/10 bg-white p-8 shadow-sm shadow-slate-900/10 dark:border-slate-200/10 dark:bg-white/5 dark:shadow-none sm:p-10">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300/70">
                  O que você ganha
                </div>
                <h2 className="mt-3 text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                  Conta pronta para escalar
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300/80">
                  Login com Google, cadastro por e-mail e um perfil salvo no banco. Sem precisar de backend agora.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="rounded-2xl border border-slate-900/10 bg-slate-900/5 p-4 text-sm dark:border-white/10 dark:bg-white/5">
                      <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100">
                        <ShieldCheck className="h-4 w-4 text-cyan-700 dark:text-cyan-200" />
                        Firestore (grátis)
                      </div>
                      <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300/80">
                        Criamos/atualizamos um documento em <span className="font-mono">users/{"{uid}"}</span> no login.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-900/10 bg-slate-900/5 p-4 text-sm dark:border-white/10 dark:bg-white/5">
                      <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100">
                        <Mail className="h-4 w-4 text-cyan-700 dark:text-cyan-200" />
                        Email e senha
                      </div>
                      <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300/80">
                        Você pode criar conta e recuperar senha sem suporte manual.
                      </p>
                    </div>
                  </div>

                <div className="mt-8">
                  <Link to="/contato">
                    <Button variant="secondary" className="w-full justify-center">
                      Falar com a equipe
                    </Button>
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
