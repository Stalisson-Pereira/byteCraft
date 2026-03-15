import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

export default function Button({
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-0",
        variant === "primary" &&
          "bg-violet-600 text-white shadow-sm shadow-violet-900/30 hover:bg-violet-500 hover:shadow-violet-900/50",
        variant === "secondary" &&
          "border border-cyan-700/30 bg-transparent text-cyan-700 hover:bg-cyan-700/10 dark:border-cyan-300/40 dark:text-cyan-200 dark:hover:bg-cyan-300/10",
        variant === "ghost" &&
          "bg-transparent text-slate-700 hover:bg-slate-900/5 dark:text-slate-200 dark:hover:bg-white/5",
        className,
      )}
      {...props}
    />
  );
}
