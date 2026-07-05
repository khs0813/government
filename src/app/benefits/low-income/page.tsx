import { BenefitCategoryPage } from "@/components/benefits/BenefitCategoryPage";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "저소득층 지원금 - 자격 계산기와 신청 정보",
  description: "근로장려금 등 소득 기준 지원제도를 확인하세요.",
  path: "/benefits/low-income/"
});

export default function CategoryPage() {
  return <BenefitCategoryPage category="low_income" />;
}
