import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "서비스 소개",
  description: "지원금 계산기는 사용자가 받을 가능성이 있는 정부지원금 후보를 빠르게 확인하도록 돕는 정보성 웹사이트입니다.",
  path: "/about/"
});

export default function StaticPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14 md:px-6">
      <h1 className="text-4xl font-black text-slate-950">서비스 소개</h1>
      <div className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-8 text-lg leading-9 text-slate-700">
        <p>지원금 계산기는 사용자가 받을 가능성이 있는 정부지원금 후보를 빠르게 확인하도록 돕는 정보성 웹사이트입니다.</p>
        <p>이 사이트는 공식 정부기관이 아니며, 신청 대행이나 수급 확정을 제공하지 않습니다.</p>
      </div>
    </div>
  );
}
