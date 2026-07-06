"use client";

import { type FormEvent, type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { benefitRules } from "@/data/rules";
import { evaluateBenefits } from "@/lib/eligibility/engine";
import { cx } from "@/lib/utils/format";
import type { BenefitRule, EligibilityResult } from "@/types/eligibility";
import type { UserInput } from "@/types/user-input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BenefitResultCard } from "./BenefitResultCard";
import { DisclaimerBox } from "./DisclaimerBox";

const regions = ["서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종", "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"];
const propertyAmounts = [50000000, 100000000, 240000000, 500000000, 800000000] as const;
const maritalStatuses = ["single", "married", "unknown"] as const;
const employmentStatuses = ["employed", "self_employed", "unemployed", "student", "retired", "none"] as const;
const housingTypes = ["own", "jeonse", "monthly_rent", "family", "unknown"] as const;
const youthFutureWorkStatuses = ["sme_employee", "new_sme_employee", "small_business_owner", "not_applicable", "unknown"] as const;

const limits = {
  age: { min: 1, max: 120 },
  householdSize: { min: 1, max: 20 },
  childrenCount: { min: 0, max: 20 },
  militaryServiceYears: { min: 0, max: 6 },
  moneyManwon: { min: 0, max: 1000000 }
} as const;

const fieldLabels: Record<keyof UserInput, string> = {
  age: "나이",
  region: "거주지역",
  householdSize: "가구원 수",
  annualIncome: "연 소득",
  monthlyIncome: "월 소득",
  propertyAmount: "재산 구간",
  maritalStatus: "가구 유형",
  childrenCount: "자녀 수",
  employmentStatus: "근로 상태",
  hasEmploymentInsurance: "고용보험 가입",
  housingType: "주거 형태",
  isHomeOwner: "주택 보유 여부",
  isPregnantOrPostpartum: "임신/출산 관련",
  isOnParentalLeave: "육아휴직 중/예정",
  isLowIncomeHousehold: "저소득/차상위 해당",
  militaryServiceYears: "병역 이행 기간",
  hasPreviousYearIncomeProof: "직전연도 소득 확인 가능 여부",
  needsHouseholdRequirementCheck: "가구요건 공식 확인 필요",
  youthFutureWorkStatus: "중소기업·신규취업·소상공인 여부",
  hasExistingYouthSavingsAccount: "기존 청년도약계좌 가입 여부",
  wantsYouthFutureSwitch: "청년미래적금 갈아타기 관심 여부"
};

const groupFields = {
  basics: ["age", "region", "householdSize"] as Array<keyof UserInput>,
  income: ["monthlyIncome", "annualIncome", "propertyAmount"] as Array<keyof UserInput>,
  situation: [
    "employmentStatus",
    "hasEmploymentInsurance",
    "housingType",
    "isHomeOwner",
    "maritalStatus",
    "childrenCount",
    "isPregnantOrPostpartum",
    "isOnParentalLeave",
    "isLowIncomeHousehold",
    "militaryServiceYears",
    "hasPreviousYearIncomeProof",
    "needsHouseholdRequirementCheck",
    "youthFutureWorkStatus",
    "hasExistingYouthSavingsAccount",
    "wantsYouthFutureSwitch"
  ] as Array<keyof UserInput>
};

function numberInRangeOrUndefined(value: FormDataEntryValue | null, min: number, max: number) {
  if (value === null || value === "") return undefined;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || !Number.isInteger(parsed)) return undefined;
  if (parsed < min || parsed > max) return undefined;
  return parsed;
}

function manwonToWon(value: FormDataEntryValue | null) {
  const parsed = numberInRangeOrUndefined(value, limits.moneyManwon.min, limits.moneyManwon.max);
  return typeof parsed === "number" ? parsed * 10000 : undefined;
}

function booleanOrUndefined(value: FormDataEntryValue | null) {
  if (value === null || value === "") return undefined;
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

function stringEnumOrDefault<T extends string>(value: FormDataEntryValue | null, allowed: readonly T[], defaultValue: T) {
  if (typeof value !== "string" || value === "") return defaultValue;
  return allowed.includes(value as T) ? value as T : defaultValue;
}

function stringEnumOrUndefined<T extends string>(value: FormDataEntryValue | null, allowed: readonly T[]) {
  if (typeof value !== "string" || value === "") return undefined;
  return allowed.includes(value as T) ? value as T : undefined;
}

function numberEnumOrUndefined<T extends number>(value: FormDataEntryValue | null, allowed: readonly T[]) {
  if (value === null || value === "") return undefined;
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return undefined;
  return allowed.includes(parsed as T) ? parsed as T : undefined;
}

function hasRawValue(value: FormDataEntryValue | null) {
  return typeof value === "string" && value.trim() !== "";
}

function validateNumberField(formData: FormData, field: keyof UserInput, min: number, max: number, unitLabel?: string) {
  const value = formData.get(String(field));
  if (!hasRawValue(value)) return undefined;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || !Number.isInteger(parsed)) return `${fieldLabels[field]}은 숫자로 입력하세요.`;
  if (parsed < min || parsed > max) return `${fieldLabels[field]}은 ${min}~${max}${unitLabel || ""} 범위로 입력하세요.`;
  return undefined;
}

