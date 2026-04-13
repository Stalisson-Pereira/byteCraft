import { CheckCircle2, LifeBuoy, Mail, Send, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import Button from "@/components/Button";
import Container from "@/components/Container";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

function buildMailto({
  to,
  subject,
  body,
}: {
  to: string;
  subject: string;
  body: string;
}) {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${to}?${params.toString()}`;
}

function isValidEmail(email: string) {
  return /.+@.+\..+/.test(email.trim());
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState({ name: false, email: false, message: false });

  const errors = useMemo(() => {
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Informe seu nome.";
    if (!email.trim()) next.email = "Informe seu e-mail.";
    else if (!isValidEmail(email)) next.email = "E-mail inválido.";
    if (!message.trim()) next.message = "Escreva um contexto para o time.";
    return next;
  }, [name, email, message]);

  const canSubmit = Object.keys(errors).length === 0;
  const mailtoHref = buildMailto({
    to: "contato@rennovatech.dev",
    subject: `Onboarding RennovaTech - ${name || ""}`.trim(),
    body: `Nome: ${name}\nE-mail: ${email}\n\nContexto:\n${message}`,
  });

  return (
    <div className="min-h-dvh bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.08),transparent_30%),linear-gradient(180deg,#f5f7fb_0%,#eef2ff_100%)] text-slate-900 dark:bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.10),transparent_18%),linear-gradient(180deg,#050816_0%,#0b1020_100%)] dark:text-slate-100">
      <SiteHeader />

      <main className="mx-auto max-w-[1320px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_560px]">
          <section className="rounded-[32px] border border-slate-900/10 bg-white/85 p-8 shadow-[0_20px_80px_-32px_rgba(15,23,42,0.35)] backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:shadow-[0_24px_80px_-36px_rgba(0,0,0,0.75)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-slate-900/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
              <Sparkles className="h-3.5 w-3.5" />
              Suporte e onboarding
            </div>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 dark:text-white">
              Coloque seu time para operar com a RennovaTech.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300/85">
              Use este canal para onboarding, dúvidas técnicas, setup do OAuth, automações, deploys ou desenho do workspace.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                "Configuração do workspace e papéis do time",
                "Login Google, OAuth e domínios",
                "Deploy no GitHub Pages ou Vercel",
                "Automations para review, CI e incidentes",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-900/10 bg-slate-50/90 p-4 text-sm text-slate-700 dark:border-white/10 dark:bg-black/20 dark:text-slate-200/85"
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-300" />
                    <span>{item}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-3xl bg-slate-950 p-6 text-white dark:bg-[#070b16]">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <LifeBuoy className="h-4 w-4 text-cyan-300" />
                Canal direto
              </div>
              <a
                href="mailto:contato@rennovatech.dev"
                className="mt-4 inline-flex items-center gap-2 text-lg font-semibold text-cyan-300 transition hover:text-cyan-200"
              >
                <Mail className="h-5 w-5" />
                contato@rennovatech.dev
              </a>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Para onboarding e suporte inicial, a resposta padrão estimada é de até 2 horas úteis em temas críticos.
              </p>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[32px] border border-slate-900/10 bg-white/85 p-8 shadow-[0_20px_80px_-32px_rgba(15,23,42,0.35)] backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:shadow-[0_24px_80px_-36px_rgba(0,0,0,0.75)]">
            <div className="pointer-events-none absolute inset-0 opacity-60">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(124,58,237,0.12),transparent_42%),radial-gradient(circle_at_85%_65%,rgba(34,211,238,0.10),transparent_45%)] dark:bg-[radial-gradient(circle_at_20%_15%,rgba(124,58,237,0.16),transparent_42%),radial-gradient(circle_at_85%_65%,rgba(34,211,238,0.12),transparent_45%)]" />
            </div>

            <div className="relative">
              <div className="text-sm font-semibold text-slate-950 dark:text-white">Abrir contato por e-mail</div>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300/80">
                Preencha o contexto e clique em enviar para abrir seu cliente de e-mail com a mensagem pronta.
              </p>

              <form
                className="mt-6 space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setTouched({ name: true, email: true, message: true });
                  if (!canSubmit) return;
                  window.location.href = mailtoHref;
                }}
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300/70"
                  >
                    Nome
                  </label>
                  <input
                    id="contact-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, name: true }))}
                    className="mt-2 w-full rounded-xl border border-slate-900/10 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-700/40 focus:ring-2 focus:ring-cyan-700/15 dark:border-white/10 dark:bg-black/30 dark:text-slate-100 dark:placeholder:text-slate-400/70 dark:focus:border-cyan-200/40 dark:focus:ring-cyan-200/20"
                    placeholder="Seu nome"
                    autoComplete="name"
                  />
                  {touched.name && errors.name ? <div className="mt-2 text-xs text-rose-600 dark:text-rose-300">{errors.name}</div> : null}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300/70"
                  >
                    E-mail
                  </label>
                  <input
                    id="contact-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    className="mt-2 w-full rounded-xl border border-slate-900/10 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-700/40 focus:ring-2 focus:ring-cyan-700/15 dark:border-white/10 dark:bg-black/30 dark:text-slate-100 dark:placeholder:text-slate-400/70 dark:focus:border-cyan-200/40 dark:focus:ring-cyan-200/20"
                    placeholder="voce@empresa.com"
                    autoComplete="email"
                  />
                  {touched.email && errors.email ? <div className="mt-2 text-xs text-rose-600 dark:text-rose-300">{errors.email}</div> : null}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300/70"
                  >
                    Contexto
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                    rows={6}
                    className="mt-2 w-full resize-none rounded-xl border border-slate-900/10 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-700/40 focus:ring-2 focus:ring-cyan-700/15 dark:border-white/10 dark:bg-black/30 dark:text-slate-100 dark:placeholder:text-slate-400/70 dark:focus:border-cyan-200/40 dark:focus:ring-cyan-200/20"
                    placeholder="Ex.: quero configurar login Google, automações por PR e dashboard para o time."
                  />
                  {touched.message && errors.message ? (
                    <div className="mt-2 text-xs text-rose-600 dark:text-rose-300">{errors.message}</div>
                  ) : null}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button type="submit" disabled={!canSubmit} className="w-full sm:w-auto">
                    Enviar <Send className="h-4 w-4" />
                  </Button>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Ao enviar, seu cliente de e-mail será aberto.</div>
                </div>

                <a
                  href={mailtoHref}
                  className={
                    canSubmit
                      ? "text-xs text-cyan-700/90 transition hover:text-cyan-600 dark:text-cyan-200/90 dark:hover:text-cyan-100"
                      : "pointer-events-none text-xs text-slate-400 dark:text-slate-500"
                  }
                  onClick={() => setTouched({ name: true, email: true, message: true })}
                >
                  Abrir e-mail manualmente
                </a>
              </form>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

