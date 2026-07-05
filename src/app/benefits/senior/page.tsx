import { BenefitCategoryPage } from "@/components/benefits/BenefitCategoryPage";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "노인 지원금 - 자격 계산기와 신청 정보",
  description: "기초연금 등 고령층 대상 지원금을 확인하세요.",
  path: "/benefits/senior/"
});

export default function CategoryPage() {
  return <BenefitCategoryPage category="senior" />;
}
