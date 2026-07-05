export type EmploymentStatus =
  | "employed"
  | "self_employed"
  | "unemployed"
  | "student"
  | "retired"
  | "none";

export type HousingType = "own" | "jeonse" | "monthly_rent" | "family" | "unknown";
export type MaritalStatus = "single" | "married" | "unknown";

export type UserInput = {
  age?: number;
  region?: string;
  householdSize?: number;
  annualIncome?: number;
  monthlyIncome?: number;
  propertyAmount?: number;
  maritalStatus?: MaritalStatus;
  childrenCount?: number;
  employmentStatus?: EmploymentStatus;
  hasEmploymentInsurance?: boolean;
  housingType?: HousingType;
  isHomeOwner?: boolean;
  isPregnantOrPostpartum?: boolean;
  isOnParentalLeave?: boolean;
  isLowIncomeHousehold?: boolean;
};
