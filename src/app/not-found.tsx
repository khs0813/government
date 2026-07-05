import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="text-4xl font-black text-slate-950">페이지를 찾을 수 없습니다</h1>
      <p className="mt-4 text-slate-600">주소가 변경되었거나 아직 준비되지 않은 페이지입니다.</p>
      <Link href="/" className="mt-8 inline-flex rounded-2xl bg-brand-600 px-5 py-3 font-bold text-white">홈으로 가기</Link>
    </div>
  );
}
