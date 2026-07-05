export const siteConfig = {
  name: "지원금 계산기",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://jiwoncalc.co.kr",
  description: "나이, 소득, 거주지역을 입력해 받을 수 있는 정부지원금 후보를 간단히 확인하세요.",
  locale: "ko_KR",
  ogImage: "/opengraph-image"
};

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
