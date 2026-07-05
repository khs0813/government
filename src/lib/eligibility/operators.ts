import type { RuleCondition } from "@/types/eligibility";
import type { UserInput } from "@/types/user-input";

export type ConditionEvaluation = {
  matched: boolean;
  missing: boolean;
};

function isEmpty(value: unknown) {
  return value === undefined || value === null || value === "" || value === "unknown" || value === "none";
}

export function evaluateCondition(input: UserInput, condition: RuleCondition): ConditionEvaluation {
  const actual = input[condition.field];

  if (condition.operator !== "falsy" && condition.operator !== "exists" && isEmpty(actual)) {
    return { matched: false, missing: true };
  }

  switch (condition.operator) {
    case "equals":
      return { matched: actual === condition.value, missing: false };
    case "notEquals":
      return { matched: actual !== condition.value, missing: false };
    case "in":
      return { matched: Array.isArray(condition.value) && condition.value.includes(actual), missing: false };
    case "between": {
      if (!Array.isArray(condition.value) || condition.value.length !== 2 || typeof actual !== "number") {
        return { matched: false, missing: isEmpty(actual) };
      }
      const [min, max] = condition.value as [number, number];
      return { matched: actual >= min && actual <= max, missing: false };
    }
    case "gte":
      return { matched: typeof actual === "number" && typeof condition.value === "number" && actual >= condition.value, missing: false };
    case "lte":
      return { matched: typeof actual === "number" && typeof condition.value === "number" && actual <= condition.value, missing: false };
    case "truthy":
      return { matched: Boolean(actual), missing: false };
    case "falsy":
      return { matched: !actual, missing: false };
    case "exists":
      return { matched: !isEmpty(actual), missing: false };
    default:
      return { matched: false, missing: false };
  }
}
