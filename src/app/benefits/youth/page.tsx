import { BenefitCategoryPage } from "@/components/benefits/BenefitCategoryPage";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "청년 지원금 - 자격 계산기와 신청 정보",
  description: "청년도약계좌와 청년 월세 지원처럼 나이, 개인소득, 가구소득, 거주 조건이 필요한 청년 제도를 모아 확인하세요.",
  path: "/benefits/youth/"
});

export default function CategoryPage() {
  return <BenefitCategoryPage category="youth" />;
}
