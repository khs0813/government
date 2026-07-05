import { BenefitCategoryPage } from "@/components/benefits/BenefitCategoryPage";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "청년 지원금 - 자격 계산기와 신청 정보",
  description: "청년 자산형성, 월세, 취업 관련 지원금을 확인하세요.",
  path: "/benefits/youth/"
});

export default function CategoryPage() {
  return <BenefitCategoryPage category="youth" />;
}
