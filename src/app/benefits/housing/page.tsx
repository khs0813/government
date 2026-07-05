import { BenefitCategoryPage } from "@/components/benefits/BenefitCategoryPage";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "주거 지원금 - 자격 계산기와 신청 정보",
  description: "월세, 전세, 신혼부부 주거 관련 지원금을 확인하세요.",
  path: "/benefits/housing/"
});

export default function CategoryPage() {
  return <BenefitCategoryPage category="housing" />;
}
