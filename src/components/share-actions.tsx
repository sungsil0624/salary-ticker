"use client";

import { useEffect, useMemo, useState } from "react";
import { formatWon } from "@/lib/calc";

type ShareActionsProps = {
  perSecond: number;
  hourly: number;
  shareTitle: string;
  shareDescription: string;
};

function escapeXml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildShareSvg({
  perSecond,
  hourly,
  shareTitle,
}: {
  perSecond: number;
  hourly: number;
  shareTitle: string;
}) {
  const safeTitle = escapeXml(shareTitle);
  const perSecondText = escapeXml(`${formatWon(perSecond)}원 / 1초`);
  const hourlyText = escapeXml(`${formatWon(hourly)}원 / 시급`);

  const conversions = [
    { price: 500, item: "사탕", icon: "🍬" },
    { price: 2000, item: "커피(아아)", icon: "☕" },
    { price: 3500, item: "편의점 도시락", icon: "🍱" },
  ];

  const formatDuration = (seconds: number) => {
    if (!Number.isFinite(seconds) || seconds <= 0) {
      return "계산 불가";
    }
    const total = Math.max(1, Math.ceil(seconds));
    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const secs = total % 60;

    if (days > 0) {
      return `${days}일 ${hours}시간`;
    }
    if (hours > 0) {
      return `${hours}시간 ${minutes}분`;
    }
    if (minutes > 0) {
      return `${minutes}분 ${secs}초`;
    }
    return `${secs}초`;
  };

  const conversionNodes = conversions
    .map((item, index) => {
      const y = 1000 + index * 60;
      const timeLabel = formatDuration(item.price / perSecond);
      return `
  <g transform="translate(140, ${y})">
    <text x="0" y="0" fill="#475569" font-family="'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif" font-size="30" font-weight="500">
      ${escapeXml(timeLabel)} 참으면 ${escapeXml(item.item)} ${escapeXml(item.icon)}
    </text>
  </g>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1080" height="1350" viewBox="0 0 1080 1350" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#F8FAFC" />
      <stop offset="100%" stop-color="#ECFDF3" />
    </linearGradient>
  </defs>
  <rect width="1080" height="1350" fill="url(#bg)" />
  <rect x="96" y="120" width="888" height="1110" rx="48" fill="#FFFFFF" stroke="#E2E8F0" />
  <text x="140" y="260" fill="#0F172A" font-family="'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif" font-size="52" font-weight="700">
    ${safeTitle}
  </text>
  <text x="140" y="440" fill="#0F172A" font-family="'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif" font-size="80" font-weight="700">
    ${perSecondText}
  </text>
  <text x="140" y="530" fill="#64748B" font-family="'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif" font-size="36" font-weight="500">
    ${hourlyText}
  </text>
  <rect x="140" y="620" width="180" height="6" fill="#E2E8F0" />
  <text x="140" y="740" fill="#334155" font-family="'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif" font-size="40" font-weight="600">
    Salary Ticker
  </text>
  <text x="140" y="800" fill="#94A3B8" font-family="'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif" font-size="32" font-weight="500">
    연봉을 시간 단위로 환산한 결과 카드
  </text>
  <rect x="140" y="860" width="800" height="1" fill="#E2E8F0" />
  <text x="140" y="940" fill="#64748B" font-family="'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif" font-size="28" font-weight="600">
    이 돈이면 지금...
  </text>
  ${conversionNodes}
  <text x="540" y="1210" text-anchor="middle" fill="#94A3B8" font-family="'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif" font-size="22" font-weight="500">
    * 일하기 싫어서 만든 거 맞음
  </text>
</svg>`;
}

async function svgToPngFile(svg: string, filename: string, width: number, height: number) {
  const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);
  const image = document.createElement("img");
  image.decoding = "async";

  try {
    image.src = url;
    await (image.decode?.() ??
      new Promise<void>((resolve, reject) => {
        image.onload = () => resolve();
        image.onerror = () => reject(new Error("스토리 카드 로딩에 실패했습니다."));
      }));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("스토리 카드 캔버스를 생성할 수 없습니다.");
    }
    context.drawImage(image, 0, 0, width, height);

    const pngBlob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("스토리 카드 변환에 실패했습니다."));
        }
      }, "image/png");
    });

    return new File([pngBlob], filename, { type: "image/png" });
  } finally {
    URL.revokeObjectURL(url);
  }
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  try {
    anchor.click();
  } catch {
    window.open(url, "_blank", "noopener");
  } finally {
    anchor.remove();
    URL.revokeObjectURL(url);
  }
}

export function ShareActions({ perSecond, hourly, shareTitle, shareDescription }: ShareActionsProps) {
  const [shareUrl, setShareUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(window.location.href);
    }
  }, []);

  const svgContent = useMemo(
    () =>
      buildShareSvg({
        perSecond,
        hourly,
        shareTitle,
      }),
    [perSecond, hourly, shareTitle],
  );

  const handleInstagramShare = async () => {
    try {
      const file = await svgToPngFile(svgContent, "salary-ticker-story.png", 1080, 1350);
      downloadBlob(file, "salary-ticker-story.png");
      alert("스토리 카드가 저장되었습니다. 인스타그램에서 업로드해주세요.");
    } catch (error) {
      console.error(error);
      alert("스토리 카드를 생성할 수 없습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-slate-500">이 내용을 공유하고 싶다면?</p>
      <button
        type="button"
        onClick={handleInstagramShare}
        className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900 sm:text-sm"
      >
        스토리 카드 다운로드
      </button>
    </div>
  );
}
