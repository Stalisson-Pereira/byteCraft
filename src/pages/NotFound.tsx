import { ArrowLeft, SearchX } from "lucide-react";
import { Link } from "react-router-dom";

import Button from "@/components/Button";
import Container from "@/components/Container";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <div className="min-h-dvh bg-slate-50 text-slate-900 dark:bg-[#0B1020] dark:text-slate-100">
      <SiteHeader />

      <main className="py-20">
        <Container>
          <div className="mx-auto max-w-xl rounded-3xl border border-slate-900/10 bg-white p-10 text-center shadow-sm shadow-slate-900/10 dark:border-slate-200/10 dark:bg-white/5 dark:shadow-none">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/5 ring-1 ring-slate-900/10 dark:bg-white/5 dark:ring-white/10">
              <SearchX className="h-6 w-6 text-cyan-700 dark:text-cyan-200" />
            </div>
            <h1 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Página não encontrada</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300/80">
              O caminho que você tentou acessar não existe. Volte para a home e use as âncoras para navegar.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/">
                <Button className="w-full sm:w-auto">
                  <ArrowLeft className="h-4 w-4" />
                  Voltar para Início
                </Button>
              </Link>
              <Link to="/contato">
                <Button variant="secondary" className="w-full sm:w-auto">
                  Ir para Contato
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </main>

      <SiteFooter />
    </div>
  );
}
