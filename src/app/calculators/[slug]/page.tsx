import { notFound } from "next/navigation";
import { benefits, getBenefitBySlug } from "@/data/benefits";
import { BenefitSearchForm } from "@/components/calculators/BenefitSearchForm";
import { DisclaimerBox } from "@/components/calculators/DisclaimerBox";
import { PolicyReferenceBox } from "@/components/calculators/PolicyReferenceBox";
import { RelatedCalculators } from "@/components/calculators/RelatedCalculators";
import { ButtonLink } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { createMetadata } from "@/lib/seo/metadata";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, webApplicationJsonLd } from "@/lib/seo/jsonLd";

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
  return createMetadata({
    title: benefit.seoTitle,
    description: benefit.seoDescription,
    path: `/calculators/${benefit.slug}/`,
    type: "article",
    publishedTime: benefit.sourceCheckedAt,
    modifiedTime: benefit.sourceCheckedAt,
    section: "지원금 계산기",
    tags: [benefit.title, benefit.calculatorTitle, benefit.agencyName, "자격 확인"]
  });
}

export default async function CalculatorDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const benefit = getBenefitBySlug(slug);
  if (!benefit) notFound();
  const detailGuidePath = `/benefits/${benefit.slug}/`;
  const isYouthSavingsEnded = benefit.id === "youth-savings-support";
  const isYouthFutureSavings = benefit.id === "youth-future-savings";
  const officialButtonLabel = isYouthSavingsEnded || isYouthFutureSavings ? "공식 안내 확인" : "공식 신청처";

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
      <JsonLd data={breadcrumbJsonLd([{ name: "홈", path: "/" }, { name: "계산기", path: "/calculators/" }, { name: benefit.calculatorTitle, path: `/calculators/${benefit.slug}/` }])} />
      <JsonLd data={faqJsonLd(benefit.faq)} />
      <JsonLd data={webApplicationJsonLd({ name: benefit.calculatorTitle, description: benefit.seoDescription, path: `/calculators/${benefit.slug}/` })} />
      <JsonLd data={articleJsonLd({
        headline: benefit.seoTitle,
        description: benefit.seoDescription,
        path: `/calculators/${benefit.slug}/`,
        dateModified: benefit.sourceCheckedAt
      })} />

      <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
        <div>
          <p className="text-sm font-bold text-brand-600">지원금 계산기</p>
          <h1 className="mt-3 text-4xl font-black text-slate-950">{benefit.calculatorTitle}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">{benefit.shortDescription}</p>
          {isYouthSavingsEnded ? (
            <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950">
              <h2 className="text-lg font-extrabold text-slate-950">청년도약계좌 신규 가입 종료 안내</h2>
              <ul className="mt-3 space-y-2">
                <li>청년도약계좌는 신규 가입이 종료된 상품입니다.</li>
                <li>2026년 현재 신규 가입자는 청년미래적금 등 대체 상품을 확인해야 합니다.</li>
                <li>기존 청년도약계좌 가입자는 유지, 만기, 특별중도해지, 청년미래적금 갈아타기 가능 여부를 공식 안내에서 확인하세요.</li>
                <li>이 페이지는 청년도약계좌 기존 가입자와 대체 상품 확인을 위한 참고용입니다.</li>
              </ul>
              <div className="mt-4">
                <ButtonLink href="/calculators/youth-future-savings/" className="rounded-xl">청년미래적금 대체상품 확인</ButtonLink>
              </div>
            </section>
          ) : null}
          {isYouthFutureSavings ? (
            <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950">
              <h2 className="text-lg font-extrabold text-slate-950">청년미래적금 현재 상태 안내</h2>
              <p className="mt-3">청년미래적금 1차 가입신청은 2026년 7월 3일 종료되었습니다.</p>
              <p>2026년 7월 6일 현재는 가입요건·소득 심사 기간이 시작된 상태입니다.</p>
              <p>이미 신청한 사용자는 취급은행 앱 또는 공식 안내를 통해 심사 결과와 계좌개설 기간을 확인하세요.</p>
              <p>다음 모집 일정은 공식 발표 기준으로 업데이트됩니다.</p>
              <dl className="mt-4 grid gap-2 text-xs font-bold md:grid-cols-3">
                <div className="rounded-xl bg-white/70 px-3 py-2"><dt>기준일</dt><dd className="mt-1 text-slate-950">2026-07-06</dd></div>
                <div className="rounded-xl bg-white/70 px-3 py-2"><dt>1차 가입신청</dt><dd className="mt-1 text-slate-950">2026-06-22 ~ 2026-07-03</dd></div>
                <div className="rounded-xl bg-white/70 px-3 py-2"><dt>현재 상태</dt><dd className="mt-1 text-slate-950">가입요건·소득 심사 기간 시작</dd></div>
              </dl>
            </section>
          ) : null}
          {isYouthFutureSavings ? (
            <section className="mt-6 rounded-2xl border border-brand-100 bg-white p-5 text-sm leading-7 text-slate-700">
              <h2 className="text-lg font-extrabold text-slate-950">청년미래적금 확인 사항</h2>
              <div className="mt-3 grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-bold text-slate-950">개요와 차이</h3>
                  <p className="mt-1">청년미래적금은 청년도약계좌 신규 가입 종료 후 도입된 3년 만기 자유적립식 정책상품입니다. 나이, 직전연도 소득 확인, 개인소득, 가구요건, 우대형 요건을 공식 심사로 확인합니다.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-950">갈아타기 주의</h3>
                  <p className="mt-1">기존 청년도약계좌 가입자는 청년미래적금 계좌 개설 전 청년도약계좌를 먼저 해지하면 갈아타기가 불가할 수 있어 공식 안내를 먼저 확인해야 합니다.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-950">절차 요약</h3>
                  <p className="mt-1">최초 일정은 가입신청, 가입심사, 계좌개설 순서로 진행됩니다. 최종 가능 여부는 취급기관 앱 및 서민금융진흥원 심사 결과에 따릅니다.</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-950">결과 해석</h3>
                  <p className="mt-1">이 계산기는 조건 충족 가능성을 참고로 보여주며, 가입 가능 여부를 보장하지 않습니다.</p>
                </div>
              </div>
            </section>
          ) : null}
          <div className="mt-6">
            <PolicyReferenceBox sourceName={benefit.agencyName} sourceUrl={benefit.sourceUrl} sourceCheckedAt={benefit.sourceCheckedAt} officialUrl={benefit.officialUrl} />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href={benefit.officialUrl}>{officialButtonLabel}</ButtonLink>
            <ButtonLink href={benefit.sourceUrl} variant="secondary">공식 출처</ButtonLink>
            <ButtonLink href={detailGuidePath} variant="ghost">상세 안내</ButtonLink>
          </div>
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
            <div className="mt-5 grid gap-3">
              <ButtonLink href={benefit.officialUrl} className="w-full">{officialButtonLabel}</ButtonLink>
              <ButtonLink href={benefit.sourceUrl} variant="secondary" className="w-full">공식 출처 확인</ButtonLink>
              <ButtonLink href={detailGuidePath} variant="ghost" className="w-full">상세 안내 보기</ButtonLink>
            </div>
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
