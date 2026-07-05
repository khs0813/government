import Link from "next/link";
import { benefits } from "@/data/benefits";

export function RelatedCalculators({ currentId }: { currentId?: string }) {
  const items = benefits.filter((benefit) => benefit.id !== currentId).slice(0, 4);
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((benefit) => (
        <Link key={benefit.id} href={`/calculators/${benefit.slug}/`} className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-brand-200 hover:bg-brand-50">
          <p className="font-bold text-slate-950">{benefit.calculatorTitle}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{benefit.seoDescription}</p>
        </Link>
      ))}
    </div>
  );
}
