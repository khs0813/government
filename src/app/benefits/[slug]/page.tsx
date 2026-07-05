import { notFound } from "next/navigation";
import { benefits, getBenefitBySlug } from "@/data/benefits";
import { ButtonLink } from "@/components/ui/Button";
import { DisclaimerBox } from "@/components/calculators/DisclaimerBox";
import { JsonLd } from "@/components/seo/JsonLd";
import { createMetadata } from "@/lib/seo/metadata";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo/jsonLd";

export function generateStaticParams() {
  return benefits.filter((benefit) => benefit.isActive).map((benefit) => ({ slug: benefit.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const benefit = getBenefitBySlug(slug);
  if (!benefit) return {};
  const description = `${benefit.title}의 대상자, 지원 금액, 신청 시기와 ${benefit.agencyName} 공식 안내 링크를 ${benefit.sourceCheckedAt} 확인 기준으로 정리했습니다.`;
  return createMetadata({
    title: `${benefit.title} 신청 조건과 공식 확인`,
    description,
    path: `/benefits/${benefit.slug}/`
  });
}

export default async function BenefitDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const benefit = getBenefitBySlug(slug);
  if (!benefit) notFound();
  const detailDescription = `${benefit.title}의 대상자, 지원 금액, 신청 시기와 ${benefit.agencyName} 공식 안내 링크를 ${benefit.sourceCheckedAt} 확인 기준으로 정리했습니다.`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 md:px-6">
      <JsonLd data={breadcrumbJsonLd([{ name: "홈", path: "/" }, { name: "지원금", path: "/benefits/" }, { name: benefit.title, path: `/benefits/${benefit.slug}/` }])} />
      <JsonLd data={faqJsonLd(benefit.faq)} />
      <JsonLd data={articleJsonLd({
        headline: `${benefit.title} 신청 조건과 공식 확인`,
        description: detailDescription,
        path: `/benefits/${benefit.slug}/`,
        dateModified: benefit.sourceCheckedAt
      })} />
      <p className="text-sm font-bold text-brand-600">지원금 상세</p>
      <h1 className="mt-3 text-4xl font-black text-slate-950">{benefit.title}</h1>
      <p className="mt-4 text-lg leading-8 text-slate-600">{benefit.shortDescription}</p>
      <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-slate-600">
        <span className="rounded-full bg-slate-100 px-3 py-2">기준 확인일: {benefit.sourceCheckedAt}</span>
        <span className="rounded-full bg-slate-100 px-3 py-2">업데이트 날짜: {benefit.sourceCheckedAt}</span>
        <span className="rounded-full bg-slate-100 px-3 py-2">담당 기관: {benefit.agencyName}</span>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-extrabold text-slate-950">대상자</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {benefit.targetUsers.map((target) => <li key={target}>✓ {target}</li>)}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-extrabold text-slate-950">지원 정보</h2>
          <p className="mt-4 text-sm leading-6 text-slate-600"><b>지원 금액:</b> {benefit.supportAmountText}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600"><b>신청 기간:</b> {benefit.applicationPeriodText}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600"><b>기관:</b> {benefit.agencyName}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600"><b>기준 확인일:</b> {benefit.sourceCheckedAt}</p>
        </div>
      </div>

      <div className="mt-8"><DisclaimerBox /></div>

      <section className="mt-8 rounded-2xl border border-brand-100 bg-brand-50 p-6">
        <h2 className="text-2xl font-extrabold text-slate-950">공식 출처와 신청 전 주의사항</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <a href={benefit.sourceUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-brand-200 bg-white px-5 py-4 text-sm font-extrabold text-brand-700 transition hover:bg-brand-50">
            공식 출처에서 기준 확인
          </a>
          <a href={benefit.officialUrl} target="_blank" rel="noreferrer" className="rounded-xl border border-brand-200 bg-white px-5 py-4 text-sm font-extrabold text-brand-700 transition hover:bg-brand-50">
            공식 신청처 바로가기
          </a>
        </div>
        <ul className="mt-5 space-y-2 text-sm leading-7 text-slate-700">
          <li>지원금 금액, 조건, 신청기간은 정책 변경이나 예산 상황에 따라 달라질 수 있습니다.</li>
          <li>신청 전에는 위 공식 출처에서 최신 공고, 제출 서류, 접수 가능 여부를 다시 확인하세요.</li>
          <li>이 페이지는 {benefit.sourceCheckedAt} 기준으로 확인한 내용을 바탕으로 작성되었습니다.</li>
        </ul>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-extrabold text-slate-950">자주 묻는 질문</h2>
        <div className="mt-5 space-y-5">
          {benefit.faq.map((item) => (
            <div key={item.question}>
              <h3 className="font-bold text-slate-950">{item.question}</h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href={`/calculators/${benefit.slug}/`}>자격 계산하기</ButtonLink>
        <ButtonLink href={benefit.officialUrl} variant="secondary">공식 신청처 확인</ButtonLink>
      </div>
    </div>
  );
}
