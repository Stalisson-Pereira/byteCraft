import { Mail, Send } from "lucide-react";
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
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Informe seu nome.";
    if (!email.trim()) e.email = "Informe seu e-mail.";
    else if (!isValidEmail(email)) e.email = "E-mail inválido.";
    if (!message.trim()) e.message = "Escreva uma mensagem.";
    return e;
  }, [name, email, message]);

  const canSubmit = Object.keys(errors).length === 0;
  const mailtoHref = buildMailto({
    to: "contato@bytecraft.dev",
    subject: `Contato ByteCraft — ${name || ""}`.trim(),
    body: `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
  });

  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900 dark:bg-[#0B1020] dark:text-slate-100">
      <SiteHeader />

      <main className="py-14">
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Vamos conversar</h1>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300/85">
                Use o formulário para abrir seu cliente de e-mail com a mensagem pronta. Se preferir, envie direto
                para o e-mail abaixo.
              </p>

              <div className="mt-8 rounded-2xl border border-slate-900/10 bg-white p-6 shadow-sm shadow-slate-900/5 dark:border-slate-200/10 dark:bg-white/5 dark:shadow-none">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300/70">Canal</div>
                <a
                  href="mailto:contato@bytecraft.dev"
                  className="mt-3 inline-flex items-center gap-2 text-sm text-cyan-700 transition hover:text-cyan-600 dark:text-cyan-200 dark:hover:text-cyan-100"
                >
                  <Mail className="h-4 w-4" />
                  contato@bytecraft.dev
                </a>
                <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">Placeholder: resposta em até 2 dias úteis.</div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-slate-900/10 bg-white p-8 shadow-sm shadow-slate-900/10 dark:border-white/10 dark:bg-sky-950 dark:shadow-black/40">
              <div className="pointer-events-none absolute inset-0 opacity-50 dark:opacity-70">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(124,58,237,0.16),transparent_45%),radial-gradient(circle_at_85%_60%,rgba(34,211,238,0.12),transparent_45%)] dark:bg-[radial-gradient(circle_at_25%_10%,rgba(124,58,237,0.22),transparent_45%),radial-gradient(circle_at_85%_60%,rgba(34,211,238,0.18),transparent_45%)]" />
              </div>
              <div className="relative text-sm font-semibold text-slate-900 dark:text-slate-100">Formulário</div>
              <p className="relative mt-2 text-sm leading-6 text-slate-600 dark:text-slate-200/80">
                Preencha os campos e clique em “Enviar” para abrir seu e-mail.
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
                  {touched.name && errors.name ? (
                    <div className="mt-2 text-xs text-rose-600 dark:text-rose-300">{errors.name}</div>
                  ) : null}
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
                    placeholder="voce@exemplo.com"
                    autoComplete="email"
                  />
                  {touched.email && errors.email ? (
                    <div className="mt-2 text-xs text-rose-600 dark:text-rose-300">{errors.email}</div>
                  ) : null}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300/70"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                    rows={5}
                    className="mt-2 w-full resize-none rounded-xl border border-slate-900/10 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-700/40 focus:ring-2 focus:ring-cyan-700/15 dark:border-white/10 dark:bg-black/30 dark:text-slate-100 dark:placeholder:text-slate-400/70 dark:focus:border-cyan-200/40 dark:focus:ring-cyan-200/20"
                    placeholder="Como eu posso te ajudar?"
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
          </div>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
