import Link from "next/link";
import { benefits } from "@/data/benefits";
import { JsonLd } from "@/components/seo/JsonLd";
import { KakaoInlineBanner } from "@/components/ads/KakaoMobileAd";
import { breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo/jsonLd";
import { createMetadata } from "@/lib/seo/metadata";
import { categoryLabels } from "@/types/benefit";

export const metadata = createMetadata({
  title: "정부지원금 전체 목록 - 청년·주거·고용·육아 지원금",
  description: "청년, 주거, 육아, 고용, 노인, 저소득층 지원금을 대상자와 공식 링크 기준으로 비교하세요.",
  path: "/benefits/"
});

export default function BenefitsPage() {
  const intro = [
    "정부지원금 전체 목록은 계산기 유무와 관계없이 사이트에서 안내하는 주요 제도를 한 화면에서 비교하는 허브입니다. 청년, 주거, 출산·육아, 고용·실업, 노인, 저소득·세제지원처럼 생활 상황별로 나누어 대상자, 신청기관, 지원 금액, 신청 시기를 빠르게 확인할 수 있습니다. 관심 있는 제도는 상세 페이지에서 기준 확인일과 공식 출처를 함께 볼 수 있습니다. 목록은 상황별 탐색에 맞췄습니다.",
    "지원금 이름이 비슷해도 담당 기관과 신청 기준은 다를 수 있습니다. 예를 들어 국세청 장려금은 가구 유형과 연간 총소득을 보고, 고용보험 급여는 고용보험 이력과 휴직 또는 실직 상태를 봅니다. 복지 제도는 가구원, 주소, 재산, 중복지원 여부에 따라 결과가 달라질 수 있으므로 신청 전에는 공식 안내의 최신 공고, 접수 기간, 제출 서류를 다시 확인하세요."
  ];
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <JsonLd data={breadcrumbJsonLd([{ name: "홈", path: "/" }, { name: "지원금", path: "/benefits/" }])} />
      <JsonLd data={itemListJsonLd({
        name: "정부지원금 전체 목록",
        description: "청년, 주거, 육아, 고용, 노인, 저소득층 지원금을 비교하는 목록입니다.",
        path: "/benefits/",
        items: benefits.filter((benefit) => benefit.isActive).map((benefit) => ({
          name: benefit.title,
          description: benefit.shortDescription,
          path: `/benefits/${benefit.slug}/`
        }))
      })} />
      <div className="max-w-3xl">
        <p className="text-sm font-bold text-brand-600">지원금 목록</p>
        <h1 className="mt-3 text-4xl font-black text-slate-950">정부지원금 전체 목록</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">지원금별 대상자, 신청기관, 공식 링크를 확인하세요.</p>
      </div>
      <div className="mt-8 max-w-4xl space-y-4 text-sm leading-7 text-slate-600 md:text-base md:leading-8">
        {intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <KakaoInlineBanner />
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
