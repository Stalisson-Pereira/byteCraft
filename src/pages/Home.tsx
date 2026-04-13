import {
  Activity,
  Bot,
  Braces,
  ChartNoAxesCombined,
  ChevronRight,
  Clock3,
  Cloud,
  Cpu,
  Database,
  FileCode2,
  FolderGit2,
  Gauge,
  GitBranch,
  Layers3,
  MessagesSquare,
  Play,
  Rocket,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

import Button from "@/components/Button";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { label: "Workspace", icon: Layers3, active: true },
  { label: "Projects", icon: FolderGit2 },
  { label: "Pipelines", icon: GitBranch },
  { label: "Automations", icon: Bot },
  { label: "Deployments", icon: Cloud },
  { label: "Observability", icon: Activity },
];

const statCards = [
  {
    label: "Deploy success",
    value: "98.4%",
    detail: "+2.1% nos ultimos 14 dias",
    icon: Rocket,
    tone: "emerald",
  },
  {
    label: "Build median",
    value: "4m 28s",
    detail: "-38s apos cache inteligente",
    icon: Gauge,
    tone: "cyan",
  },
  {
    label: "Active automations",
    value: "17",
    detail: "6 rodando a cada push",
    icon: Bot,
    tone: "violet",
  },
  {
    label: "Open incidents",
    value: "02",
    detail: "1 API + 1 frontend asset",
    icon: ShieldCheck,
    tone: "amber",
  },
];

const projects = [
  {
    name: "bytecraft/web-app",
    branch: "main",
    status: "Healthy",
    deploy: "2 min ago",
    stack: "React + Vite + Edge",
  },
  {
    name: "bytecraft/api-core",
    branch: "release/v2",
    status: "Queued",
    deploy: "Waiting approval",
    stack: "Node + Postgres",
  },
  {
    name: "bytecraft/workers",
    branch: "feat/cache-optimizer",
    status: "Failed",
    deploy: "12 min ago",
    stack: "Queues + Cron",
  },
];

const automationFlows = [
  {
    name: "Review PR + changelog",
    description: "Analisa diff, gera resumo tecnico e manda no canal do time.",
    schedule: "A cada pull request",
    status: "Ativa",
  },
  {
    name: "Deploy preview",
    description: "Builda branch, publica preview URL e comenta no PR.",
    schedule: "Push em feat/*",
    status: "Ativa",
  },
  {
    name: "Incident digest",
    description: "Resume erros prioritarios e recomenda rollback ou hotfix.",
    schedule: "A cada 30 min",
    status: "Monitorando",
  },
];

const commandShortcuts = [
  "ship preview --project web-app --branch feature/auth",
  "rollback api-core --to stable-2026.04.10",
  "review pr 184 --focus perf, risk, test-gap",
];

const activityFeed = [
  {
    title: "Preview deploy finalizado",
    description: "web-app recebeu URL temporaria com smoke checks verdes.",
    time: "Agora",
    icon: Rocket,
  },
  {
    title: "Automation sugeriu hotfix",
    description: "worker cache invalidation com regressao de latencia detectada.",
    time: "8 min",
    icon: Bot,
  },
  {
    title: "Schema drift detectado",
    description: "migração pendente entre staging e production.",
    time: "21 min",
    icon: Database,
  },
  {
    title: "PR 184 pronto para merge",
    description: "checks, changelog e checklist de release completos.",
    time: "43 min",
    icon: FileCode2,
  },
];

function toneClasses(tone: string) {
  if (tone === "emerald") return "from-emerald-500/25 to-emerald-400/5 text-emerald-700 dark:text-emerald-200";
  if (tone === "cyan") return "from-cyan-500/25 to-cyan-400/5 text-cyan-700 dark:text-cyan-200";
  if (tone === "amber") return "from-amber-500/25 to-amber-400/5 text-amber-700 dark:text-amber-200";
  return "from-violet-500/25 to-violet-400/5 text-violet-700 dark:text-violet-200";
}

function projectStatusClasses(status: string) {
  if (status === "Healthy") return "bg-emerald-500/12 text-emerald-700 ring-emerald-500/20 dark:text-emerald-200";
  if (status === "Queued") return "bg-amber-500/12 text-amber-700 ring-amber-500/20 dark:text-amber-200";
  return "bg-rose-500/12 text-rose-700 ring-rose-500/20 dark:text-rose-200";
}

