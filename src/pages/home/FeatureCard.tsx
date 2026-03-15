import type { ComponentType } from "react";

export default function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-2xl border border-slate-900/10 bg-white p-6 shadow-sm shadow-slate-900/5 transition hover:-translate-y-0.5 hover:border-slate-900/15 hover:bg-slate-50 dark:border-slate-200/10 dark:bg-white/5 dark:shadow-none dark:hover:border-slate-200/20 dark:hover:bg-white/10">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600/30 to-cyan-400/20 text-slate-900 ring-1 ring-slate-900/10 dark:text-slate-100 dark:ring-white/10">
        <Icon className="h-5 w-5" />
      </div>
      <div className="mt-4 text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</div>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300/80">{description}</p>
    </div>
  );
}
