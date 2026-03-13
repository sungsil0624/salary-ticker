"use client";

import { useMemo, useState } from "react";
import { formatWon } from "@/lib/calc";

const DEFAULT_START = 20_000_000;
const DEFAULT_END = 100_000_000;
const STEP = 1_000_000;

function formatInputValue(value: string) {
  if (!value) return "";
  const numeric = Number(value.replace(/\D/g, ""));
  return Number.isFinite(numeric) ? numeric.toLocaleString("ko-KR") : "";
}

function parseInputValue(value: string) {
  const numeric = Number(value.replace(/\D/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
}

export function NetSalaryTable() {
  const [startSalary, setStartSalary] = useState(
    DEFAULT_START.toLocaleString("ko-KR"),
  );
  const [endSalary, setEndSalary] = useState(
    DEFAULT_END.toLocaleString("ko-KR"),
  );
  const [deductionRate, setDeductionRate] = useState("22");
  const [taxFreeMonthly, setTaxFreeMonthly] = useState("200,000");

  const tableRows = useMemo(() => {
    const start = Math.max(parseInputValue(startSalary), STEP);
    const end = Math.max(parseInputValue(endSalary), start);
    const rate = Math.min(Math.max(Number(deductionRate) || 0, 0), 90);
    const taxFree = Math.max(parseInputValue(taxFreeMonthly), 0);

    const rows = [];
    for (let annual = start; annual <= end; annual += STEP) {
      const monthlyGross = annual / 12;
      const taxableMonthly = Math.max(monthlyGross - taxFree, 0);
      const deductionMonthly = taxableMonthly * (rate / 100);
      const netMonthly = monthlyGross - deductionMonthly;
      const netAnnual = netMonthly * 12;

      rows.push({
        annual,
        netMonthly,
        netAnnual,
        deductionMonthly,
      });
    }
    return rows;
  }, [startSalary, endSalary, deductionRate, taxFreeMonthly]);

  return (
    <section className="mx-auto w-full max-w-5xl rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur sm:p-8">
      <p className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
        간편 추정
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        연봉 구간별 실수령액 표
      </h1>
      <p className="mt-3 text-sm text-slate-600 sm:text-base">
        공제율과 비과세액을 기준으로 100만원 단위 연봉 구간의 예상 실수령액을
        빠르게 비교할 수 있습니다.
      </p>

      <div className="mt-6 grid gap-4 rounded-2xl bg-slate-100/70 p-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="space-y-2 text-sm text-slate-700">
          <span className="font-medium">시작 연봉</span>
          <input
            type="text"
            inputMode="numeric"
            className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-base font-mono"
            value={startSalary}
            onChange={(e) => setStartSalary(formatInputValue(e.target.value))}
          />
        </label>
        <label className="space-y-2 text-sm text-slate-700">
          <span className="font-medium">종료 연봉</span>
          <input
            type="text"
            inputMode="numeric"
            className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-base font-mono"
            value={endSalary}
            onChange={(e) => setEndSalary(formatInputValue(e.target.value))}
          />
        </label>
        <label className="space-y-2 text-sm text-slate-700">
          <span className="font-medium">예상 공제율 (%)</span>
          <input
            type="number"
            min={0}
            max={90}
            step="0.1"
            className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-base font-mono"
            value={deductionRate}
            onChange={(e) => setDeductionRate(e.target.value)}
          />
        </label>
        <label className="space-y-2 text-sm text-slate-700">
          <span className="font-medium">월 비과세액</span>
          <input
            type="text"
            inputMode="numeric"
            className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-base font-mono"
            value={taxFreeMonthly}
            onChange={(e) => setTaxFreeMonthly(formatInputValue(e.target.value))}
          />
        </label>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-4 py-3 font-semibold">세전 연봉</th>
                <th className="px-4 py-3 font-semibold">월 예상 실수령액</th>
                <th className="px-4 py-3 font-semibold">연 예상 실수령액</th>
                <th className="px-4 py-3 font-semibold">월 공제액</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row) => (
                <tr key={row.annual} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-mono text-slate-900">
                    {formatWon(row.annual)}원
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-900">
                    {formatWon(row.netMonthly)}원
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-900">
                    {formatWon(row.netAnnual)}원
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-600">
                    {formatWon(row.deductionMonthly)}원
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        공제율은 간편 추정을 위한 값이며 실제 실수령액은 4대보험, 연말정산,
        비과세 항목 구성에 따라 달라질 수 있습니다.
      </p>
    </section>
  );
}
