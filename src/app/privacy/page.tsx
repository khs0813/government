import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "개인정보 처리방침",
  description: "지원금 계산기의 개인정보 수집 범위, 이용 목적, 보관 기준, 외부 서비스 이용 기준을 안내합니다.",
  path: "/privacy/"
});

const sections = [
  {
    title: "1. 기본 원칙",
    body: [
      "지원금 계산기는 사용자가 받을 가능성이 있는 정부지원금 후보를 확인할 수 있도록 돕는 정보성 서비스입니다.",
      "기본 자격 확인 과정에서는 이름, 주민등록번호, 전화번호, 상세주소, 계좌번호, 신분증 사본 등 개인을 직접 식별할 수 있는 정보를 요구하지 않습니다.",
      "사용자가 입력하는 나이, 거주지역, 소득 구간, 재산 구간, 고용보험 여부, 주거 형태 등은 브라우저에서 자격 가능성 판단에 사용되며, 별도 저장 기능을 제공하지 않는 한 서버에 회원정보로 보관하지 않습니다."
    ]
  },
  {
    title: "2. 처리할 수 있는 정보",
    body: [
      "서비스 운영 과정에서 접속 로그, 브라우저 정보, 기기 정보, 방문 페이지, 오류 로그, 대략적인 이용 시간 같은 비식별 이용 정보가 생성될 수 있습니다.",
      "문의 기능을 운영하는 경우 사용자가 직접 제공한 이메일 주소, 문의 내용, 답변 이력은 문의 처리와 분쟁 대응을 위해 필요한 기간 동안 보관할 수 있습니다.",
      "광고, 통계, 보안 도구를 사용하는 경우 쿠키 또는 유사 기술이 사용될 수 있으며, 개인 식별 정보를 광고·분석 도구에 직접 입력하거나 전송하지 않도록 운영합니다."
    ]
  },
  {
    title: "3. 이용 목적",
    body: [
      "입력값은 지원금 후보를 추정하고 결과 화면을 제공하기 위해 사용됩니다.",
      "접속 로그와 오류 정보는 서비스 안정화, 보안 점검, 검색엔진 최적화, 사용성 개선을 위해 사용할 수 있습니다.",
      "문의 정보는 사용자 문의 답변, 오류 제보 확인, 공식 출처 정정 요청 처리, 서비스 개선 제안 검토를 위해 사용합니다."
    ]
  },
  {
    title: "4. 보관 및 파기",
    body: [
      "기본 계산 입력값은 회원 계정이나 신청서 형태로 저장하지 않는 것을 원칙으로 합니다.",
      "문의 기록은 처리 완료 후 운영상 필요한 기간 동안 보관할 수 있으며, 보관 목적이 사라지면 지체 없이 삭제하거나 식별할 수 없는 형태로 처리합니다.",
      "법령상 보관 의무가 있는 정보가 발생하는 경우 해당 법령에서 정한 기간 동안 보관할 수 있습니다."
    ]
  },
  {
    title: "5. 제3자 제공 및 처리위탁",
    body: [
      "지원금 계산기는 사용자의 계산 입력값을 정부기관 신청 목적으로 대신 제출하지 않습니다.",
      "서비스 운영을 위해 호스팅, 보안, 이메일, 분석 도구를 사용할 수 있으며, 이 경우 각 제공사의 개인정보 처리 기준이 함께 적용될 수 있습니다.",
      "법령에 따른 요청이 있거나 사용자의 명시적 동의가 있는 경우를 제외하고 개인정보를 제3자에게 판매하거나 임의 제공하지 않습니다."
    ]
  },
  {
    title: "6. 사용자 권리",
    body: [
      "사용자는 본인이 제공한 문의 정보에 대해 열람, 정정, 삭제, 처리정지를 요청할 수 있습니다.",
      "브라우저 설정을 통해 쿠키 저장을 거부하거나 기존 쿠키를 삭제할 수 있습니다. 단, 일부 기능이나 통계 측정이 제한될 수 있습니다.",
      "개인정보와 관련한 요청은 문의 페이지에 안내된 연락 채널을 통해 접수합니다."
    ]
  }
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <div className="max-w-3xl">
        <p className="text-sm font-bold text-brand-600">정책</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">개인정보 처리방침</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          이 문서는 지원금 계산기가 어떤 정보를 처리할 수 있고, 그 정보를 어떤 기준으로 보호하는지 설명합니다.
        </p>
        <p className="mt-3 text-sm font-bold text-slate-500">시행일: 2026년 7월 4일</p>
      </div>

      <section className="mt-10 rounded-2xl border border-brand-100 bg-brand-50 p-6 md:p-8">
        <h2 className="text-xl font-black text-slate-950">핵심 요약</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {["주민등록번호와 계좌번호를 요구하지 않습니다.", "계산 입력값은 신청서로 제출되지 않습니다.", "문의 정보는 문의 처리 목적으로만 사용합니다."].map((item) => (
            <p key={item} className="rounded-xl bg-white p-4 text-sm font-bold leading-6 text-slate-700 ring-1 ring-brand-100">{item}</p>
          ))}
        </div>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {sections.map((section) => (
          <section key={section.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-extrabold text-slate-950">{section.title}</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
