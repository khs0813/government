const canonicalSiteUrl = "https://jiwoncalc.co.kr";
const extensionlessFilePaths = new Set(["/opengraph-image"]);

export const siteConfig = {
  name: "지원금 계산기",
  url: canonicalSiteUrl,
  description: "나이, 소득, 거주지역을 입력해 받을 수 있는 정부지원금 후보를 간단히 확인하세요.",
  locale: "ko_KR",
  ogImage: "/opengraph-image"
};

export function canonicalPath(path = "/") {
  const pathWithoutQuery = path.split(/[?#]/)[0] || "/";
  const normalizedPath = pathWithoutQuery.startsWith("/") ? pathWithoutQuery : `/${pathWithoutQuery}`;
  const compactPath = normalizedPath.replace(/\/{2,}/g, "/");

  if (compactPath === "/") return "/";
  if (extensionlessFilePaths.has(compactPath)) return compactPath;
  if (/\/[^/]+\.[^/]+$/.test(compactPath)) return compactPath;

  return `${compactPath.replace(/\/+$/, "")}/`;
}

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  return `${base}${canonicalPath(path)}`;
}
