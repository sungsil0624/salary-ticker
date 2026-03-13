import type { Metadata } from "next";
import { NetSalaryTable } from "@/components/net-salary-table";

export const metadata: Metadata = {
  title: "연봉 구간별 실수령액 표",
  description:
    "연봉 구간별 실수령액을 100만원 단위로 간편 추정해보세요. 공제율과 비과세액을 조정해 비교할 수 있습니다.",
  alternates: {
    canonical: "/net-salary-table",
  },
  openGraph: {
    title: "연봉 구간별 실수령액 표",
    description:
      "연봉 구간별 실수령액을 100만원 단위로 간편 추정해보세요. 공제율과 비과세액을 조정해 비교할 수 있습니다.",
    url: "/net-salary-table",
  },
};

export default function NetSalaryTablePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/40 px-4 py-8 sm:py-12">
      <NetSalaryTable />
    </main>
  );
}
