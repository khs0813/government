export function formatWon(value?: number) {
  if (typeof value !== "number" || Number.isNaN(value)) return "입력 없음";
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0
  }).format(value);
}

export function percent(value: number) {
  return `${Math.round(value)}%`;
}

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
