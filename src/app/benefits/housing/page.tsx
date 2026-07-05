import { BenefitCategoryPage } from "@/components/benefits/BenefitCategoryPage";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "주거 지원금 - 자격 계산기와 신청 정보",
  description: "청년 월세 지원 등 주거비 제도의 무주택 여부, 임대차계약서, 주민등록 주소, 지역별 접수 기간을 비교하세요.",
  path: "/benefits/housing/"
});

export default function CategoryPage() {
  return <BenefitCategoryPage category="housing" />;
}
