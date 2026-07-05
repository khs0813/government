import Link from "next/link";
import { siteConfig } from "@/lib/site";

const nav = [
  { href: "/calculators/", label: "자격 확인" },
  { href: "/benefits/", label: "지원금" },
  { href: "/guides/", label: "가이드" },
  { href: "/methodology/", label: "결과 안내" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6">
        <Link href="/" className="flex w-fit items-center gap-2 font-extrabold text-slate-950">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-xs font-black text-white">혜택</span>
          <span>{siteConfig.name}</span>
        </Link>
        <nav className="-mx-1 flex items-center gap-1 overflow-x-auto pb-1 md:mx-0 md:gap-2 md:overflow-visible md:pb-0">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="shrink-0 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-950">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
