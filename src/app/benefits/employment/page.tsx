import { BenefitCategoryPage } from "@/components/benefits/BenefitCategoryPage";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "고용·실업 지원금 - 자격 계산기와 신청 정보",
  description: "실업급여와 고용 관련 지원금을 확인하세요.",
  path: "/benefits/employment/"
});

export default function CategoryPage() {
  return <BenefitCategoryPage category="employment" />;
}
