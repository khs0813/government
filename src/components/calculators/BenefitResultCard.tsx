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
          <p className="mb-2 text-sm font-bold text-slate-950">맞는 조건</p>
          <ul className="space-y-2 text-sm leading-6 text-slate-600">
            {result.reasons.length ? result.reasons.map((reason) => <li key={reason}>{reason}</li>) : <li>아직 충족 조건이 충분하지 않습니다.</li>}
          </ul>
        </div>
        <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
          <p className="mb-2 text-sm font-bold text-slate-950">추가 확인</p>
          <ul className="space-y-2 text-sm leading-6 text-slate-600">
            {result.warnings.length ? result.warnings.map((warning) => <li key={warning}>{warning}</li>) : <li>현재 입력 기준으로 추가 경고가 없습니다.</li>}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-700">
        <p><span className="font-bold text-slate-950">예상 지원금:</span> {benefit.supportAmountText}</p>
        <p className="mt-2"><span className="font-bold text-slate-950">신청 기간:</span> {benefit.applicationPeriodText}</p>
        <p className="mt-2"><span className="font-bold text-slate-950">신청 기관:</span> {benefit.agencyName}</p>
      </div>

      {result.requiresOfficialCheck ? <SourceNotice sourceName={result.sourceName} sourceUrl={result.sourceUrl} sourceCheckedAt={result.sourceCheckedAt} /> : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <ButtonLink href={benefit.officialUrl} className="rounded-xl">공식 신청처 확인</ButtonLink>
        <ButtonLink href={`/benefits/${benefit.slug}/`} variant="secondary" className="rounded-xl">상세 보기</ButtonLink>
      </div>
    </Card>
  );
}
