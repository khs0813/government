import type { UserInput } from "./user-input";

export type RuleOperator =
  | "equals"
  | "notEquals"
  | "in"
  | "between"
  | "gte"
  | "lte"
  | "truthy"
  | "falsy"
  | "exists";

export type RuleCondition = {
  field: keyof UserInput;
  operator: RuleOperator;
  value?: unknown;
  weight: number;
  successMessage: string;
  failMessage: string;
  missingMessage?: string;
};

export type BenefitRule = {
  id: string;
  benefitId: string;
  version: string;
  isVerified: boolean;
  requiresOfficialCheck: boolean;
  source: {
    name: string;
    url: string;
    checkedAt: string;
  };
  inputs: Array<keyof UserInput>;
  conditions: RuleCondition[];
  eligibleThreshold: number;
  maybeThreshold: number;
  forceStatus?: EligibilityStatus;
  forceStatusLabel?: string;
  forceReasons?: string[];
  forceWarnings?: string[];
};

export type EligibilityStatus = "eligible" | "maybe" | "not_eligible" | "unknown";

export type EligibilityResult = {
  benefitId: string;
  status: EligibilityStatus;
  statusLabel?: string;
  score: number;
  reasons: string[];
  warnings: string[];
  missingFields: string[];
  calculatedAt: string;
  requiresOfficialCheck: boolean;
  sourceName: string;
  sourceUrl: string;
  sourceCheckedAt: string;
};
