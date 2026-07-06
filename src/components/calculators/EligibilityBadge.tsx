import type { EligibilityStatus } from "@/types/eligibility";
import { cx } from "@/lib/utils/format";

const labels: Record<EligibilityStatus, string> = {
  eligible: "가능성 높음",
  maybe: "추가 확인 필요",
  not_eligible: "가능성 낮음",
  unknown: "입력 필요"
};

const styles: Record<EligibilityStatus, string> = {
  eligible: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  maybe: "bg-amber-50 text-amber-700 ring-amber-200",
  not_eligible: "bg-rose-50 text-rose-700 ring-rose-200",
  unknown: "bg-slate-100 text-slate-700 ring-slate-200"
};

export function EligibilityBadge({ status, label }: { status: EligibilityStatus; label?: string }) {
  return <span className={cx("inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1", styles[status])}>{label || labels[status]}</span>;
}
