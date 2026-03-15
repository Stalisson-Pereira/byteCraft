import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("container px-6 sm:px-8", className)}>{children}</div>;
}
