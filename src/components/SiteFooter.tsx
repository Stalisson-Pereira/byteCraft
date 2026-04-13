import { Github, LifeBuoy, Mail, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "@/components/Container";

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-900/10 bg-slate-50/80 backdrop-blur-sm dark:border-slate-200/10 dark:bg-[#0B1020]/80">
      <Container className="py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
              <Rocket className="h-4 w-4 text-cyan-700 dark:text-cyan-200" />
              RennovaTech
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300/80">
              Workspace operacional para times de desenvolvimento: automações, deploy, observabilidade e colaboração em uma
              única interface.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300/70">Produto</div>
            <Link
              to="/"
              className="text-sm text-slate-700 transition hover:text-slate-900 dark:text-slate-200/80 dark:hover:text-slate-100"
            >
              Workspace
            </Link>
            <Link
              to="/contato"
              className="text-sm text-slate-700 transition hover:text-slate-900 dark:text-slate-200/80 dark:hover:text-slate-100"
            >
              Suporte e onboarding
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300/70">Contato</div>
            <a
              href="mailto:contato@rennovatech.dev"
              className="inline-flex items-center gap-2 text-sm text-slate-700 transition hover:text-slate-900 dark:text-slate-200/80 dark:hover:text-slate-100"
            >
              <Mail className="h-4 w-4" />
              contato@rennovatech.dev
            </a>
            <a
              href="https://instagram.com/RennovaTech"
              className="inline-flex items-center gap-2 text-sm text-slate-700 transition hover:text-slate-900 dark:text-slate-200/80 dark:hover:text-slate-100"
            >
              <Github className="h-4 w-4" />
              instagram.com/RennovaTech
            </a>
            <div className="inline-flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200/80">
              <LifeBuoy className="h-4 w-4" />
              SLA inicial: 2h para incidentes críticos
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-slate-900/10 pt-6 text-xs text-slate-500 dark:border-slate-200/10 dark:text-slate-400">
          <div>© {new Date().getFullYear()} RennovaTech. Plataforma SaaS para times de desenvolvimento.</div>
        </div>
      </Container>
    </footer>
  );
}

