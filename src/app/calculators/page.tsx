import Link from "next/link";
import { benefits } from "@/data/benefits";
import { createMetadata } from "@/lib/seo/metadata";
import { categoryLabels } from "@/types/benefit";

export const metadata = createMetadata({
  title: "지원금 자격 확인 - 정부지원금 신청 가능성 체크",
  description: "근로장려금, 실업급여, 청년 월세 지원 등 주요 지원금의 신청 가능성을 한곳에서 확인하세요.",
  path: "/calculators/"
});

export default function CalculatorsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <div className="max-w-3xl">
        <p className="text-sm font-bold text-brand-600">자격 확인</p>
        <h1 className="mt-3 text-4xl font-black text-slate-950">지원금별 신청 가능성 확인</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">관심 있는 지원금을 선택하고 내 조건으로 신청 가능성을 간단히 확인하세요. 결과는 참고용이며 공식 기준 확인이 필요합니다.</p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit) => (
          <Link key={benefit.id} href={`/calculators/${benefit.slug}/`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-brand-200 hover:bg-brand-50">
            <p className="text-xs font-bold text-brand-600">{categoryLabels[benefit.category]}</p>
            <h2 className="mt-3 text-xl font-extrabold text-slate-950">{benefit.calculatorTitle}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{benefit.seoDescription}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
