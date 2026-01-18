import { MessageSquare, Shield, Sparkles } from "lucide-react";

import Container from "@/components/Container";
import SectionHeading from "@/pages/home/SectionHeading";

export default function HowItWorksSection() {
  const steps = [
    {
      title: "Você chega e entende em 5s",
      description: "Hero com proposta objetiva, CTAs claros e visual de código para conexão imediata com devs.",
      icon: Sparkles,
    },
    {
      title: "Você valida valor sem esforço",
      description: "Benefícios em cards curtos + prova social com sinais de credibilidade e métricas placeholder.",
      icon: Shield,
    },
    {
      title: "Você entra em contato",
      description: "Página /contato com formulário simples (sem backend) e envio via mailto pronto para usar.",
      icon: MessageSquare,
    },
  ];

  return (
    <section id="como-funciona" className="bg-slate-50 py-16 dark:bg-[#0B1020]">
      <Container>
        <SectionHeading
          kicker="Como funciona"
          title="Uma jornada simples, do primeiro scroll ao contato"
          description="Estrutura clássica de landing, otimizada para leitura rápida e ações claras."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-slate-900/10 bg-white p-6 shadow-sm shadow-slate-900/5 dark:border-slate-200/10 dark:bg-white/5 dark:shadow-none"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900/5 ring-1 ring-slate-900/10 dark:bg-white/5 dark:ring-white/10">
                <s.icon className="h-5 w-5 text-cyan-700 dark:text-cyan-200" />
              </div>
              <div className="mt-4 text-sm font-semibold text-slate-900 dark:text-slate-100">{s.title}</div>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300/80">{s.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-900/10 bg-white p-6 shadow-sm shadow-slate-900/5 dark:border-slate-200/10 dark:bg-white/5 dark:shadow-none">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300/70">Detalhes</div>
            <div className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">Âncoras internas</div>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300/80">
              Header fixo com links para Benefícios, Como funciona e Prova social. Em /contato, os links levam de volta para a home com hash.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-900/10 bg-white p-6 shadow-sm shadow-slate-900/5 dark:border-slate-200/10 dark:bg-white/5 dark:shadow-none">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300/70">Ação</div>
            <div className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">Formulário sem backend</div>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300/80">
              Validação no cliente e envio via <span className="font-mono text-cyan-700/90 dark:text-cyan-200/90">mailto:</span>. Você pode plugar um backend depois sem mudar o design.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
