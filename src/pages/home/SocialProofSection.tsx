import { BadgeCheck } from "lucide-react";

import Container from "@/components/Container";

export default function SocialProofSection() {
  return (
    <section
      id="prova-social"
      className="border-y border-slate-900/10 bg-slate-100 dark:border-slate-200/10 dark:bg-[#0F172A]"
    >
      <Container className="py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <BadgeCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
            <div className="text-sm text-slate-700 dark:text-slate-200/90">
              Design escaneável + CTA direto, pronto para virar uma landing que converte.
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Tempo", value: "Setup rápido" },
              { label: "Estética", value: "Dark neon" },
              { label: "Stack", value: "React + TS" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-slate-900/10 bg-white px-4 py-3 shadow-sm shadow-slate-900/5 dark:border-slate-200/10 dark:bg-white/5 dark:shadow-none"
              >
                <div className="text-[11px] uppercase tracking-wide text-slate-600 dark:text-slate-400">{item.label}</div>
                <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
