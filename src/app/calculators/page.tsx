import Link from "next/link";
import { benefits } from "@/data/benefits";
import { JsonLd } from "@/components/seo/JsonLd";
import { createMetadata } from "@/lib/seo/metadata";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, itemListJsonLd, webApplicationJsonLd } from "@/lib/seo/jsonLd";
import { categoryLabels } from "@/types/benefit";

export const metadata = createMetadata({
  title: "지원금 자격 확인 - 정부지원금 신청 가능성 체크",
  description: "근로장려금, 실업급여, 청년 월세 지원 등 제도별 자격 계산기로 바로 이동하세요.",
  path: "/calculators/"
});

const calculatorsFaq = [
  {
    question: "계산기 결과가 실제 수급 확정인가요?",
    answer: "아니요. 입력값으로 신청 가능성을 가늠하는 참고 결과이며 실제 지급 여부는 담당 기관 심사와 최신 공고 기준으로 결정됩니다."
  },
  {
    question: "공식 신청은 어디에서 하나요?",
    answer: "각 계산기 상세 페이지의 공식 신청처와 상세 안내 링크를 통해 국세청, 고용24, 복지로, 정부24 등 담당 기관 페이지로 이동할 수 있습니다."
  }
];

export default function CalculatorsPage() {
  const intro = [
    "계산기 목록에서는 제도별로 필요한 조건을 따로 확인할 수 있습니다. 통합 검색으로 전체 후보를 살펴본 뒤, 근로장려금은 가구 유형과 연소득, 실업급여는 고용보험 이력과 퇴사 사유, 청년 월세 지원은 나이와 주거 조건처럼 각 제도에서 중요한 항목을 다시 점검하는 흐름에 맞췄습니다. 입력 항목은 신청 가능성을 빠르게 가늠하는 데 필요한 범위로 정리했습니다.",
    "각 계산기 상세 페이지에는 공식 신청처, 공식 출처, 내부 상세 안내 링크를 함께 배치했습니다. 계산 결과는 입력값 기반의 참고용 가능성 안내이며, 실제 지급 여부와 금액은 담당 기관의 최신 공고, 제출 서류, 심사 결과에 따라 달라집니다. 결과가 긍정적으로 보여도 신청 전에는 소득 산정 방식, 가구원 범위, 접수 기간, 예외 조건을 공식 페이지에서 다시 확인하는 것이 좋습니다."
  ];
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <JsonLd data={breadcrumbJsonLd([{ name: "홈", path: "/" }, { name: "계산기", path: "/calculators/" }])} />
      <JsonLd data={faqJsonLd(calculatorsFaq)} />
      <JsonLd data={itemListJsonLd({
        name: "정부지원금 자격 계산기 목록",
        description: "주요 정부지원금의 신청 가능성을 확인하는 계산기 목록입니다.",
        path: "/calculators/",
        items: benefits.filter((benefit) => benefit.isActive).map((benefit) => ({
          name: benefit.calculatorTitle,
          description: benefit.seoDescription,
          path: `/calculators/${benefit.slug}/`
        }))
      })} />
      <JsonLd data={articleJsonLd({
        headline: "지원금 자격 확인 계산기 목록",
        description: "지원금별 신청 가능성을 확인할 수 있는 계산기 목록과 공식 확인 경로를 안내합니다.",
        path: "/calculators/",
        dateModified: "2026-07-04"
      })} />
      <JsonLd data={webApplicationJsonLd({
        name: "지원금 자격 확인 계산기",
        description: "주요 정부지원금의 신청 가능성을 입력 조건으로 확인하는 웹 계산기입니다.",
        path: "/calculators/"
      })} />
      <div className="max-w-3xl">
        <p className="text-sm font-bold text-brand-600">자격 확인</p>
        <h1 className="mt-3 text-4xl font-black text-slate-950">지원금별 신청 가능성 확인</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">관심 있는 지원금을 선택하고 내 조건으로 신청 가능성을 확인하세요.</p>
      </div>
      <div className="mt-8 max-w-4xl space-y-4 text-sm leading-7 text-slate-600 md:text-base md:leading-8">
        {intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {benefits.filter((benefit) => benefit.isActive).map((benefit) => (
          <Link key={benefit.id} href={`/calculators/${benefit.slug}/`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-brand-200 hover:bg-brand-50">
            <p className="text-xs font-bold text-brand-600">{categoryLabels[benefit.category]}</p>
            <h2 className="mt-3 text-xl font-extrabold text-slate-950">{benefit.calculatorTitle}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{benefit.seoDescription}</p>
          </Link>
        ))}
      </div>

      <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-black text-slate-950">자주 묻는 질문</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {calculatorsFaq.map((item) => (
            <div key={item.question}>
              <h3 className="font-bold text-slate-950">{item.question}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
