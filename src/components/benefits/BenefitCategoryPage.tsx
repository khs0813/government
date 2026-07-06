import Link from "next/link";
import { benefits } from "@/data/benefits";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, itemListJsonLd } from "@/lib/seo/jsonLd";
import type { BenefitCategory } from "@/types/benefit";
import { categoryLabels } from "@/types/benefit";

const categoryContent: Record<BenefitCategory, {
  title: string;
  lead: string;
  body: string[];
  checklist: string[];
  faq: Array<{ question: string; answer: string }>;
}> = {
  youth: {
    title: "청년 지원금",
    lead: "청년 자산형성, 월세, 취업 관련 지원금을 한곳에서 확인하세요.",
    body: [
      "청년 지원금은 나이 기준만으로 결정되지 않습니다. 개인소득, 가구소득, 거주지역, 고용상태, 무주택 여부, 기존 지원 수급 여부가 함께 검토되는 경우가 많습니다.",
      "중앙정부 사업과 지자체 사업은 신청 기간과 예산이 다를 수 있습니다. 같은 청년 지원이라는 이름이 붙어도 실제 신청기관과 제출 서류가 다르므로 상세 페이지의 공식 출처를 함께 확인해야 합니다.",
      "청년도약계좌는 신규 가입이 종료된 상품으로 기존 가입자의 유지·만기·갈아타기 확인이 중요하고, 신규 자산형성 상품은 청년미래적금 기준을 확인해야 합니다. 청년 월세 지원은 주민등록 주소, 임대차계약서, 월세 납부 증빙이 중요합니다."
    ],
    checklist: ["만 나이와 기준일", "개인소득 및 가구소득", "거주지역과 주민등록 주소", "중복지원 제한"],
    faq: [
      { question: "청년 지원금은 나이만 맞으면 신청할 수 있나요?", answer: "아니요. 대부분 개인소득, 가구소득, 거주지역, 고용상태, 기존 지원 수급 여부를 함께 확인합니다." },
      { question: "중앙정부와 지자체 청년 지원을 함께 봐야 하나요?", answer: "네. 사업별 신청 기간과 예산이 다르므로 정부24, 복지로, 지자체 공고를 함께 확인하는 것이 좋습니다." }
    ]
  },
  housing: {
    title: "주거 지원금",
    lead: "월세, 무주택, 임대차계약 등 주거 조건이 필요한 지원금을 확인하세요.",
    body: [
      "주거 지원금은 실제 거주 여부와 계약 관계가 핵심입니다. 임대차계약서상 임차인, 주민등록 주소, 월세 납부 내역, 무주택 여부가 서로 맞아야 심사 과정에서 보완 요청을 줄일 수 있습니다.",
      "지역별 주거 지원은 공고 기간이 짧거나 예산 소진으로 조기 마감될 수 있습니다. 신청 전에는 정부24, 복지로, 지자체 공고를 비교하고 현재 접수 중인지 확인해야 합니다.",
      "월세액, 보증금, 주택 유형, 공공임대 거주 여부, 부모와 별도 거주 여부 같은 세부 조건은 제도마다 달라집니다. 계산 결과는 후보를 좁히는 용도로 보고 공식 공고를 최종 기준으로 확인하세요."
    ],
    checklist: ["무주택 여부", "임대차계약서와 주소 일치", "월세 납부 증빙", "지역별 접수 기간"],
    faq: [
      { question: "주거 지원금 신청 전에 어떤 서류를 먼저 확인해야 하나요?", answer: "임대차계약서, 주민등록 주소, 월세 납부 증빙, 무주택 여부를 먼저 확인하면 심사 보완 가능성을 줄일 수 있습니다." },
      { question: "지역별 주거 지원은 조건이 다른가요?", answer: "네. 같은 월세 지원이라도 지자체마다 소득 기준, 접수 기간, 예산 소진 기준이 달라질 수 있습니다." }
    ]
  },
  childcare: {
    title: "출산·육아 지원금",
    lead: "자녀장려금, 육아휴직급여, 출산휴가급여 신청 정보를 확인하세요.",
    body: [
      "출산·육아 지원은 자녀 수, 출산 또는 휴직 상태, 고용보험 가입 여부, 가구 소득을 함께 확인하는 경우가 많습니다. 세제 지원과 고용보험 급여는 담당 기관과 심사 기준이 다릅니다.",
      "자녀장려금은 국세청 기준의 소득과 재산 요건이 중요하고, 육아휴직급여와 출산휴가급여는 고용보험 및 휴직 사용 사실이 중요합니다. 같은 육아 관련 제도라도 신청 경로가 다르므로 기관명을 꼭 확인하세요.",
      "급여 상한액, 지급 기간, 신청 가능 시점은 정책 변경 영향을 받을 수 있습니다. 상세 페이지에 표시된 기준 확인일과 공식 출처를 신청 전에 다시 확인하는 것이 안전합니다."
    ],
    checklist: ["자녀 수와 출생일", "고용보험 가입 여부", "휴직 또는 출산휴가 사용 기간", "소득·재산 기준"],
    faq: [
      { question: "출산·육아 지원금은 어느 기관에서 신청하나요?", answer: "자녀장려금은 국세청, 육아휴직급여와 출산휴가급여는 고용24 또는 고용센터 안내를 우선 확인합니다." },
      { question: "고용보험 가입 여부가 항상 필요한가요?", answer: "고용보험 급여 성격의 제도는 가입 이력과 휴직 또는 휴가 사용 사실이 중요하지만, 세제 지원은 별도 소득·재산 기준을 봅니다." }
    ]
  },
  employment: {
    title: "고용·실업 지원금",
    lead: "실업급여와 고용보험 관련 지원금의 주요 조건을 확인하세요.",
    body: [
      "고용·실업 지원은 현재 근로상태, 고용보험 가입 이력, 이직 사유, 재취업 활동 가능성처럼 사실관계 확인이 중요합니다. 단순히 퇴사했다는 이유만으로 수급이 확정되지 않습니다.",
      "실업급여는 이직확인서 처리 여부와 수급자격 인정 절차가 결과에 큰 영향을 줍니다. 권고사직, 계약만료, 자진퇴사 예외 사유 등은 고용센터에서 최종 확인해야 합니다.",
      "고용보험 급여는 신청 순서와 신고 의무를 놓치면 지급에 영향을 줄 수 있습니다. 계산기 결과를 본 뒤 고용24에서 온라인 교육, 신청서 제출, 실업인정 절차를 순서대로 확인하세요."
    ],
    checklist: ["고용보험 가입 이력", "이직확인서 처리 여부", "퇴사 사유", "재취업 활동 가능성"],
    faq: [
      { question: "실업급여는 퇴사하면 바로 받을 수 있나요?", answer: "아니요. 고용보험 가입 이력, 이직 사유, 이직확인서 처리, 재취업 활동 가능성 등을 고용센터가 확인합니다." },
      { question: "자진퇴사도 확인해 볼 수 있나요?", answer: "예외 사유가 있을 수 있으므로 계산 결과만 보지 말고 고용24나 관할 고용센터의 최신 기준을 확인해야 합니다." }
    ]
  },
  senior: {
    title: "노인 지원금",
    lead: "기초연금 등 고령층 대상 지원금의 나이와 소득 기준을 확인하세요.",
    body: [
      "노인 지원금은 연령 요건과 함께 소득인정액, 재산, 부부가구 여부를 확인하는 경우가 많습니다. 월소득만 낮다고 바로 대상이 되는 것은 아니며 재산의 소득환산액이 함께 반영될 수 있습니다.",
      "기초연금은 대한민국 국적, 국내 거주, 만 65세 이상 여부와 선정기준액 충족 여부가 주요 기준입니다. 부부가 함께 수급하는 경우 감액이나 별도 기준이 적용될 수 있습니다.",
      "연금액과 선정기준액은 매년 바뀔 수 있으므로 이전 연도 정보를 그대로 사용하면 안 됩니다. 상세 페이지의 업데이트 날짜와 공식 출처를 기준으로 최신 안내를 확인하세요."
    ],
    checklist: ["만 65세 도달 여부", "소득인정액", "부부가구 여부", "공식 기준연금액"],
    faq: [
      { question: "노인 지원금은 월소득만 낮으면 받을 수 있나요?", answer: "아니요. 재산의 소득환산액, 부부가구 여부, 국적과 국내 거주 요건 등이 함께 반영될 수 있습니다." },
      { question: "기초연금 기준은 매년 바뀌나요?", answer: "네. 선정기준액과 기준연금액은 연도별로 조정될 수 있어 신청 전 공식 안내를 다시 확인해야 합니다." }
    ]
  },
  low_income: {
    title: "저소득층 지원금",
    lead: "근로장려금 등 소득 기준 지원제도의 대상자와 신청 정보를 확인하세요.",
    body: [
      "저소득층 지원금은 가구 유형, 연소득, 재산 기준을 함께 보는 경우가 많습니다. 근로장려금처럼 단독, 홑벌이, 맞벌이 구분에 따라 소득 기준과 지급 가능 금액이 달라지는 제도도 있습니다.",
      "소득이 낮아도 재산 기준을 넘거나 가구 유형이 다르게 판단되면 결과가 달라질 수 있습니다. 반대로 월소득만 보고 포기했더라도 연간 총소득과 가구 구분에 따라 신청 가능성이 생길 수 있습니다.",
      "세제 지원은 국세청 안내와 신청 기간을 우선 확인해야 합니다. 정기 신청, 반기 신청, 기한 후 신청처럼 일정이 나뉠 수 있으므로 상세 페이지의 공식 출처를 통해 최신 기준을 확인하세요."
    ],
    checklist: ["가구 유형", "연간 총소득", "재산 합계", "정기·반기 신청 일정"],
    faq: [
      { question: "저소득층 지원금은 월급만 입력하면 판단할 수 있나요?", answer: "아니요. 연간 총소득, 가구 유형, 재산 합계처럼 제도별 기준이 함께 적용됩니다." },
      { question: "근로장려금 신청 기간은 하나인가요?", answer: "정기 신청, 반기 신청, 기한 후 신청처럼 일정이 나뉠 수 있어 국세청 공식 안내를 확인해야 합니다." }
    ]
  }
};

