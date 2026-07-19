import { benefits } from "@/data/benefits";
import { guides } from "@/data/guides";

export type IndexableRouteKind =
  | "home"
  | "calculator-hub"
  | "calculator-detail"
  | "benefit-hub"
  | "benefit-category"
  | "benefit-detail"
  | "guide-hub"
  | "guide-detail"
  | "info-page"
  | "policy-page";

export type IndexableRoute = {
  path: string;
  kind: IndexableRouteKind;
  lastModified: string;
  changeFrequency: "daily" | "weekly";
  priority: number;
  reason: string;
};

const defaultLastModified = "2026-07-04";

export const indexableStaticRoutes: IndexableRoute[] = [
  {
    path: "/",
    kind: "home",
    lastModified: defaultLastModified,
    changeFrequency: "daily",
    priority: 1,
    reason: "홈페이지와 통합 지원금 계산기"
  },
  {
    path: "/calculators/",
    kind: "calculator-hub",
    lastModified: defaultLastModified,
    changeFrequency: "weekly",
    priority: 0.9,
    reason: "공개 계산기 허브"
  },
  {
    path: "/benefits/",
    kind: "benefit-hub",
    lastModified: defaultLastModified,
    changeFrequency: "weekly",
    priority: 0.7,
    reason: "공개 지원금 목록 허브"
  },
  {
    path: "/benefits/youth/",
    kind: "benefit-category",
    lastModified: defaultLastModified,
    changeFrequency: "weekly",
    priority: 0.7,
    reason: "청년 지원금 카테고리 콘텐츠"
  },
  {
    path: "/benefits/housing/",
    kind: "benefit-category",
    lastModified: defaultLastModified,
    changeFrequency: "weekly",
    priority: 0.7,
    reason: "주거 지원금 카테고리 콘텐츠"
  },
  {
    path: "/benefits/childcare/",
    kind: "benefit-category",
    lastModified: defaultLastModified,
    changeFrequency: "weekly",
    priority: 0.7,
    reason: "출산·육아 지원금 카테고리 콘텐츠"
  },
  {
    path: "/benefits/employment/",
    kind: "benefit-category",
    lastModified: defaultLastModified,
    changeFrequency: "weekly",
    priority: 0.7,
    reason: "고용·실업 지원금 카테고리 콘텐츠"
  },
  {
    path: "/benefits/senior/",
    kind: "benefit-category",
    lastModified: defaultLastModified,
    changeFrequency: "weekly",
    priority: 0.7,
    reason: "노인 지원금 카테고리 콘텐츠"
  },
  {
    path: "/benefits/low-income/",
    kind: "benefit-category",
    lastModified: defaultLastModified,
    changeFrequency: "weekly",
    priority: 0.7,
    reason: "저소득층 지원금 카테고리 콘텐츠"
  },
  {
    path: "/guides/",
    kind: "guide-hub",
    lastModified: defaultLastModified,
    changeFrequency: "weekly",
    priority: 0.7,
    reason: "공개 가이드 허브"
  },
  {
    path: "/about/",
    kind: "info-page",
    lastModified: defaultLastModified,
    changeFrequency: "weekly",
    priority: 0.6,
    reason: "서비스 소개 페이지"
  },
  {
    path: "/methodology/",
    kind: "info-page",
    lastModified: defaultLastModified,
    changeFrequency: "weekly",
    priority: 0.7,
    reason: "계산 결과 해석 방법 안내"
  },
  {
    path: "/editorial-policy/",
    kind: "policy-page",
    lastModified: defaultLastModified,
    changeFrequency: "weekly",
    priority: 0.6,
    reason: "공식 출처와 편집 기준 안내"
  },
  {
    path: "/privacy/",
    kind: "policy-page",
    lastModified: defaultLastModified,
    changeFrequency: "weekly",
    priority: 0.6,
    reason: "개인정보 처리방침"
  },
  {
    path: "/disclaimer/",
    kind: "policy-page",
    lastModified: defaultLastModified,
    changeFrequency: "weekly",
    priority: 0.6,
    reason: "면책 고지"
  },
  {
    path: "/contact/",
    kind: "policy-page",
    lastModified: defaultLastModified,
    changeFrequency: "weekly",
    priority: 0.6,
    reason: "문의와 오류 제보 페이지"
  }
];

export const nonIndexableRoutePatterns = [
  {
    pattern: "/robots.txt",
    reason: "크롤러 정책 파일이며 HTML 색인 대상이 아님"
  },
  {
    pattern: "/sitemap.xml",
    reason: "검색엔진 제출용 XML이며 HTML 색인 대상이 아님"
  },
  {
    pattern: "/rss.xml",
    reason: "피드 XML이며 사이트맵 HTML 색인 대상이 아님"
  },
  {
    pattern: "/.well-known/security.txt",
    reason: "보안 연락처 텍스트 파일"
  },
  {
    pattern: "/opengraph-image",
    reason: "Open Graph 이미지 응답"
  },
  {
    pattern: "/_next/*",
    reason: "프레임워크 정적 자산"
  },
  {
    pattern: "/favicon.svg",
    reason: "정적 이미지 자산"
  },
  {
    pattern: "/404/",
    reason: "오류 페이지"
  },
  {
    pattern: "/_not-found/",
    reason: "Next.js 내부 404 export 산출물"
  },
  {
    pattern: "query-parameter variants",
    reason: "추적 파라미터와 사용자 입력 상태는 canonical의 깨끗한 URL로 통합"
  },
  {
    pattern: "http://jiwoncalc.co.kr/*",
    reason: "https 대표 URL로 리디렉션되는 출발 URL"
  },
  {
    pattern: "https://www.jiwoncalc.co.kr/*",
    reason: "non-www 대표 URL로 리디렉션되는 출발 URL"
  },
  {
    pattern: "non-trailing-slash HTML paths",
    reason: "끝 슬래시 포함 대표 URL로 리디렉션되는 출발 URL"
  },
  {
    pattern: "deleted or unknown slugs",
    reason: "실제 데이터에 없는 404 URL"
  }
];

export function getIndexableRoutes() {
  const activeBenefits = benefits.filter((benefit) => benefit.isActive);
  const dynamicRoutes: IndexableRoute[] = [
    ...activeBenefits.map((benefit) => ({
      path: `/benefits/${benefit.slug}/`,
      kind: "benefit-detail" as const,
      lastModified: benefit.sourceCheckedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      reason: `${benefit.title} 공개 지원금 상세 페이지`
    })),
    ...activeBenefits.map((benefit) => ({
      path: `/calculators/${benefit.slug}/`,
      kind: "calculator-detail" as const,
      lastModified: benefit.sourceCheckedAt,
      changeFrequency: "weekly" as const,
      priority: 0.85,
      reason: `${benefit.calculatorTitle} 공개 계산기 페이지`
    })),
    ...guides.map((guide) => ({
      path: `/guides/${guide.slug}/`,
      kind: "guide-detail" as const,
      lastModified: defaultLastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
      reason: `${guide.title} 공개 가이드 페이지`
    }))
  ];

  const seen = new Set<string>();
  return [...indexableStaticRoutes, ...dynamicRoutes].filter((route) => {
    if (seen.has(route.path)) return false;
    seen.add(route.path);
    return true;
  });
}