function validateFormData(formData: FormData, fields: Set<keyof UserInput>, requireVisibleFields: boolean) {
  const errors: string[] = [];
  if (requireVisibleFields) {
    fields.forEach((field) => {
      const value = formData.get(String(field));
      if (!hasRawValue(value)) errors.push(`${fieldLabels[field]}을(를) 입력하거나 선택하세요.`);
    });
  }

  [
    validateNumberField(formData, "age", limits.age.min, limits.age.max, "세"),
    validateNumberField(formData, "householdSize", limits.householdSize.min, limits.householdSize.max, "명"),
    validateNumberField(formData, "childrenCount", limits.childrenCount.min, limits.childrenCount.max, "명"),
    validateNumberField(formData, "militaryServiceYears", limits.militaryServiceYears.min, limits.militaryServiceYears.max, "년"),
    validateNumberField(formData, "monthlyIncome", limits.moneyManwon.min, limits.moneyManwon.max, "만원"),
    validateNumberField(formData, "annualIncome", limits.moneyManwon.min, limits.moneyManwon.max, "만원")
  ].forEach((error) => {
    if (error) errors.push(error);
  });

  return Array.from(new Set(errors));
}

function fieldsForRules(rules: BenefitRule[]) {
  const fields = new Set<keyof UserInput>();
  for (const rule of rules) {
    rule.inputs.forEach((field) => fields.add(field));
    rule.conditions.forEach((condition) => fields.add(condition.field));
  }
  return fields;
}

function SectionShell({ step, title, description, children }: { step: string; title: string; description: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 md:p-5">
      <div className="mb-4 flex items-start gap-3">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-600 text-sm font-extrabold text-white">{step}</span>
        <div>
          <h3 className="text-base font-extrabold text-slate-950">{title}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </section>
  );
}

function FieldFrame({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-800">{label}</span>
      <span className="mt-2 block">{children}</span>
      {hint ? <span className="mt-2 block text-xs leading-5 text-slate-500">{hint}</span> : null}
    </label>
  );
}

const inputClass = "h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-100";

function MoneyInput({ name, placeholder }: { name: "monthlyIncome" | "annualIncome"; placeholder: string }) {
  return (
    <div className="relative">
      <input name={name} type="number" min={limits.moneyManwon.min} max={limits.moneyManwon.max} step="1" inputMode="numeric" className={cx(inputClass, "pr-14")} placeholder={placeholder} />
      <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-bold text-slate-500">만원</span>
    </div>
  );
}

