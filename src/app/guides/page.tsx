import Link from "next/link";
import { guides } from "@/data/guides";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { KakaoInlineBanner } from "@/components/ads/KakaoMobileAd";
import { breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo/jsonLd";

export const metadata = createMetadata({
  title: "정부지원금 가이드 - 신청서류·소득기준·찾는 법",
  description: "정부지원금 신청 전 확인할 공식 사이트, 신청서류, 소득 기준, 절차를 정리했습니다.",
  path: "/guides/"
});

export default function GuidesPage() {
  const intro = [
    "정부지원금 가이드는 계산 결과를 본 뒤 신청 전에 확인해야 할 배경 정보를 모아둔 공간입니다. 어떤 공식 사이트에서 제도를 찾아야 하는지, 신청서류를 어떻게 준비해야 하는지, 소득인정액과 기준 중위소득처럼 자주 나오는 용어를 어떻게 이해해야 하는지 단계별로 정리했습니다. 처음 신청하는 사람도 담당 기관과 확인 순서를 잡을 수 있게 구성했습니다.",
    "지원금은 같은 이름으로 검색해도 중앙정부 사업, 지자체 사업, 고용보험 급여, 세제 지원으로 나뉠 수 있습니다. 그래서 신청 전에 담당 기관, 접수 기간, 제출 서류, 중복지원 제한, 최신 공고 여부를 함께 확인해야 합니다. 각 가이드는 계산기 상세 페이지와 함께 읽을 수 있도록 공식 출처 중심으로 구성했으며, 실제 신청 전 마지막 점검에 필요한 항목을 우선 배치했습니다."
  ];
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <JsonLd data={breadcrumbJsonLd([{ name: "홈", path: "/" }, { name: "가이드", path: "/guides/" }])} />
      <JsonLd data={itemListJsonLd({
        name: "정부지원금 신청 가이드",
        description: "정부지원금 신청 전 공식 사이트, 서류, 소득 기준을 확인하는 가이드 목록입니다.",
        path: "/guides/",
        items: guides.map((guide) => ({
          name: guide.title,
          description: guide.description,
          path: `/guides/${guide.slug}/`
        }))
      })} />
      <div className="max-w-3xl">
        <p className="text-sm font-bold text-brand-600">가이드</p>
        <h1 className="mt-3 text-4xl font-black text-slate-950">정부지원금 신청 가이드</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">신청 전 헷갈리기 쉬운 공식 사이트, 서류, 소득 기준을 정리했습니다.</p>
      </div>
      <div className="mt-8 max-w-4xl space-y-4 text-sm leading-7 text-slate-600 md:text-base md:leading-8">
        {intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <KakaoInlineBanner />
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
