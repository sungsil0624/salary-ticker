"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SalaryForm() {
  const router = useRouter();
  const [salary, setSalary] = useState("");
  const [monthlyHours, setMonthlyHours] = useState("209");
  const [isInclusive, setIsInclusive] = useState(false);
  const [isAfterTax, setIsAfterTax] = useState(false);
  const [taxRate, setTaxRate] = useState("22");
  const formattedSalary = salary
    ? Number(salary).toLocaleString("ko-KR")
    : "";
  const taxRateNumber = Number(taxRate);
  const isSubmitDisabled =
    !salary ||
    Number(monthlyHours) < 1 ||
    (isAfterTax && (!Number.isFinite(taxRateNumber) || taxRateNumber < 0 || taxRateNumber > 90));

  const handleSubmit = () => {
    const safeTaxRate = Number.isFinite(taxRateNumber)
      ? Math.min(Math.max(taxRateNumber, 0), 90)
      : 22;

    const params = new URLSearchParams({
      salary,
      monthlyHours,
      inclusive: String(isInclusive),
      afterTax: String(isAfterTax),
      taxRate: String(safeTaxRate),
    });

    router.push(`/result?${params.toString()}`);
  };

  return (
    <Card className="rounded-3xl border border-slate-200 bg-white py-6 shadow-sm ring-0">
      <CardHeader className="px-6">
        <CardTitle className="text-xl font-semibold text-slate-900">정보 입력</CardTitle>
        <p className="text-sm text-slate-500">
          금액은 숫자만 입력하면 자동으로 콤마가 적용됩니다.
        </p>
      </CardHeader>
      <CardContent className="space-y-5 px-6">
        <div className="space-y-2">
          <Label htmlFor="salary" className="text-slate-700">
            세전 연봉
          </Label>
          <Input
            id="salary"
            type="text"
            inputMode="numeric"
            placeholder="예: 50,000,000"
            className="h-11 rounded-xl border-slate-300 px-4 text-base font-mono"
            value={formattedSalary}
            onChange={(e) => setSalary(e.target.value.replace(/\D/g, ""))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="monthlyHours" className="text-slate-700">
            월 근로시간
          </Label>
          <Input
            id="monthlyHours"
            type="number"
            min={1}
            className="h-11 rounded-xl border-slate-300 px-4 text-base font-mono"
            value={monthlyHours}
            onChange={(e) => setMonthlyHours(e.target.value)}
          />
        </div>

        <label className="flex items-center gap-2 rounded-xl bg-slate-100/70 p-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={isInclusive}
            onChange={(e) => setIsInclusive(e.target.checked)}
          />
          포괄임금제 기준으로 체감 계산
        </label>

        <div className="space-y-3 rounded-xl bg-slate-100/70 p-3">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={isAfterTax}
              onChange={(e) => setIsAfterTax(e.target.checked)}
            />
            세후 기준으로 대략 계산하기
          </label>

          {isAfterTax && (
            <div className="space-y-2">
              <Label htmlFor="taxRate" className="text-slate-700">
                세금/4대보험 공제율 (%)
              </Label>
              <Input
                id="taxRate"
                type="number"
                inputMode="decimal"
                min={0}
                max={90}
                step="0.1"
                className="h-11 rounded-xl border-slate-300 bg-white px-4 text-base font-mono"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
              />
              <p className="text-xs text-slate-500">정확한 실수령과 다를 수 있으며 추정용입니다. (기본 22%)</p>
            </div>
          )}
        </div>

        <Button
          className="h-11 w-full rounded-xl bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800"
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
        >
          결과 보기
        </Button>
      </CardContent>
    </Card>
  );
}
