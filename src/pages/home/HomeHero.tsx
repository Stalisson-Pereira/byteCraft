import { ArrowRight, Globe2, Shield, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import Button from "@/components/Button";
import Container from "@/components/Container";
import CodeCard from "@/pages/home/CodeCard";

export default function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-50 py-16 dark:bg-[#0B1020]">
      <div className="pointer-events-none absolute inset-0 opacity-80 dark:opacity-70">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_10%,rgba(124,58,237,0.24),transparent_44%),radial-gradient(circle_at_78%_28%,rgba(34,211,238,0.18),transparent_46%),radial-gradient(circle_at_70%_85%,rgba(124,58,237,0.10),transparent_48%)]" />
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-25 dark:opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.08)_1px,transparent_1px)] bg-[size:36px_36px] dark:bg-[linear-gradient(to_right,rgba(148,163,184,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.10)_1px,transparent_1px)]" />
      </div>
      <Container className="relative">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
              Uma landing page{" "}
              <span className="bg-gradient-to-r from-cyan-700 to-violet-700 bg-clip-text text-transparent dark:from-cyan-200 dark:to-violet-200">
                bonita
              </span>{" "}
              e{" "}
              <span className="bg-gradient-to-r from-violet-700 to-cyan-700 bg-clip-text text-transparent dark:from-violet-200 dark:to-cyan-200">
                direta
              </span>{" "}
              para devs
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300/85">
              A ByteCraft entrega uma experiência moderna: seções bem estruturadas, prova social e CTA claro. Tudo com um toque de estética “dev”.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#contato-cta" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto">
                  Começar agora <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <Link to="/contato" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full sm:w-auto">
                  Falar no contato
                </Button>
              </Link>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {[
                { icon: Globe2, label: "Escalável", value: "Estrutura limpa" },
                { icon: Shield, label: "Consistente", value: "Tokens e grids" },
                { icon: Sparkles, label: "Atrativa", value: "Neon sutil" },
              ].map((k) => (
                <div
                  key={k.label}
                  className="rounded-2xl border border-slate-900/10 bg-white/70 p-4 backdrop-blur-sm shadow-sm shadow-slate-900/5 dark:border-slate-200/10 dark:bg-white/5 dark:shadow-none"
                >
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300/80">
                    <k.icon className="h-4 w-4 text-cyan-700 dark:text-cyan-200" />
                    <span className="uppercase tracking-wide">{k.label}</span>
                  </div>
                  <div className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">{k.value}</div>
                </div>
              ))}
            </div>
          </div>

          <CodeCard />
        </div>
      </Container>
    </section>
  );
}
