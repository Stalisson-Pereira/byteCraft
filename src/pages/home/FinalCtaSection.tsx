import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import Button from "@/components/Button";
import Container from "@/components/Container";

export default function FinalCtaSection() {
  return (
    <section id="contato-cta" className="bg-slate-50 py-16 dark:bg-[#0B1020]">
      <Container>
        <div className="rounded-3xl bg-gradient-to-br from-violet-600/35 via-cyan-400/25 to-transparent p-[1px] shadow-lg shadow-slate-900/10 dark:from-violet-500/30 dark:via-cyan-300/20 dark:shadow-black/40">
          <div className="relative overflow-hidden rounded-3xl bg-white p-10 text-center text-slate-900 shadow-sm shadow-slate-900/10 ring-1 ring-slate-900/10 dark:bg-sky-950 dark:text-slate-100 dark:shadow-black/40 dark:ring-white/10">
            <div className="pointer-events-none absolute inset-0 opacity-70 dark:opacity-80">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(124,58,237,0.20),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(34,211,238,0.16),transparent_45%)] dark:bg-[radial-gradient(circle_at_25%_10%,rgba(124,58,237,0.28),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(34,211,238,0.22),transparent_45%)]" />
            </div>
            <div className="relative mx-auto max-w-2xl">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300/80">Pronto?</div>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Fale com a ByteCraft</h3>
              <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-200/80">
                Manda uma mensagem rápida e eu te retorno com os próximos passos. Sem cadastro, sem fricção.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link to="/contato" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto">Ir para contato</Button>
                </Link>
                <a href="#beneficios" className="w-full sm:w-auto">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    Ver benefícios <ArrowRight className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
