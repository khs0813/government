const canonicalSiteUrl = "https://jiwoncalc.co.kr";

export const siteConfig = {
  name: "지원금 계산기",
  url: canonicalSiteUrl,
  description: "나이, 소득, 거주지역을 입력해 받을 수 있는 정부지원금 후보를 간단히 확인하세요.",
  locale: "ko_KR",
  ogImage: "/og"
};

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  if (path === "" || path === "/") return `${base}/`;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}
