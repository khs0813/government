import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4 md:px-6">
        <div className="md:col-span-2">
          <p className="text-lg font-extrabold text-white">{siteConfig.name}</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
            입력 정보를 바탕으로 받을 가능성이 있는 정부지원금 후보를 간단히 확인하는 정보성 계산기입니다. 실제 신청 가능 여부는 각 기관 심사 결과에 따라 달라집니다.
          </p>
        </div>
        <div>
          <p className="font-bold text-white">서비스</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/calculators/">자격 확인</Link></li>
            <li><Link href="/benefits/">지원금 목록</Link></li>
            <li><Link href="/guides/">가이드</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-bold text-white">정책</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/methodology/">결과 안내</Link></li>
            <li><Link href="/editorial-policy/">편집 정책</Link></li>
            <li><Link href="/privacy/">개인정보 처리방침</Link></li>
            <li><Link href="/disclaimer/">면책 고지</Link></li>
            <li><Link href="/contact/">문의</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
