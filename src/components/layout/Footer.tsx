import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4 md:px-6">
        <div className="md:col-span-2">
          <p className="text-lg font-extrabold text-white">{siteConfig.name}</p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
            정부지원금 후보를 빠르게 확인하고 공식 신청처로 이동할 수 있습니다.
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
