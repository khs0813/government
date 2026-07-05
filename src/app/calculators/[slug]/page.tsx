import { notFound } from "next/navigation";
import { benefits, getBenefitBySlug } from "@/data/benefits";
import { BenefitSearchForm } from "@/components/calculators/BenefitSearchForm";
import { DisclaimerBox } from "@/components/calculators/DisclaimerBox";
import { RelatedCalculators } from "@/components/calculators/RelatedCalculators";
import { JsonLd } from "@/components/seo/JsonLd";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, faqJsonLd, webApplicationJsonLd } from "@/lib/seo/jsonLd";

export function generateStaticParams() {
  return benefits.map((benefit) => ({ slug: benefit.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const benefit = getBenefitBySlug(slug);
  if (!benefit) return {};
  return createMetadata({ title: benefit.seoTitle, description: benefit.seoDescription, path: `/calculators/${benefit.slug}/` });
}

export default async function CalculatorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const benefit = getBenefitBySlug(slug);
  if (!benefit) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <JsonLd data={breadcrumbJsonLd([{ name: "홈", path: "/" }, { name: "계산기", path: "/calculators/" }, { name: benefit.calculatorTitle, path: `/calculators/${benefit.slug}/` }])} />
      <JsonLd data={faqJsonLd(benefit.faq)} />
      <JsonLd data={webApplicationJsonLd({ name: benefit.calculatorTitle, description: benefit.seoDescription, path: `/calculators/${benefit.slug}/` })} />

      <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
        <div>
          <p className="text-sm font-bold text-brand-600">지원금 계산기</p>
          <h1 className="mt-3 text-4xl font-black text-slate-950">{benefit.calculatorTitle}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">{benefit.shortDescription}</p>
          <div className="mt-8">
            <BenefitSearchForm benefitId={benefit.id} />
          </div>
        </div>
        <aside className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-extrabold text-slate-950">공식 확인 정보</h2>
            <dl className="mt-4 space-y-3 text-sm text-slate-600">
              <div><dt className="font-bold text-slate-950">신청 기관</dt><dd>{benefit.agencyName}</dd></div>
              <div><dt className="font-bold text-slate-950">지원 금액</dt><dd>{benefit.supportAmountText}</dd></div>
              <div><dt className="font-bold text-slate-950">신청 기간</dt><dd>{benefit.applicationPeriodText}</dd></div>
            </dl>
          </div>
          <DisclaimerBox />
        </aside>
      </div>

      <section className="mt-16 grid gap-8 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-extrabold text-slate-950">대상자</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {benefit.targetUsers.map((target) => <li key={target}>{target}</li>)}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
          <h2 className="text-xl font-extrabold text-slate-950">자주 묻는 질문</h2>
          <div className="mt-4 space-y-4">
            {benefit.faq.map((item) => (
              <div key={item.question}>
                <h3 className="font-bold text-slate-950">{item.question}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-black text-slate-950">관련 계산기</h2>
        <div className="mt-5"><RelatedCalculators currentId={benefit.id} /></div>
      </section>
    </div>
  );
}
