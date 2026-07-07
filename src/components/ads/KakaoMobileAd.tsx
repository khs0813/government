"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

type AdSlotProps = {
  unit: string;
  width: number;
  height: number;
  shouldLoadKakao: boolean;
};

function isLocalHost(hostname: string) {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "0.0.0.0" ||
    hostname.endsWith(".local") ||
    /^10\./.test(hostname) ||
    /^192\.168\./.test(hostname) ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname)
  );
}

function AdSlot({ unit, width, height, shouldLoadKakao }: AdSlotProps) {
  if (!shouldLoadKakao) {
    return (
      <div
        className="grid place-items-center border border-dashed border-slate-300 bg-slate-50 text-[11px] font-semibold text-slate-400"
        style={{ width, height }}
      >
        AD {width}x{height}
      </div>
    );
  }

  return (
    <ins
      className="kakao_ad_area"
      style={{ display: "none" }}
      data-ad-unit={unit}
      data-ad-width={String(width)}
      data-ad-height={String(height)}
    />
  );
}

export function KakaoMobileAd() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [shouldLoadKakao, setShouldLoadKakao] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const handleChange = () => setIsMobile(mediaQuery.matches);

    handleChange();
    setShouldLoadKakao(!isLocalHost(window.location.hostname));
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
          <AdSlot
            unit="DAN-wy5NpXgkCdYkArgq"
            width={320}
            height={480}
            shouldLoadKakao={shouldLoadKakao}
          />
        </div>
      ) : null}
      <div className="flex flex-col items-center justify-center gap-3 border-b border-slate-200 bg-white px-2 py-3 sm:flex-row sm:items-start sm:px-4">
        <div className="flex min-h-[250px] w-full justify-center sm:w-[300px]">
          <AdSlot
            unit="DAN-grTQq9iyOa6IH5tQ"
            width={300}
            height={250}
            shouldLoadKakao={shouldLoadKakao}
          />
        </div>
        <div className="flex min-h-[250px] w-full justify-center sm:w-[250px]">
          <AdSlot
            unit="DAN-Yp1QMhDapxEbcNRp"
            width={250}
            height={250}
            shouldLoadKakao={shouldLoadKakao}
          />
        </div>
      </div>
      {isMobile ? (
        <div className="kakao-mobile-bottom-ad fixed inset-x-0 bottom-0 z-50 flex min-h-[116px] justify-center border-t border-slate-200 bg-white/95 px-0 py-2 shadow-[0_-8px_24px_rgba(15,23,42,0.12)] backdrop-blur sm:px-4 [padding-bottom:calc(0.5rem+env(safe-area-inset-bottom))]">
          <AdSlot
            unit="DAN-niqjX0YmNPTZt1aQ"
            width={320}
            height={100}
            shouldLoadKakao={shouldLoadKakao}
          />
        </div>
      ) : null}
      {shouldLoadKakao ? (
        <Script
          id="kakao-adfit"
          src="https://t1.kakaocdn.net/kas/static/ba.min.js"
          strategy="afterInteractive"
        />
      ) : null}
    </>
  );
}
