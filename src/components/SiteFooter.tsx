import { Github, Mail } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "@/components/Container";

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-900/10 bg-slate-50 dark:border-slate-200/10 dark:bg-[#0B1020]">
      <Container className="py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">ByteCraft</div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300/80">
              Uma landing page moderna, pensada para devs: visual dark, acentos violet/cyan e CTA direto.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300/70">Links</div>
            <Link
              to="/"
              className="text-sm text-slate-700 transition hover:text-slate-900 dark:text-slate-200/80 dark:hover:text-slate-100"
            >
              Início
            </Link>
            <Link
              to="/contato"
              className="text-sm text-slate-700 transition hover:text-slate-900 dark:text-slate-200/80 dark:hover:text-slate-100"
            >
              Contato
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300/70">Contato</div>
            <a
              href="mailto:contato@bytecraft.dev"
              className="inline-flex items-center gap-2 text-sm text-slate-700 transition hover:text-slate-900 dark:text-slate-200/80 dark:hover:text-slate-100"
            >
              <Mail className="h-4 w-4" />
              contato@bytecraft.dev
            </a>
            <a
              href="https://github.com"
              className="inline-flex items-center gap-2 text-sm text-slate-700 transition hover:text-slate-900 dark:text-slate-200/80 dark:hover:text-slate-100"
            >
              <Github className="h-4 w-4" />
              github.com/bytecraft
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-slate-900/10 pt-6 text-xs text-slate-500 dark:border-slate-200/10 dark:text-slate-400">
          <div>© {new Date().getFullYear()} ByteCraft. Todos os direitos reservados.</div>
        </div>
      </Container>
    </footer>
  );
}
