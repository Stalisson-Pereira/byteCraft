export default function CodeCard() {
  return (
    <aside className="group relative mx-auto w-full max-w-md rounded-3xl bg-gradient-to-br from-violet-600/35 via-cyan-400/25 to-transparent p-[1px] shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-900/15 dark:from-violet-500/30 dark:via-cyan-300/20 dark:shadow-black/40">
      <div className="relative overflow-hidden rounded-3xl bg-white/80 p-6 backdrop-blur-xl ring-1 ring-slate-900/10 dark:bg-[#0B1020]/55 dark:ring-white/10">
        <div className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-25">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(124,58,237,0.40),transparent_45%),radial-gradient(circle_at_85%_40%,rgba(34,211,238,0.30),transparent_48%)]" />
        </div>
        <div className="pointer-events-none absolute inset-0 opacity-20 dark:opacity-25">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.07)_1px,transparent_1px)] bg-[size:26px_26px] dark:bg-[linear-gradient(to_right,rgba(148,163,184,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.10)_1px,transparent_1px)]" />
        </div>

        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-600 dark:text-slate-300/70">
              ByteCraft UI
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-400/80" />
              <span className="h-2 w-2 rounded-full bg-amber-300/80" />
              <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-slate-900/10 bg-white/70 p-4 text-center backdrop-blur-sm dark:border-white/10 dark:bg-white/10">
            <div className="inline-flex items-center justify-center rounded-full bg-slate-900/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-700 dark:bg-white/10 dark:text-slate-200">
              Build pronto
            </div>
            <div className="mt-3 grid gap-1 text-sm font-semibold">
              <div className="text-emerald-700 dark:text-emerald-300">✓ Tema claro/escuro</div>
              <div className="text-emerald-700 dark:text-emerald-300">✓ Seções + âncoras</div>
              <div className="text-emerald-700 dark:text-emerald-300">✓ Deploy pronto</div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { label: "Tempo", value: "rápido" },
              { label: "UX", value: "limpa" },
              { label: "Visual", value: "neon" },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-slate-900/10 bg-white/70 p-3 backdrop-blur-sm transition hover:bg-white/80 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              >
                <div className="text-xs text-slate-600 dark:text-slate-400">{m.label}</div>
                <div className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">{m.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
