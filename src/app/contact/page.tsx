import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/JsonLd";
import { contactPageJsonLd } from "@/lib/seo/jsonLd";

export const metadata = createMetadata({
  title: "문의와 오류 제보 - 지원금 계산기 운영 연락처",
  description: "지원금 정보 오류, 공식 링크 변경, 서비스 개선 의견을 보낼 연락처와 제보 항목을 확인하세요.",
  path: "/contact/"
});

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "moneyfinancecalculator@gmail.com";

const inquiryTypes = [
  {
    title: "정보 오류 제보",
    body: "지원금 대상, 신청 기간, 지원 금액, 공식 링크, 서류 안내가 실제 공식 공고와 다른 경우 제보해 주세요."
  },
  {
    title: "공식 출처 변경 요청",
    body: "기관 페이지가 이동되었거나 더 정확한 공식 안내 페이지가 있는 경우 링크와 함께 알려주세요."
  },
  {
    title: "서비스 개선 제안",
    body: "입력 화면, 결과 안내, 가이드 내용, 모바일 사용성에 대한 개선 의견을 받을 수 있습니다."
  },
  {
    title: "제휴 및 운영 문의",
    body: "공공정보 활용, 콘텐츠 제휴, 광고, 기관 협력 제안은 목적과 담당자 정보를 포함해 보내주세요."
  }
];

const unavailable = [
  "개별 사용자의 실제 수급 가능 여부 확정",
  "정부지원금 신청 대행",
  "기관 심사 결과 예측",
  "개인별 세무·법률 자문",
  "주민등록번호, 계좌번호, 신분증 등 민감정보 접수"
];

export default function ContactPage() {
  const intro = [
    "문의 페이지는 지원금 정보의 정확도를 유지하기 위한 제보 창구입니다. 공식 공고 링크가 이동했거나, 신청 기간이 바뀌었거나, 대상자·지원 금액·서류 안내가 담당 기관의 최신 기준과 다르게 보이는 경우 페이지 주소와 비교한 공식 링크를 함께 보내주시면 확인에 도움이 됩니다.",
    "이 연락처는 정보 오류 제보와 서비스 개선 의견을 받기 위한 용도입니다. 개별 사용자의 실제 수급 가능 여부 확정, 신청 대행, 기관 심사 결과 예측, 세무·법률 자문은 제공하지 않습니다. 주민등록번호, 계좌번호, 신분증, 상세주소 같은 민감정보는 입력하거나 이메일로 보내지 말고, 신청 여부는 정부24, 복지로, 고용24, 국세청 등 공식 기관에서 직접 확인하세요."
  ];
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <JsonLd data={contactPageJsonLd({
        name: "문의와 오류 제보",
        description: "지원금 정보 오류, 공식 링크 변경, 서비스 개선 의견을 보낼 연락처와 제보 항목을 안내합니다.",
        path: "/contact/",
        email: contactEmail
      })} />
      <div className="max-w-3xl">
        <p className="text-sm font-bold text-brand-600">문의</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">문의와 오류 제보</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          지원금 정보 오류, 공식 링크 변경, 서비스 개선 제안은 아래 연락처로 보내주세요.
        </p>
      </div>
      <div className="mt-8 max-w-4xl space-y-4 text-sm leading-7 text-slate-600 md:text-base md:leading-8">
        {intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>

      <section className="mt-10 rounded-2xl border border-brand-100 bg-brand-50 p-6 md:p-8">
        <p className="text-sm font-bold text-brand-600">연락처</p>
        <h2 className="mt-2 text-2xl font-black text-slate-950">{contactEmail || "운영 이메일 설정 필요"}</h2>
        <p className="mt-3 text-sm font-bold leading-6 text-slate-700">
          주민등록번호, 계좌번호, 신분증, 상세주소를 입력하거나 이메일로 보내지 마세요.
        </p>
        {contactEmail ? (
          <a href={`mailto:${contactEmail}`} className="mt-5 inline-flex rounded-xl bg-brand-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-700">
            이메일 보내기
          </a>
        ) : null}
      </section>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {inquiryTypes.map((type) => (
          <section key={type.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-extrabold text-slate-950">{type.title}</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">{type.body}</p>
          </section>
        ))}
      </div>

      <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-black text-slate-950">보내주시면 좋은 정보</h2>
          <div className="mt-5 divide-y divide-slate-200">
            {[
              "오류가 있는 페이지 주소",
              "비교한 공식 기관 링크 또는 공고문",
              "수정이 필요하다고 생각한 문장이나 항목",
              "사용한 기기와 브라우저, 오류가 발생한 상황"
            ].map((item, index) => (
              <div key={item} className="grid gap-3 py-4 first:pt-0 last:pb-0 md:grid-cols-[100px_1fr]">
                <p className="text-sm font-extrabold text-brand-600">항목 {index + 1}</p>
                <p className="text-sm leading-7 text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h2 className="text-xl font-black text-amber-950">답변이 어려운 문의</h2>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-amber-900">
            {unavailable.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p className="mt-4 text-sm leading-7 text-amber-900">
            개별 신청 가능 여부는 반드시 정부24, 복지로, 고용24, 국세청 등 공식 신청기관에 문의해 주세요.
          </p>
        </aside>
      </section>
    </div>
  );
}
