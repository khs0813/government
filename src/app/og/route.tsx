import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";

const size = {
  width: 1200,
  height: 630
};

function truncate(value: string, limit: number) {
  return value.length > limit ? `${value.slice(0, limit - 1)}…` : value;
}

function pageLabel(path: string) {
  if (path.startsWith("/benefits/")) return "지원금 상세";
  if (path.startsWith("/guides/")) return "신청 가이드";
  if (path.startsWith("/calculators/")) return "자격 계산기";
  if (path === "/benefits/") return "지원금 목록";
  return "정부지원금 정보";
}

export function GET(request: Request) {
  const url = new URL(request.url);
  const title = truncate(url.searchParams.get("title") || siteConfig.name, 42);
  const path = url.searchParams.get("page") || "/";
  const label = pageLabel(path);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#f8fafc",
          color: "#0f172a",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px", fontSize: "30px", fontWeight: 800 }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "16px",
              background: "#2563eb",
              color: "#ffffff"
            }}
          >
            혜택
          </div>
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#2563eb", fontSize: "28px", fontWeight: 800 }}>{label}</div>
          <div style={{ marginTop: "18px", display: "flex", flexDirection: "column", fontSize: "68px", lineHeight: 1.12, fontWeight: 900, letterSpacing: "0" }}>
            {title}
          </div>
          <div style={{ marginTop: "28px", maxWidth: "860px", fontSize: "28px", lineHeight: 1.45, color: "#475569" }}>
            공식 출처와 기준 확인일을 함께 확인하세요.
          </div>
        </div>
        <div style={{ display: "flex", gap: "16px", fontSize: "24px", fontWeight: 700, color: "#2563eb" }}>
          <span>기준 확인</span>
          <span>공식 출처</span>
          <span>신청 전 주의사항</span>
        </div>
      </div>
    ),
    size
  );
}
