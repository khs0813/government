import { BenefitCategoryPage } from "@/components/benefits/BenefitCategoryPage";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "청년 지원금 - 자격 계산기와 신청 정보",
  description: "청년미래적금, 청년 월세 지원, 청년도약계좌 기존 가입자 확인처럼 나이, 소득, 거주 조건이 필요한 청년 제도를 모아 확인하세요.",
  path: "/benefits/youth/",
  type: "article",
  publishedTime: "2026-07-04",
  modifiedTime: "2026-07-04",
  section: "청년 지원금",
  tags: ["청년 지원금", "청년미래적금", "청년도약계좌", "청년 월세 지원"]
});

export default function CategoryPage() {
  return <BenefitCategoryPage category="youth" />;
}
