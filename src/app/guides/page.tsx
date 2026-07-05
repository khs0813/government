import Link from "next/link";
import { guides } from "@/data/guides";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "정부지원금 가이드 - 신청서류·소득기준·찾는 법",
  description: "정부지원금 신청 전 확인해야 할 공식 사이트, 신청서류, 소득 기준을 정리했습니다.",
  path: "/guides/"
});

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <div className="max-w-3xl">
        <p className="text-sm font-bold text-brand-600">가이드</p>
        <h1 className="mt-3 text-4xl font-black text-slate-950">정부지원금 신청 가이드</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">신청 전에 헷갈리기 쉬운 공식 사이트, 서류, 소득 기준, 실업급여와 월세 지원 조건을 쉽게 정리했습니다.</p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <Link key={guide.slug} href={`/guides/${guide.slug}/`} className="flex min-h-56 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-200 hover:bg-brand-50">
            <p className="text-xs font-bold text-brand-600">{guide.category}</p>
            <h2 className="mt-3 text-xl font-extrabold text-slate-950">{guide.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{guide.description}</p>
            <span className="mt-auto pt-6 text-sm font-bold text-brand-700">자세히 보기</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
