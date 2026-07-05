import { BenefitCategoryPage } from "@/components/benefits/BenefitCategoryPage";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "저소득층 지원금 - 자격 계산기와 신청 정보",
  description: "근로장려금 같은 세제 지원을 가구 유형, 연간 총소득, 재산 합계, 정기·반기 신청 일정 기준으로 살펴보세요.",
  path: "/benefits/low-income/"
});

export default function CategoryPage() {
  return <BenefitCategoryPage category="low_income" />;
}