function SegmentedField({ name, options }: { name: keyof UserInput; options: Array<{ value: string; label: string }> }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((option) => (
        <label key={option.value} className="relative">
          <input className="peer sr-only" type="radio" name={name} value={option.value} />
          <span className="flex h-12 cursor-pointer items-center justify-center rounded-xl border border-slate-300 bg-white px-3 text-sm font-bold text-slate-700 transition peer-checked:border-brand-600 peer-checked:bg-brand-50 peer-checked:text-brand-700 peer-focus-visible:ring-4 peer-focus-visible:ring-brand-100">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}

function SelectField({ name, children }: { name: keyof UserInput; children: ReactNode }) {
  return (
    <select name={name} className={inputClass}>
      {children}
    </select>
  );
}

function RenderField({ field }: { field: keyof UserInput }) {
  switch (field) {
    case "age":
      return (
        <FieldFrame label="나이" hint="만 나이 기준으로 입력하세요.">
          <input name="age" type="number" min={limits.age.min} max={limits.age.max} step="1" inputMode="numeric" className={inputClass} placeholder="예: 29" />
        </FieldFrame>
      );
    case "region":
      return (
        <FieldFrame label="거주지역" hint="지자체 사업 확인에 사용합니다.">
          <SelectField name="region">
            <option value="">선택</option>
            {regions.map((region) => <option key={region} value={region}>{region}</option>)}
          </SelectField>
        </FieldFrame>
      );
    case "householdSize":
      return (
        <FieldFrame label="가구원 수" hint="본인을 포함한 기준입니다.">
          <input name="householdSize" type="number" min={limits.householdSize.min} max={limits.householdSize.max} step="1" inputMode="numeric" className={inputClass} placeholder="예: 2" />
        </FieldFrame>
      );
    case "monthlyIncome":
      return (
        <FieldFrame label="월 소득" hint="세전 금액을 대략 입력해도 됩니다.">
          <MoneyInput name="monthlyIncome" placeholder="예: 250" />
        </FieldFrame>
      );
    case "annualIncome":
      return (
        <FieldFrame label="연 소득" hint="연간 총소득을 만원 단위로 입력하세요.">
          <MoneyInput name="annualIncome" placeholder="예: 3000" />
        </FieldFrame>
      );
    case "propertyAmount":
      return (
        <FieldFrame label="재산 구간" hint="정확한 금액을 몰라도 가까운 구간을 선택하세요.">
          <SelectField name="propertyAmount">
            <option value="">선택</option>
            <option value="50000000">5천만원 이하</option>
            <option value="100000000">1억원 이하</option>
            <option value="240000000">2.4억원 이하</option>
            <option value="500000000">5억원 이하</option>
            <option value="800000000">5억원 초과</option>
          </SelectField>
        </FieldFrame>
      );
    case "maritalStatus":
      return (
        <FieldFrame label="가구 유형">
          <SegmentedField name="maritalStatus" options={[{ value: "single", label: "단독/미혼" }, { value: "married", label: "부부/기혼" }]} />
        </FieldFrame>
      );
    case "childrenCount":
      return (
        <FieldFrame label="자녀 수">
          <input name="childrenCount" type="number" min={limits.childrenCount.min} max={limits.childrenCount.max} step="1" inputMode="numeric" className={inputClass} placeholder="예: 1" />
        </FieldFrame>
      );
    case "employmentStatus":
      return (
        <FieldFrame label="근로 상태">
          <SelectField name="employmentStatus">
            <option value="none">선택</option>
            <option value="employed">근로자</option>
            <option value="self_employed">사업자/프리랜서</option>
            <option value="unemployed">실업 상태</option>
            <option value="student">학생</option>
            <option value="retired">은퇴</option>
          </SelectField>
        </FieldFrame>
      );
    case "hasEmploymentInsurance":
      return (
        <FieldFrame label="고용보험 가입">
          <SegmentedField name="hasEmploymentInsurance" options={[{ value: "true", label: "예" }, { value: "false", label: "아니오" }]} />
        </FieldFrame>
      );
    case "housingType":
      return (
        <FieldFrame label="주거 형태">
          <SelectField name="housingType">
            <option value="unknown">선택</option>
            <option value="own">자가</option>
            <option value="jeonse">전세</option>
            <option value="monthly_rent">월세</option>
            <option value="family">가족과 거주</option>
          </SelectField>
        </FieldFrame>
      );
    case "isHomeOwner":
      return (
        <FieldFrame label="주택 보유 여부">
          <SegmentedField name="isHomeOwner" options={[{ value: "false", label: "무주택" }, { value: "true", label: "보유" }]} />
        </FieldFrame>
      );
    case "isPregnantOrPostpartum":
      return (
        <FieldFrame label="임신/출산 관련">
          <SegmentedField name="isPregnantOrPostpartum" options={[{ value: "true", label: "예" }, { value: "false", label: "아니오" }]} />
        </FieldFrame>
      );
    case "isOnParentalLeave":
      return (
        <FieldFrame label="육아휴직 중/예정">
          <SegmentedField name="isOnParentalLeave" options={[{ value: "true", label: "예" }, { value: "false", label: "아니오" }]} />
        </FieldFrame>
      );
    case "isLowIncomeHousehold":
      return (
        <FieldFrame label="저소득/차상위 해당">
          <SegmentedField name="isLowIncomeHousehold" options={[{ value: "true", label: "예" }, { value: "false", label: "아니오" }]} />
        </FieldFrame>
      );
    case "militaryServiceYears":
      return (
        <FieldFrame label="병역 이행 기간" hint="없으면 0, 병역 이행자는 최대 6년까지 입력하세요.">
          <input name="militaryServiceYears" type="number" min={limits.militaryServiceYears.min} max={limits.militaryServiceYears.max} step="1" inputMode="numeric" className={inputClass} placeholder="예: 0" />
        </FieldFrame>
      );
    case "hasPreviousYearIncomeProof":
      return (
        <FieldFrame label="직전연도 소득 확인 가능 여부">
          <SegmentedField name="hasPreviousYearIncomeProof" options={[{ value: "true", label: "가능" }, { value: "false", label: "확인 필요" }]} />
        </FieldFrame>
      );
    case "needsHouseholdRequirementCheck":
      return (
        <FieldFrame label="가구요건 공식 확인">
          <SegmentedField name="needsHouseholdRequirementCheck" options={[{ value: "true", label: "확인 필요" }, { value: "false", label: "모름" }]} />
        </FieldFrame>
      );
    case "youthFutureWorkStatus":
      return (
        <FieldFrame label="중소기업·신규취업·소상공인 여부" hint="우대형 가능성은 공식 심사에서 자동 분류될 수 있습니다.">
          <SelectField name="youthFutureWorkStatus">
            <option value="unknown">선택</option>
            <option value="sme_employee">중소기업 재직자</option>
            <option value="new_sme_employee">중소기업 신규 취업자</option>
            <option value="small_business_owner">소상공인</option>
            <option value="not_applicable">해당 없음</option>
          </SelectField>
        </FieldFrame>
      );
    case "hasExistingYouthSavingsAccount":
      return (
        <FieldFrame label="기존 청년도약계좌 가입 여부">
          <SegmentedField name="hasExistingYouthSavingsAccount" options={[{ value: "true", label: "가입 중" }, { value: "false", label: "아니오" }]} />
        </FieldFrame>
      );
    case "wantsYouthFutureSwitch":
      return (
        <FieldFrame label="청년미래적금 갈아타기 관심 여부">
          <SegmentedField name="wantsYouthFutureSwitch" options={[{ value: "true", label: "관심 있음" }, { value: "false", label: "아니오" }]} />
        </FieldFrame>
      );
  }
}

function MissingFieldsNotice({ results }: { results: EligibilityResult[] }) {
  const missingFields = Array.from(new Set(results.flatMap((result) => result.missingFields)))
    .filter((field): field is keyof UserInput => field in fieldLabels)
    .slice(0, 6);

  if (!missingFields.length) return null;

  return (
    <div className="rounded-2xl border border-brand-100 bg-brand-50 p-4">
      <p className="text-sm font-extrabold text-brand-700">정확도를 높이려면 추가 입력이 필요합니다</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {missingFields.map((field) => (
          <span key={field} className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700 ring-1 ring-brand-100">{fieldLabels[field]}</span>
        ))}
      </div>
    </div>
  );
}

export function BenefitSearchForm({ benefitId }: { benefitId?: string }) {
  const rules = useMemo(() => (benefitId ? benefitRules.filter((rule) => rule.benefitId === benefitId) : benefitRules), [benefitId]);
  const visibleFields = useMemo(() => fieldsForRules(rules), [rules]);
  const [results, setResults] = useState<EligibilityResult[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [shouldScrollToResults, setShouldScrollToResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shouldScrollToResults || !results.length) return;

    const frameId = window.requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      resultsRef.current?.focus({ preventScroll: true });
      setShouldScrollToResults(false);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [results, shouldScrollToResults]);

  function shouldShow(field: keyof UserInput) {
    return visibleFields.has(field);
  }

  function renderGroup(fields: Array<keyof UserInput>) {
    return fields.filter(shouldShow).map((field) => <RenderField key={field} field={field} />);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextErrors = validateFormData(formData, visibleFields, Boolean(benefitId));
    if (nextErrors.length) {
      setResults([]);
      setErrors(nextErrors);
      return;
    }

    setErrors([]);
    const input: UserInput = {
      age: numberInRangeOrUndefined(formData.get("age"), limits.age.min, limits.age.max),
      region: stringEnumOrUndefined(formData.get("region"), regions),
      householdSize: numberInRangeOrUndefined(formData.get("householdSize"), limits.householdSize.min, limits.householdSize.max),
      annualIncome: manwonToWon(formData.get("annualIncome")),
      monthlyIncome: manwonToWon(formData.get("monthlyIncome")),
      propertyAmount: numberEnumOrUndefined(formData.get("propertyAmount"), propertyAmounts),
      maritalStatus: stringEnumOrDefault(formData.get("maritalStatus"), maritalStatuses, "unknown"),
      childrenCount: numberInRangeOrUndefined(formData.get("childrenCount"), limits.childrenCount.min, limits.childrenCount.max),
      employmentStatus: stringEnumOrDefault(formData.get("employmentStatus"), employmentStatuses, "none"),
      hasEmploymentInsurance: booleanOrUndefined(formData.get("hasEmploymentInsurance")),
      housingType: stringEnumOrDefault(formData.get("housingType"), housingTypes, "unknown"),
      isHomeOwner: booleanOrUndefined(formData.get("isHomeOwner")),
      isPregnantOrPostpartum: booleanOrUndefined(formData.get("isPregnantOrPostpartum")),
      isOnParentalLeave: booleanOrUndefined(formData.get("isOnParentalLeave")),
      isLowIncomeHousehold: booleanOrUndefined(formData.get("isLowIncomeHousehold")),
      militaryServiceYears: numberInRangeOrUndefined(formData.get("militaryServiceYears"), limits.militaryServiceYears.min, limits.militaryServiceYears.max),
      hasPreviousYearIncomeProof: booleanOrUndefined(formData.get("hasPreviousYearIncomeProof")),
      needsHouseholdRequirementCheck: booleanOrUndefined(formData.get("needsHouseholdRequirementCheck")),
      youthFutureWorkStatus: stringEnumOrDefault(formData.get("youthFutureWorkStatus"), youthFutureWorkStatuses, "unknown"),
      hasExistingYouthSavingsAccount: booleanOrUndefined(formData.get("hasExistingYouthSavingsAccount")),
      wantsYouthFutureSwitch: booleanOrUndefined(formData.get("wantsYouthFutureSwitch"))
    };

    setResults(evaluateBenefits(input, rules));
    setShouldScrollToResults(true);
  }

  const basics = renderGroup(groupFields.basics);
  const income = renderGroup(groupFields.income);
  const situation = renderGroup(groupFields.situation);

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-extrabold text-brand-600">{benefitId ? "맞춤 계산기" : "통합 계산기"}</p>
              <h2 className="mt-1 text-2xl font-black text-slate-950">자격 간편 체크</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">이름, 주민등록번호, 전화번호, 상세주소 없이 필요한 조건만 확인합니다.</p>
            </div>
            <div className="rounded-full bg-slate-100 px-4 py-2 text-xs font-extrabold text-slate-600">
              {visibleFields.size}개 항목
            </div>
          </div>

          {basics.length ? (
            <SectionShell step="1" title="기본 정보" description="나이와 지역처럼 대부분의 지원금에서 먼저 보는 정보입니다.">
              {basics}
            </SectionShell>
          ) : null}

          {income.length ? (
            <SectionShell step="2" title="소득과 재산" description="정확한 원 단위보다 지원금 기준에 가까운 구간 파악이 중요합니다.">
              {income}
            </SectionShell>
          ) : null}

          {situation.length ? (
            <SectionShell step="3" title="상황별 조건" description="근로, 주거, 가족 상황에 따라 대상 지원금이 달라집니다.">
              {situation}
            </SectionShell>
          ) : null}

          <DisclaimerBox />
          {errors.length ? (
            <div role="alert" aria-live="assertive" className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm leading-6 text-rose-900">
              <p className="font-extrabold">입력값을 확인하세요</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                {errors.map((error) => <li key={error}>{error}</li>)}
              </ul>
            </div>
          ) : null}
          <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 md:flex-row md:items-center md:justify-between">
            <p className="text-sm leading-6 text-slate-500">{benefitId ? "표시된 항목을 입력한 뒤 참고용 결과를 확인하세요." : "모르는 항목은 비워도 됩니다. 결과에서 추가 확인이 필요한 항목을 알려드립니다."}</p>
            <Button type="submit" className="w-full rounded-xl md:w-auto">결과 확인하기</Button>
          </div>
        </form>
      </Card>

      {results.length ? (
        <div ref={resultsRef} tabIndex={-1} aria-live="polite" className="scroll-mt-6 space-y-4 outline-none">
          <div>
            <p className="text-sm font-bold text-brand-600">계산 결과</p>
            <h2 className="mt-1 text-3xl font-extrabold text-slate-950">지원금 후보</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">가능성이 높은 순서로 정렬했습니다. 이 결과는 사전 참고용이며, 실제 대상 여부와 지급액은 공식 기관 심사 결과에 따라 달라집니다.</p>
          </div>
          <DisclaimerBox />
          <MissingFieldsNotice results={results} />
          {results.map((result) => <BenefitResultCard key={result.benefitId} result={result} />)}
        </div>
      ) : null}
    </div>
  );
}
