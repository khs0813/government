import { BenefitCategoryPage } from "@/components/benefits/BenefitCategoryPage";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "고용·실업 지원금 - 자격 계산기와 신청 정보",
  description: "실업급여 신청 전 고용보험 이력, 퇴사 사유, 이직확인서 처리 여부와 고용24 공식 절차를 순서대로 점검하세요.",
  path: "/benefits/employment/",
  type: "article",
  publishedTime: "2026-07-04",
  modifiedTime: "2026-07-04",
  section: "고용·실업 지원금",
  tags: ["고용 지원금", "실업급여", "고용보험"]
});

export default function CategoryPage() {
  return <BenefitCategoryPage category="employment" />;
}
