import Link from "next/link";
import { KakaoInlineBanner } from "@/components/ads/KakaoMobileAd";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "결과 안내 - 자격 확인 결과를 보는 법",
  description: "지원금 자격 확인 결과가 가능성 높음, 추가 확인 필요, 가능성 낮음으로 표시되는 기준과 공식 확인 방법을 안내합니다.",
  path: "/methodology/"
});

const statuses = [
  {
    title: "가능성 높음",
    description: "입력한 조건이 해당 지원금의 주요 기준과 많이 맞는 상태입니다. 그래도 실제 지급 여부는 공식 기관 심사에서 결정됩니다.",
    tone: "border-emerald-100 bg-emerald-50 text-emerald-700"
  },
  {
    title: "추가 확인 필요",
    description: "일부 조건은 맞지만 소득, 재산, 가구 유형, 고용보험 이력처럼 더 확인해야 할 항목이 남아 있는 상태입니다.",
    tone: "border-amber-100 bg-amber-50 text-amber-700"
  },
  {
    title: "가능성 낮음",
    description: "현재 입력값으로는 주요 조건과 맞지 않을 가능성이 큰 상태입니다. 지자체 예외 사업이나 최신 공고는 별도로 확인하세요.",
    tone: "border-rose-100 bg-rose-50 text-rose-700"
  }
];

const checks = [
  "나이와 거주지역처럼 기본 대상 조건을 먼저 봅니다.",
  "월소득, 연소득, 재산 구간처럼 소득·재산 기준을 함께 봅니다.",
  "고용보험, 주거 형태, 자녀 수, 육아휴직 여부처럼 제도별 핵심 조건을 확인합니다.",
  "입력하지 않은 항목이 있으면 결과에서 추가 확인이 필요한 조건으로 안내합니다."
];

const cautions = [
  {
    title: "점수는 우선순위 참고값입니다",
    body: "점수가 높을수록 입력한 조건이 등록된 기준과 많이 맞는다는 뜻입니다. 하지만 실제 심사는 기관의 소득·재산 자료와 제출 서류로 다시 판단합니다."
  },
  {
    title: "누락 항목이 있으면 결과가 달라질 수 있습니다",
    body: "소득, 재산, 가구원 수, 고용보험 이력처럼 중요한 값을 비워두면 '추가 확인 필요'로 표시될 수 있습니다."
  },
  {
    title: "지원금마다 보는 기준이 다릅니다",
    body: "근로장려금은 가구 유형과 연소득, 실업급여는 고용보험과 이직 사유, 청년 월세는 주거 형태와 지역 조건이 중요합니다."
  },
  {
    title: "공식 신청처가 최종 기준입니다",
    body: "지자체 공고, 예산 소진, 신청 기간, 세부 예외 기준은 수시로 바뀔 수 있으므로 결과 화면의 공식 신청처를 반드시 확인하세요."
  }
];

export default function MethodologyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <div className="max-w-3xl">
        <p className="text-sm font-bold text-brand-600">결과 안내</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">자격 확인 결과를 보는 법</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          이 사이트는 입력한 조건을 바탕으로 신청해볼 만한 지원금을 먼저 찾도록 돕습니다. 결과는 확정 판정이 아니라 공식 신청 전 참고용 안내입니다.
        </p>
      </div>

      <KakaoInlineBanner />

      <section className="mt-10 grid gap-5 lg:grid-cols-3">
        {statuses.map((status) => (
          <div key={status.title} className={`rounded-2xl border p-6 ${status.tone}`}>
            <h2 className="text-xl font-black">{status.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">{status.description}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <p className="text-sm font-bold text-brand-600">확인 방식</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">입력값은 이렇게 사용됩니다</h2>
          <div className="mt-6 divide-y divide-slate-200">
            {checks.map((check, index) => (
              <div key={check} className="grid gap-3 py-5 first:pt-0 last:pb-0 md:grid-cols-[120px_1fr]">
                <p className="text-sm font-extrabold text-slate-950">STEP {index + 1}</p>
                <p className="text-sm leading-7 text-slate-600">{check}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-extrabold text-slate-950">꼭 기억하세요</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            정부지원금은 신청 기간, 예산, 소득·재산 조사, 제출 서류, 지자체 공고에 따라 결과가 달라질 수 있습니다.
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            계산 결과가 좋아도 신청 전에는 반드시 공식 신청처의 최신 안내를 확인하세요.
          </p>
          <div className="mt-5 grid gap-3">
            <Link href="/guides/" className="rounded-xl bg-brand-600 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-brand-700">
              신청 가이드 보기
            </Link>
            <Link href="/calculators/" className="rounded-xl bg-slate-100 px-4 py-3 text-center text-sm font-bold text-slate-900 transition hover:bg-slate-200">
              자격 확인하기
            </Link>
          </div>
        </aside>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
        <p className="text-sm font-bold text-brand-600">해석 기준</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">결과를 볼 때 함께 확인할 내용</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {cautions.map((caution) => (
            <div key={caution.title} className="rounded-xl bg-slate-50 p-5">
              <h3 className="font-extrabold text-slate-950">{caution.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">{caution.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
