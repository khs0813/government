import Link from "next/link";
import { benefits } from "@/data/benefits";
import { createMetadata } from "@/lib/seo/metadata";
import { categoryLabels } from "@/types/benefit";

export const metadata = createMetadata({
  title: "저소득층 지원금 - 자격 계산기와 신청 정보",
  description: "근로장려금 등 소득 기준 지원제도를 확인하세요.",
  path: "/benefits/low-income/"
});

export default function CategoryPage() {
  const items = benefits.filter((benefit) => benefit.category === "low_income");
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <p className="text-sm font-bold text-brand-600">{categoryLabels["low_income" as keyof typeof categoryLabels]}</p>
      <h1 className="mt-3 text-4xl font-black text-slate-950">저소득층 지원금</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">근로장려금 등 소득 기준 지원제도를 확인하세요.</p>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((benefit) => (
          <Link key={benefit.id} href={`/benefits/${benefit.slug}/`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-brand-200 hover:bg-brand-50">
            <h2 className="text-xl font-extrabold text-slate-950">{benefit.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{benefit.shortDescription}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
