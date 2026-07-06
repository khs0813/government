import { getBenefitById } from "@/data/benefits";
import type { EligibilityResult } from "@/types/eligibility";
import { Card } from "@/components/ui/Card";
import { ButtonLink } from "@/components/ui/Button";
import { EligibilityBadge } from "./EligibilityBadge";
import { SourceNotice } from "./SourceNotice";

export function BenefitResultCard({ result }: { result: EligibilityResult }) {
  const benefit = getBenefitById(result.benefitId);
  if (!benefit) return null;
  const missingFieldsCount = result.missingFields.length;
  const isYouthSavingsEnded = benefit.id === "youth-savings-support";

  return (
    <Card className="space-y-5 rounded-2xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <EligibilityBadge status={result.status} />
            {missingFieldsCount ? <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">추가 입력 {missingFieldsCount}개</span> : null}
          </div>
          <h3 className="mt-3 text-2xl font-black text-slate-950">{benefit.title}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{benefit.shortDescription}</p>
        </div>
        <div className="w-full rounded-2xl bg-slate-50 p-4 md:w-40">
          <div className="flex items-end justify-between gap-3 md:block">
            <p className="text-xs font-bold text-slate-500">가능성 점수</p>
            <p className="text-2xl font-black text-slate-950">{result.score}<span className="text-sm text-slate-500">점</span></p>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-brand-600" style={{ width: `${result.score}%` }} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
          <p className="mb-2 text-sm font-bold text-slate-950">충족 가능성이 있는 조건</p>
          <ul className="space-y-2 text-sm leading-6 text-slate-600">
            {result.reasons.length ? result.reasons.map((reason) => <li key={reason}>{reason}</li>) : <li>입력값 기준으로는 조건을 일부 충족한 것으로 보기 어렵습니다.</li>}
          </ul>
        </div>
        <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
          <p className="mb-2 text-sm font-bold text-slate-950">추가 확인</p>
          <ul className="space-y-2 text-sm leading-6 text-slate-600">
            {result.warnings.length ? result.warnings.map((warning) => <li key={warning}>{warning}</li>) : <li>예외 조건이 있을 수 있으므로 공식 안내를 확인하세요.</li>}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-700">
        <p><span className="font-bold text-slate-950">지원 내용 참고:</span> {benefit.supportAmountText}</p>
        <p className="mt-2"><span className="font-bold text-slate-950">신청 기간:</span> {benefit.applicationPeriodText}</p>
        <p className="mt-2"><span className="font-bold text-slate-950">신청 기관:</span> {benefit.agencyName}</p>
        <p className="mt-3 text-xs leading-5 text-slate-500">이 결과는 사전 참고용이며, 실제 대상 여부와 지급액은 공식 기관 심사 결과에 따라 달라집니다.</p>
      </div>

      {result.requiresOfficialCheck ? <SourceNotice sourceName={result.sourceName} sourceUrl={result.sourceUrl} sourceCheckedAt={result.sourceCheckedAt} /> : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <ButtonLink href={benefit.officialUrl} className="rounded-xl">공식 안내 확인</ButtonLink>
        {isYouthSavingsEnded ? <ButtonLink href="/calculators/youth-future-savings/" variant="secondary" className="rounded-xl">청년미래적금 확인</ButtonLink> : null}
        <ButtonLink href={`/benefits/${benefit.slug}/`} variant="secondary" className="rounded-xl">상세 보기</ButtonLink>
      </div>
    </Card>
  );
}
