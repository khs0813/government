import type { ReactNode } from "react";
import { cx } from "@/lib/utils/format";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={cx("rounded-2xl border border-slate-200 bg-white p-6 shadow-soft", className)}>{children}</div>;
}
