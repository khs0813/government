import Link from "next/link";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "편집 정책",
  description: "지원금 계산기의 정보 수집, 공식 출처 확인, 업데이트, 오류 정정 기준을 안내합니다.",
  path: "/editorial-policy/"
});

const sourcePriority = [
  "정부부처, 지자체, 공공기관의 공식 누리집과 공고문",
  "정부24, 복지로, 고용24, 국세청 등 공식 서비스 안내",
  "담당 기관의 보도자료, 고시, 사업 안내서, 신청 페이지",
  "공식 출처가 확인되지 않은 2차 자료는 단독 기준으로 사용하지 않음"
];

const policies = [
  {
    title: "공식 출처 우선",
    body: "지원금 대상, 신청 기간, 금액, 소득·재산 기준은 공식 기관 안내를 우선으로 확인합니다. 블로그, 커뮤니티, 광고성 콘텐츠는 보조 참고자료로만 다룹니다."
  },
  {
    title: "기준 확인일 표시",
    body: "지원금 데이터와 계산 룰에는 기준 확인일을 함께 관리합니다. 정책 변경 가능성이 높은 항목은 결과 화면에서 공식 확인이 필요하다는 안내를 표시합니다."
  },
  {
    title: "과장 표현 금지",
    body: "지원금 수급을 보장하거나 특정 금액을 반드시 받을 수 있다고 표현하지 않습니다. 결과는 가능성 안내이며 공식 심사 결과와 다를 수 있음을 명확히 안내합니다."
  },
  {
    title: "이해하기 쉬운 설명",
    body: "정책 용어는 가능한 쉬운 말로 풀어 설명합니다. 소득인정액, 중위소득, 고용보험 이력처럼 어려운 항목은 가이드와 함께 안내합니다."
  },
  {
    title: "오류 정정",
    body: "사용자 또는 기관이 정보 오류를 제보하면 공식 출처를 기준으로 확인하고, 필요한 경우 데이터와 문구를 수정합니다."
  },
  {
    title: "광고와 정보 분리",
    body: "광고 또는 제휴 영역을 운영하더라도 지원금 자격 결과와 공식 정보 안내가 왜곡되지 않도록 분리합니다."
  }
];

export default function EditorialPolicyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <div className="max-w-3xl">
        <p className="text-sm font-bold text-brand-600">정책</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">편집 정책</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          지원금 계산기는 사용자가 정책 정보를 빠르게 이해할 수 있도록 공식 출처 기반으로 내용을 작성하고 관리합니다.
        </p>
      </div>

      <section className="mt-10 grid gap-8 lg:grid-cols-[380px_1fr]">
        <aside className="rounded-2xl border border-brand-100 bg-brand-50 p-6 md:p-8">
          <h2 className="text-xl font-black text-slate-950">출처 우선순위</h2>
          <div className="mt-5 space-y-3">
            {sourcePriority.map((source, index) => (
              <div key={source} className="rounded-xl bg-white p-4 ring-1 ring-brand-100">
                <p className="text-xs font-black text-brand-600">기준 {index + 1}</p>
                <p className="mt-1 text-sm font-bold leading-6 text-slate-700">{source}</p>
              </div>
            ))}
          </div>
        </aside>

        <div className="grid gap-5 md:grid-cols-2">
          {policies.map((policy) => (
            <section key={policy.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-extrabold text-slate-950">{policy.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{policy.body}</p>
            </section>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="text-2xl font-black text-slate-950">업데이트와 정정 요청</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          정책 변경, 신청 기간 종료, 공식 링크 변경, 금액 또는 기준 오류를 발견한 경우 문의 페이지를 통해 제보할 수 있습니다.
          제보 내용은 공식 출처와 대조한 뒤 반영 여부를 판단합니다.
        </p>
        <div className="mt-5">
          <Link href="/contact/" className="inline-flex rounded-xl bg-brand-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-700">오류 제보하기</Link>
        </div>
      </section>
    </div>
  );
}
