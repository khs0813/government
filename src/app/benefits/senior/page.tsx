import { BenefitCategoryPage } from "@/components/benefits/BenefitCategoryPage";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "노인 지원금 - 자격 계산기와 신청 정보",
  description: "기초연금 신청 전 만 65세 요건, 소득인정액, 부부가구 기준과 복지로·국민연금공단 공식 안내를 확인하세요.",
  path: "/benefits/senior/"
});

export default function CategoryPage() {
  return <BenefitCategoryPage category="senior" />;
}
