import type { BenefitRule, EligibilityResult, EligibilityStatus } from "@/types/eligibility";
import type { UserInput } from "@/types/user-input";
import { evaluateCondition } from "./operators";

function hasAnyInput(input: UserInput) {
  return Object.values(input).some((value) => value !== undefined && value !== null && value !== "" && value !== "unknown" && value !== "none");
}

export function evaluateBenefit(input: UserInput, rule: BenefitRule): EligibilityResult {
  const maxScore = rule.conditions.reduce((sum, condition) => sum + condition.weight, 0);
  let score = 0;
  const reasons: string[] = [];
  const warnings: string[] = [];
  const missingFields: string[] = [];

  if (!hasAnyInput(input)) {
    return {
      benefitId: rule.benefitId,
      status: "unknown",
      score: 0,
      reasons: [],
      warnings: ["자격을 추정하려면 최소 한 가지 이상의 정보를 입력해야 합니다."],
      missingFields: rule.inputs.map(String),
      calculatedAt: new Date().toISOString(),
      requiresOfficialCheck: rule.requiresOfficialCheck,
      sourceName: rule.source.name,
      sourceUrl: rule.source.url,
      sourceCheckedAt: rule.source.checkedAt
    };
  }

  for (const condition of rule.conditions) {
    const evaluation = evaluateCondition(input, condition);
    if (evaluation.matched) {
      score += condition.weight;
      reasons.push(condition.successMessage);
    } else if (evaluation.missing) {
      missingFields.push(String(condition.field));
      warnings.push(condition.missingMessage || `${String(condition.field)} 입력값이 없어 추가 확인이 필요합니다.`);
    } else {
      warnings.push(condition.failMessage);
    }
  }

  const normalizedScore = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
  let status: EligibilityStatus = "unknown";

  if (normalizedScore >= rule.eligibleThreshold && missingFields.length === 0) {
    status = "eligible";
  } else if (normalizedScore >= rule.maybeThreshold || missingFields.length > 0) {
    status = "maybe";
  } else {
    status = "not_eligible";
  }

  return {
    benefitId: rule.benefitId,
    status,
    score: normalizedScore,
    reasons,
    warnings,
    missingFields: Array.from(new Set(missingFields)),
    calculatedAt: new Date().toISOString(),
    requiresOfficialCheck: rule.requiresOfficialCheck,
    sourceName: rule.source.name,
    sourceUrl: rule.source.url,
    sourceCheckedAt: rule.source.checkedAt
  };
}

export function evaluateBenefits(input: UserInput, rules: BenefitRule[]) {
  const rank: Record<EligibilityStatus, number> = {
    eligible: 4,
    maybe: 3,
    unknown: 2,
    not_eligible: 1
  };

  return rules
    .map((rule) => evaluateBenefit(input, rule))
    .sort((a, b) => rank[b.status] - rank[a.status] || b.score - a.score);
}
