import type { Metadata } from "next";
import { calculateWage, formatWon } from "@/lib/calc";
import { LiveEarningCounter } from "@/components/live-earning-counter";
import { PurchaseTimeCalculator } from "@/components/purchase-time-calculator";
import Link from "next/link";

type Props = {
  searchParams: Promise<{
    salary?: string;
    monthlyHours?: string;
    inclusive?: string;
    afterTax?: string;
    taxRate?: string;
  }>;
};

function toNumber(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export const metadata: Metadata = {
  title: "연봉 환산 결과",
  description: "연봉 환산 결과 페이지",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ResultPage({ searchParams }: Props) {
  const params = await searchParams;
  const annualSalary = toNumber(params.salary, 0);
  const monthlyHours = toNumber(params.monthlyHours, 209);
  const inclusive = params.inclusive === "true";
  const afterTax = params.afterTax === "true";
  const rawTaxRate = toNumber(params.taxRate, 22);
  const safeTaxRate = Math.min(Math.max(rawTaxRate, 0), 90);
  const effectiveAnnualSalary = afterTax
    ? annualSalary * (1 - safeTaxRate / 100)
    : annualSalary;

  const { hourly, perSecond, effectiveMonthlyHours } = calculateWage({
    annualSalary: effectiveAnnualSalary,
    monthlyHours,
    inclusive,
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/40 px-4 py-8 text-slate-900 sm:py-12">
      <div className="mx-auto w-full max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-600">환산 결과</p>
          <Link
            href="/"
            className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900 sm:text-sm"
          >
            다시 계산하기
          </Link>
        </div>

        <section className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl leading-tight font-bold tracking-tight text-slate-900 sm:text-5xl">
            당신은 지금 1초에
            <br className="hidden sm:block" />{" "}
            <span className="font-mono">{formatWon(perSecond)}원</span>씩 벌고 있어요
          </h1>
          <p className="mt-4 text-sm text-slate-600 sm:text-base">
            시급은 약{" "}
            <span className="font-mono font-semibold text-slate-900">{formatWon(hourly)}원</span>{" "}
            입니다.
          </p>
          {afterTax && (
            <p className="mt-2 text-sm text-slate-500">
              세후 추정 반영: 공제율 <span className="font-mono">{safeTaxRate}%</span> 적용 (계산 연봉{" "}
              <span className="font-mono">{formatWon(effectiveAnnualSalary)}원</span>)
            </p>
          )}
          {inclusive && (
            <p className="mt-2 text-sm text-slate-500">
              포괄임금제 기준 적용: 월 근로시간{" "}
              <span className="font-mono">{formatWon(effectiveMonthlyHours)}시간</span>으로 계산
            </p>
          )}
        </section>

        <section className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">실시간 수익</h2>
            <p className="text-sm text-slate-500">페이지 체류 시간과 오늘 근무 누적 수익을 함께 표시합니다.</p>
            <LiveEarningCounter perSecond={perSecond} />
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm sm:p-8">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
              이 물건 사려면 몇 시간 일해야 하나?
            </h2>
            <p className="text-sm text-slate-500">
              현재 계산된 시급을 기준으로 필요한 근무 시간을 바로 확인할 수 있습니다.
            </p>
            <PurchaseTimeCalculator hourly={hourly} />
          </div>
        </section>
      </div>
    </main>
  );
}
