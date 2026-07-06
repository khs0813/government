import { BenefitCategoryPage } from "@/components/benefits/BenefitCategoryPage";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "출산·육아 지원금 - 자격 계산기와 신청 정보",
  description: "자녀장려금은 소득·재산 기준, 육아휴직급여와 출산휴가급여는 고용보험과 휴직 사용 조건을 중심으로 확인하세요.",
  path: "/benefits/childcare/",
  type: "article",
  publishedTime: "2026-07-04",
  modifiedTime: "2026-07-04",
  section: "출산·육아 지원금",
  tags: ["출산 지원금", "육아 지원금", "자녀장려금", "육아휴직급여"]
});

export default function CategoryPage() {
  return <BenefitCategoryPage category="childcare" />;
}
