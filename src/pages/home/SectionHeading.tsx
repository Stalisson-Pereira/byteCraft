export default function SectionHeading({
  kicker,
  title,
  description,
}: {
  kicker: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700/80 dark:text-cyan-200/80">{kicker}</div>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300/80">{description}</p>
    </div>
  );
}
