"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const QUICK_ITEMS = [
  { label: "아이폰", price: 1_550_000 },
  { label: "에어팟", price: 329_000 },
  { label: "커피", price: 5_500 },
];

function formatWon(value: number) {
  return Math.max(0, value).toLocaleString("ko-KR", {
    maximumFractionDigits: 0,
  });
}

function formatDuration(hours: number) {
  const totalMinutes = Math.max(0, Math.round(hours * 60));
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;

  if (h === 0) {
    return `${m}분`;
  }
  if (m === 0) {
    return `${h.toLocaleString("ko-KR")}시간`;
  }
  return `${h.toLocaleString("ko-KR")}시간 ${m}분`;
}

export function PurchaseTimeCalculator({ hourly }: { hourly: number }) {
  const [price, setPrice] = useState("");
  const formattedPrice = price ? Number(price).toLocaleString("ko-KR") : "";

  const { hoursNeeded, daysNeeded } = useMemo(() => {
    if (!price || hourly <= 0) {
      return { hoursNeeded: 0, daysNeeded: 0 };
    }

    const priceNumber = Number(price);
    const hours = priceNumber / hourly;
    const days = hours / 8;

    return { hoursNeeded: hours, daysNeeded: days };
  }, [hourly, price]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="item-price" className="text-sm font-medium text-slate-700">
          물건 가격
        </label>
        <Input
          id="item-price"
          type="text"
          inputMode="numeric"
          placeholder="예: 1,290,000"
          className="h-11 rounded-xl border-slate-300 px-4 text-base font-mono"
          value={formattedPrice}
          onChange={(e) => setPrice(e.target.value.replace(/\D/g, ""))}
        />
      </div>

      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-500">자주 사는 항목 빠른 선택</p>
        <div className="flex flex-wrap gap-2">
          {QUICK_ITEMS.map((item) => {
            const itemPrice = String(item.price);
            const isSelected = price === itemPrice;

            return (
              <Button
                key={item.label}
                type="button"
                size="sm"
                variant={isSelected ? "default" : "outline"}
                className={isSelected ? "bg-emerald-600 text-white hover:bg-emerald-600/90" : ""}
                onClick={() => setPrice(itemPrice)}
              >
                {item.label} <span className="font-mono">{formatWon(item.price)}원</span>
              </Button>
            );
          })}
        </div>
      </div>

      {price ? (
        <div className="rounded-2xl bg-emerald-50 p-4">
          <p className="text-sm text-slate-600">
            <span className="font-mono font-semibold text-slate-900">{formatWon(Number(price))}원</span>
            을 사려면 약{" "}
            <span className="font-mono font-semibold text-emerald-700">{formatDuration(hoursNeeded)}</span>{" "}
            일해야 해요.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            8시간 근무 기준 약 <span className="font-mono">{daysNeeded.toFixed(1)}일</span>
          </p>
        </div>
      ) : (
        <p className="text-sm text-slate-500">가격을 입력하면 필요한 근무 시간을 계산해드려요.</p>
      )}
    </div>
  );
}
