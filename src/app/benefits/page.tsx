import Link from "next/link";
import { benefits } from "@/data/benefits";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo/jsonLd";
import { createMetadata } from "@/lib/seo/metadata";
import { categoryLabels } from "@/types/benefit";

export const metadata = createMetadata({
  title: "정부지원금 전체 목록 - 청년·주거·고용·육아 지원금",
  description: "청년, 주거, 출산·육아, 고용, 노인, 저소득층 지원금을 카테고리별로 확인하세요.",
  path: "/benefits/"
});

export default function BenefitsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <JsonLd data={breadcrumbJsonLd([{ name: "홈", path: "/" }, { name: "지원금", path: "/benefits/" }])} />
      <div className="max-w-3xl">
        <p className="text-sm font-bold text-brand-600">지원금 목록</p>
        <h1 className="mt-3 text-4xl font-black text-slate-950">정부지원금 전체 목록</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">지원금별 대상자, 신청기관, 공식 링크를 확인하세요.</p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit) => (
          <Link key={benefit.id} href={`/benefits/${benefit.slug}/`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-brand-200 hover:bg-brand-50">
            <p className="text-xs font-bold text-brand-600">{categoryLabels[benefit.category]}</p>
            <h2 className="mt-3 text-xl font-extrabold text-slate-950">{benefit.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{benefit.shortDescription}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
