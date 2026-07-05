import Link from "next/link";
import { benefits } from "@/data/benefits";
import { guides } from "@/data/guides";
import { createMetadata } from "@/lib/seo/metadata";
import { BenefitSearchForm } from "@/components/calculators/BenefitSearchForm";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { categoryLabels } from "@/types/benefit";

export const metadata = createMetadata({
  title: "정부지원금 자격 계산기 - 내가 받을 수 있는 지원금 찾기",
  description: "나이, 소득, 거주지역을 입력해 받을 수 있는 정부지원금 후보를 간단히 확인하세요.",
  path: "/"
});

export default function HomePage() {
  const quickCategories = [
    { label: "청년", href: "/benefits/youth/", note: "월세, 저축, 취업" },
    { label: "근로자", href: "/benefits/employment/", note: "장려금, 실업급여" },
    { label: "부모", href: "/benefits/childcare/", note: "자녀, 출산, 육아" },
    { label: "어르신", href: "/benefits/senior/", note: "기초연금" },
    { label: "주거", href: "/benefits/housing/", note: "월세, 무주택" }
  ];

  return (
    <div>
      <section className="bg-[linear-gradient(135deg,#eff6ff_0%,#ffffff_52%,#ecfdf5_100%)]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-[1fr_0.86fr] md:px-6 md:py-20">
          <div className="flex flex-col justify-center">
            <p className="mb-4 inline-flex w-fit rounded-full bg-white px-4 py-2 text-sm font-bold text-brand-700 shadow-sm ring-1 ring-brand-100">1분 자격 체크</p>
            <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
              내가 받을 수 있는 <br />정부지원금 찾기
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              나이, 소득, 거주지역처럼 필요한 조건만 입력하면 받을 가능성이 높은 지원금 후보를 빠르게 정리해드립니다.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#calculator" className="rounded-xl">1분 체크 시작</ButtonLink>
              <ButtonLink href="/calculators/" variant="secondary" className="rounded-xl">계산기 전체 보기</ButtonLink>
            </div>
          </div>
          <Card className="rounded-2xl bg-white/90">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-brand-600">빠른 탐색</p>
                <h2 className="mt-1 text-xl font-black text-slate-950">관심 상황을 먼저 고르세요</h2>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-extrabold text-slate-600">개인정보 불필요</span>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {quickCategories.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-brand-200 hover:bg-brand-50">
                  <p className="font-extrabold text-slate-950">{item.label}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.note}</p>
                </Link>
              ))}
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-500">통합 계산기는 모르는 항목을 비워도 결과에서 추가 확인이 필요한 조건을 따로 보여줍니다.</p>
          </Card>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 md:px-6" id="calculator">
        <Section eyebrow="통합 자격 확인" title="한 번 입력하고 지원금 후보를 확인하세요" description="입력 조건으로 지원금 후보를 찾고, 신청 전 공식 안내를 확인하세요.">
          <BenefitSearchForm />
        </Section>

        <Section eyebrow="계산기" title="인기 지원금 계산기" description="검색 유입을 위한 개별 계산기 페이지입니다.">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <Link key={benefit.id} href={`/calculators/${benefit.slug}/`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-200 hover:bg-brand-50">
                <p className="text-xs font-bold text-brand-600">{categoryLabels[benefit.category]}</p>
                <h3 className="mt-3 text-lg font-extrabold text-slate-950">{benefit.calculatorTitle}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{benefit.seoDescription}</p>
              </Link>
            ))}
          </div>
        </Section>

        <Section eyebrow="가이드" title="신청 전 확인 가이드" description="지원금 신청 전 공식 기준, 서류, 소득 기준을 먼저 확인하세요.">
          <div className="grid gap-5 md:grid-cols-3">
            {guides.slice(0, 3).map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}/`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-brand-200 hover:bg-brand-50">
                <p className="text-xs font-bold text-brand-600">{guide.category}</p>
                <h3 className="mt-3 text-lg font-extrabold text-slate-950">{guide.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{guide.description}</p>
              </Link>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
