import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";
export const alt = "지원금 계산기 - 내가 받을 수 있는 정부지원금 찾기";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default function Image() {
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
          <div style={{ display: "flex", flexDirection: "column", fontSize: "76px", lineHeight: 1.08, fontWeight: 900, letterSpacing: "0" }}>
            <div>내가 받을 수 있는</div>
            <div>정부지원금 찾기</div>
          </div>
          <div style={{ marginTop: "28px", maxWidth: "860px", fontSize: "30px", lineHeight: 1.45, color: "#475569" }}>
            나이, 소득, 거주지역을 입력해 지원금 후보와 공식 신청처를 확인하세요.
          </div>
        </div>
        <div style={{ display: "flex", gap: "16px", fontSize: "24px", fontWeight: 700, color: "#2563eb" }}>
          <span>근로장려금</span>
          <span>실업급여</span>
          <span>청년월세</span>
          <span>기초연금</span>
        </div>
      </div>
    ),
    size
  );
}
