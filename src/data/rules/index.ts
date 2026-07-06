import earnedIncomeTaxCredit from "./earned-income-tax-credit.json";
import childTaxCredit from "./child-tax-credit.json";
import unemploymentBenefit from "./unemployment-benefit.json";
import parentalLeaveBenefit from "./parental-leave-benefit.json";
import maternityLeaveBenefit from "./maternity-leave-benefit.json";
import youthRentSupport from "./youth-rent-support.json";
import youthSavingsSupport from "./youth-savings-support.json";
import youthFutureSavings from "./youth-future-savings.json";
import basicPension from "./basic-pension.json";
import type { BenefitRule } from "@/types/eligibility";

export const benefitRules = [
  earnedIncomeTaxCredit,
  childTaxCredit,
  unemploymentBenefit,
  parentalLeaveBenefit,
  maternityLeaveBenefit,
  youthRentSupport,
  youthSavingsSupport,
  youthFutureSavings,
  basicPension
] as unknown as BenefitRule[];

export function getRuleByBenefitId(benefitId: string) {
  return benefitRules.find((rule) => rule.benefitId === benefitId);
}