export default function Home() {
  return (
    <div className="min-h-dvh bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.08),transparent_30%),linear-gradient(180deg,#f5f7fb_0%,#eef2ff_100%)] text-slate-900 dark:bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.10),transparent_18%),linear-gradient(180deg,#050816_0%,#0b1020_100%)] dark:text-slate-100">
      <SiteHeader />

      <main className="mx-auto max-w-[1480px] px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[32px] border border-slate-900/10 bg-white/85 p-6 shadow-[0_20px_80px_-32px_rgba(15,23,42,0.35)] backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:shadow-[0_24px_80px_-36px_rgba(0,0,0,0.75)] lg:p-8">
          <div className="pointer-events-none absolute inset-0 opacity-80">
            <div className="absolute -left-10 top-0 h-44 w-44 rounded-full bg-cyan-400/15 blur-3xl dark:bg-cyan-300/10" />
            <div className="absolute right-0 top-10 h-52 w-52 rounded-full bg-violet-500/15 blur-3xl dark:bg-violet-400/10" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:26px_26px] dark:bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)]" />
          </div>

          <div className="relative flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-900/10 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200/80">
                <Sparkles className="h-3.5 w-3.5" />
                ByteCraft Cloud for Dev Teams
              </div>

              <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
                Controle seus projetos, automações e deploys em uma única plataforma para devs.
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300/85">
                A ByteCraft agora funciona como um workspace operacional: monitore pipelines, acompanhe incidentes, rode
                automações, centralize snippets e organize o fluxo de entrega do time.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button className="w-full sm:w-auto">
                  Abrir workspace <ChevronRight className="h-4 w-4" />
                </Button>
                <Link to="/contato" className="w-full sm:w-auto">
                  <Button variant="secondary" className="w-full sm:w-auto">
                    Solicitar onboarding
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 xl:w-[480px] xl:grid-cols-1">
              <div className="rounded-2xl border border-slate-900/10 bg-slate-950 p-4 text-white shadow-lg shadow-slate-900/15 dark:border-white/10 dark:bg-[#070b16]">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-300">
                  Release train
                  <Rocket className="h-4 w-4 text-cyan-300" />
                </div>
                <div className="mt-4 text-2xl font-semibold">12 repos</div>
                <div className="mt-2 text-sm text-slate-300">4 ambientes, 27 automações e 1 janela de deploy ativa.</div>
              </div>

              <div className="rounded-2xl border border-slate-900/10 bg-white/90 p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  <TerminalSquare className="h-4 w-4 text-cyan-700 dark:text-cyan-200" />
                  Command center
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300/80">
                  Dispare rotinas, rode checks e monitore status sem sair do app.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-900/10 bg-white/90 p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                  <Cpu className="h-4 w-4 text-violet-700 dark:text-violet-200" />
                  AI-assisted ops
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300/80">
                  Reviews, resumos de incidentes e sugestões de ação orientadas por contexto.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[240px_minmax(0,1fr)_320px]">
          <aside className="rounded-[28px] border border-slate-900/10 bg-white/80 p-4 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
            <div className="rounded-2xl bg-slate-950 p-4 text-white dark:bg-[#060913]">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-400">Workspace ativo</div>
              <div className="mt-2 text-lg font-semibold">Core Platform</div>
              <div className="mt-2 text-sm text-slate-300">12 membros, 5 serviços críticos e deploy freeze hoje às 18:00.</div>
            </div>

            <div className="mt-5 space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={cn(
                    "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-medium transition",
                    item.active
                      ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-950"
                      : "text-slate-600 hover:bg-slate-900/5 hover:text-slate-900 dark:text-slate-300/80 dark:hover:bg-white/5 dark:hover:text-slate-100",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-slate-900/10 bg-slate-900/5 p-4 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                <Zap className="h-4 w-4 text-amber-500" />
                Atalho rápido
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300/80">
                Crie uma automation para revisar PRs, validar deploys e postar updates no Slack.
              </p>
            </div>
          </aside>

          <div className="space-y-6">
            <section className="grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
              {statCards.map((card) => (
                <div
                  key={card.label}
                  className="rounded-[28px] border border-slate-900/10 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
                >
                  <div
                    className={cn(
                      "inline-flex rounded-2xl bg-gradient-to-br p-3 ring-1 ring-inset ring-white/20",
                      toneClasses(card.tone),
                    )}
                  >
                    <card.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">{card.label}</div>
                  <div className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">{card.value}</div>
                  <div className="mt-2 text-sm text-slate-600 dark:text-slate-300/80">{card.detail}</div>
                </div>
              ))}
            </section>

            <section className="grid gap-6 2xl:grid-cols-[1.35fr_1fr]">
              <div className="rounded-[28px] border border-slate-900/10 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-slate-950 dark:text-white">Projetos ativos</div>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300/80">
                      Saúde operacional, branch atual e último deploy.
                    </p>
                  </div>
                  <Button variant="ghost">Ver todos</Button>
                </div>

                <div className="mt-5 space-y-3">
                  {projects.map((project) => (
                    <div
                      key={project.name}
                      className="grid gap-3 rounded-2xl border border-slate-900/10 bg-slate-50/90 p-4 dark:border-white/10 dark:bg-black/20 lg:grid-cols-[1.3fr_auto_auto]"
                    >
                      <div>
                        <div className="flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white">
                          <FolderGit2 className="h-4 w-4 text-cyan-700 dark:text-cyan-200" />
                          {project.name}
                        </div>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <span className="rounded-full bg-slate-900/5 px-2.5 py-1 dark:bg-white/5">{project.branch}</span>
                          <span>{project.stack}</span>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <span
                          className={cn(
                            "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
                            projectStatusClasses(project.status),
                          )}
                        >
                          {project.status}
                        </span>
                      </div>

                      <div className="text-sm text-slate-500 dark:text-slate-400 lg:text-right">
                        <div className="font-medium text-slate-700 dark:text-slate-200">Última execução</div>
                        <div className="mt-1">{project.deploy}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-900/10 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white">
                  <Braces className="h-4 w-4 text-violet-700 dark:text-violet-200" />
                  Command snippets
                </div>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300/80">
                  Copie e rode ações operacionais direto do seu workspace.
                </p>

                <div className="mt-5 space-y-3">
                  {commandShortcuts.map((command) => (
                    <div
                      key={command}
                      className="rounded-2xl border border-slate-900/10 bg-slate-950 px-4 py-3 font-mono text-xs text-cyan-300 shadow-inner shadow-black/20 dark:border-white/10"
                    >
                      {command}
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-dashed border-slate-900/10 p-4 dark:border-white/10">
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white">
                    <Play className="h-4 w-4 text-emerald-600 dark:text-emerald-200" />
                    Quick action
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300/80">
                    Dispare um smoke test, gere release notes ou valide uma migration sem trocar de contexto.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-900/10 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-semibold text-slate-950 dark:text-white">Automations em execução</div>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300/80">
                    Fluxos que acompanham review, deploy, incidentes e updates do time.
                  </p>
                </div>
                <Button variant="secondary">Nova automation</Button>
              </div>

              <div className="mt-5 grid gap-4 lg:grid-cols-3">
                {automationFlows.map((flow) => (
                  <div
                    key={flow.name}
                    className="rounded-2xl border border-slate-900/10 bg-slate-50/90 p-5 dark:border-white/10 dark:bg-black/20"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="text-sm font-semibold text-slate-950 dark:text-white">{flow.name}</div>
                      <span className="rounded-full bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-700 ring-1 ring-inset ring-cyan-500/20 dark:text-cyan-200">
                        {flow.status}
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300/80">{flow.description}</p>
                    <div className="mt-4 flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                      <Clock3 className="h-3.5 w-3.5" />
                      {flow.schedule}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-[28px] border border-slate-900/10 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white">
                <ChartNoAxesCombined className="h-4 w-4 text-cyan-700 dark:text-cyan-200" />
                Deploy runway
              </div>
              <div className="mt-4 space-y-4">
                {[
                  { label: "Production", value: "24 builds", width: "w-[88%]" },
                  { label: "Preview", value: "61 builds", width: "w-[72%]" },
                  { label: "Workers", value: "13 builds", width: "w-[43%]" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300/80">
                      <span>{item.label}</span>
                      <span>{item.value}</span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-slate-900/10 dark:bg-white/10">
                      <div className={cn("h-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500", item.width)} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-900/10 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-950 dark:text-white">
                <MessagesSquare className="h-4 w-4 text-violet-700 dark:text-violet-200" />
                Activity stream
              </div>
              <div className="mt-5 space-y-4">
                {activityFeed.map((item) => (
                  <div key={item.title} className="flex gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-slate-900/5 ring-1 ring-inset ring-slate-900/10 dark:bg-white/5 dark:ring-white/10">
                      <item.icon className="h-4 w-4 text-slate-700 dark:text-slate-200" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-950 dark:text-white">{item.title}</div>
                      <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300/80">{item.description}</p>
                      <div className="mt-1 text-xs uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-slate-900/10 bg-slate-950 p-6 text-white shadow-lg shadow-slate-900/20 dark:border-white/10 dark:bg-[#060913]">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <TerminalSquare className="h-4 w-4 text-cyan-300" />
                Dev workspace status
              </div>
              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  <span>CI credits</span>
                  <span className="font-semibold text-white">82%</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  <span>Secrets synced</span>
                  <span className="font-semibold text-emerald-300">OK</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  <span>Rollback ready</span>
                  <span className="font-semibold text-cyan-300">3 versões</span>
                </div>
              </div>
            </section>
          </aside>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

