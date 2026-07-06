import Link from "next/link";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { webPageJsonLd } from "@/lib/seo/jsonLd";

export const metadata = createMetadata({
  title: "면책 고지",
  description: "지원금 계산 결과와 정보 이용 시 반드시 확인해야 할 한계, 공식 기관 확인 의무, 책임 범위를 안내합니다.",
  path: "/disclaimer/"
});

const notices = [
  {
    title: "참고용 추정 결과입니다",
    body: "계산 결과는 사용자가 입력한 정보와 사이트에 등록된 기준을 바탕으로 한 가능성 안내입니다. 실제 신청 가능 여부, 지급 금액, 지급 시기, 심사 결과를 보장하지 않습니다."
  },
  {
    title: "공식 기관 판단이 최종 기준입니다",
    body: "정부지원금은 담당 기관의 최신 공고, 예산 상황, 세부 예외, 제출 서류, 소득·재산 조사 결과에 따라 달라집니다. 신청 전 반드시 공식 신청처와 담당 기관 안내를 확인해야 합니다."
  },
  {
    title: "정책은 변경될 수 있습니다",
    body: "지원 대상, 소득 기준, 재산 기준, 신청 기간, 지원 금액은 정부 정책과 지자체 공고에 따라 수시로 바뀔 수 있습니다. 사이트의 기준 확인일 이후 변경된 내용이 있을 수 있습니다."
  },
  {
    title: "신청 대행 서비스가 아닙니다",
    body: "이 사이트는 정보 제공과 자격 가능성 확인을 돕는 서비스이며, 정부기관을 대신해 신청서를 제출하거나 심사를 대행하지 않습니다."
  },
  {
    title: "사용자 입력 오류에 따른 차이가 있을 수 있습니다",
    body: "나이, 소득, 재산, 가구원 수, 고용보험 이력, 주거 형태 등을 잘못 입력하면 결과가 실제와 다르게 표시될 수 있습니다."
  },
  {
    title: "외부 링크 이용 기준",
    body: "공식 신청처, 정부기관, 공공기관, 금융기관 등 외부 사이트로 이동한 뒤의 신청 절차와 개인정보 처리는 해당 사이트의 정책을 따릅니다."
  }
];

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <JsonLd data={webPageJsonLd({
        name: "면책 고지",
        description: "지원금 계산 결과와 정보 이용 시 반드시 확인해야 할 한계, 공식 기관 확인 의무, 책임 범위를 안내합니다.",
        path: "/disclaimer/"
      })} />
      <div className="max-w-3xl">
        <p className="text-sm font-bold text-brand-600">정책</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">면책 고지</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          지원금 계산기 이용 전, 결과의 의미와 한계를 반드시 확인해 주세요.
        </p>
      </div>

      <section className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6 md:p-8">
        <h2 className="text-xl font-black text-amber-950">가장 중요한 안내</h2>
        <p className="mt-3 text-sm leading-7 text-amber-900">
          이 사이트의 결과는 공식 심사 결과가 아닙니다. 실제 신청 가능 여부와 지급 금액은 담당 기관의 최신 기준과 심사 결과에 따라 결정됩니다.
        </p>
      </section>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {notices.map((notice) => (
          <section key={notice.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-extrabold text-slate-950">{notice.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{notice.body}</p>
          </section>
        ))}
      </div>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
        <h2 className="text-2xl font-black text-slate-950">신청 전 확인 순서</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {["계산 결과에서 후보 지원금을 확인합니다.", "공식 신청처 링크에서 최신 공고와 신청 기간을 확인합니다.", "필요 서류와 소득·재산 기준을 확인한 뒤 직접 신청합니다."].map((item, index) => (
            <div key={item} className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-black text-brand-600">STEP {index + 1}</p>
              <p className="mt-2 text-sm font-bold leading-6 text-slate-700">{item}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/guides/" className="rounded-xl bg-brand-600 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-brand-700">신청 가이드 보기</Link>
          <Link href="/methodology/" className="rounded-xl bg-slate-100 px-5 py-3 text-center text-sm font-bold text-slate-900 transition hover:bg-slate-200">결과 안내 보기</Link>
        </div>
      </section>
    </div>
  );
}
