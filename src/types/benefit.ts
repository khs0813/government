export type BenefitCategory =
  | "youth"
  | "housing"
  | "childcare"
  | "employment"
  | "senior"
  | "low_income";

export type Benefit = {
  id: string;
  title: string;
  slug: string;
  category: BenefitCategory;
  shortDescription: string;
  targetUsers: string[];
  supportAmountText: string;
  applicationPeriodText: string;
  agencyName: string;
  officialUrl: string;
  sourceUrl: string;
  sourceCheckedAt: string;
  isActive: boolean;
  isVerified: boolean;
  calculatorTitle: string;
  seoTitle: string;
  seoDescription: string;
  faq: Array<{ question: string; answer: string }>;
};

export const categoryLabels: Record<BenefitCategory, string> = {
  youth: "청년",
  housing: "주거",
  childcare: "출산·육아",
  employment: "고용·실업",
  senior: "노인",
  low_income: "저소득·세제지원"
};