export function BenefitCategoryPage({ category }: { category: BenefitCategory }) {
  const content = categoryContent[category];
  const items = benefits.filter((benefit) => benefit.category === category && benefit.isActive);
  const path = `/benefits/${category === "low_income" ? "low-income" : category}/`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <JsonLd data={breadcrumbJsonLd([{ name: "홈", path: "/" }, { name: "지원금", path: "/benefits/" }, { name: content.title, path }])} />
      <JsonLd data={faqJsonLd(content.faq)} />
      <JsonLd data={itemListJsonLd({
        name: `${content.title} 목록`,
        description: content.lead,
        path,
        items: items.map((benefit) => ({
          name: benefit.title,
          description: benefit.shortDescription,
          path: `/benefits/${benefit.slug}/`
        }))
      })} />
      <JsonLd data={articleJsonLd({
        headline: `${content.title} 신청 전 확인 기준`,
        description: content.lead,
        path,
        dateModified: "2026-07-04"
      })} />
      <p className="text-sm font-bold text-brand-600">{categoryLabels[category]}</p>
      <h1 className="mt-3 text-4xl font-black text-slate-950">{content.title}</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{content.lead}</p>

      <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-black text-slate-950">신청 전 먼저 볼 기준</h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
            {content.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
        <aside className="rounded-2xl border border-brand-100 bg-brand-50 p-6">
          <h2 className="text-xl font-black text-slate-950">핵심 체크리스트</h2>
          <ul className="mt-5 space-y-3 text-sm font-bold leading-6 text-slate-700">
            {content.checklist.map((item) => <li key={item}>✓ {item}</li>)}
          </ul>
        </aside>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-black text-slate-950">관련 지원금</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((benefit) => (
            <Link key={benefit.id} href={`/benefits/${benefit.slug}/`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-brand-200 hover:bg-brand-50">
              <h3 className="text-xl font-extrabold text-slate-950">{benefit.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{benefit.shortDescription}</p>
              <p className="mt-4 text-xs font-bold text-slate-500">기준 확인일: {benefit.sourceCheckedAt}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-black text-slate-950">자주 묻는 질문</h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {content.faq.map((item) => (
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
