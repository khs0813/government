"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

export function KakaoMobileAd() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleChange = () => setIsMobile(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  if (isMobile === null) {
    return null;
  }

  return (
    <>
      {isMobile ? (
        <div className="flex min-h-[504px] justify-center border-b border-slate-200 bg-white px-0 py-3 sm:px-4">
          <ins
            className="kakao_ad_area"
            style={{ display: "none" }}
            data-ad-unit="DAN-wy5NpXgkCdYkArgq"
            data-ad-width="320"
            data-ad-height="480"
          />
        </div>
      ) : null}
      <div className="flex flex-col items-center justify-center gap-3 border-b border-slate-200 bg-white px-2 py-3 sm:flex-row sm:items-start sm:px-4">
        <div className="flex min-h-[250px] w-full justify-center sm:w-[300px]">
          <ins
            className="kakao_ad_area"
            style={{ display: "none" }}
            data-ad-unit="DAN-grTQq9iyOa6IH5tQ"
            data-ad-width="300"
            data-ad-height="250"
          />
        </div>
        <div className="flex min-h-[250px] w-full justify-center sm:w-[250px]">
          <ins
            className="kakao_ad_area"
            style={{ display: "none" }}
            data-ad-unit="DAN-Yp1QMhDapxEbcNRp"
            data-ad-width="250"
            data-ad-height="250"
          />
        </div>
      </div>
      {isMobile ? (
        <div className="kakao-mobile-bottom-ad fixed inset-x-0 bottom-0 z-50 flex min-h-[116px] justify-center border-t border-slate-200 bg-white/95 px-0 py-2 shadow-[0_-8px_24px_rgba(15,23,42,0.12)] backdrop-blur sm:px-4 [padding-bottom:calc(0.5rem+env(safe-area-inset-bottom))]">
          <ins
            className="kakao_ad_area"
            style={{ display: "none" }}
            data-ad-unit="DAN-niqjX0YmNPTZt1aQ"
            data-ad-width="320"
            data-ad-height="100"
          />
        </div>
      ) : null}
      <Script
        id="kakao-adfit"
        src="https://t1.kakaocdn.net/kas/static/ba.min.js"
        strategy="afterInteractive"
      />
    </>
  );
}
