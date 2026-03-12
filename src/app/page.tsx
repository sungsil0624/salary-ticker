import { SalaryForm } from "@/components/salary-form";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/40 px-4 py-8 sm:py-12">
      <div className="mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <section className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur sm:p-8">
          <p className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
            Salary Ticker
          </p>
          <h1 className="mt-4 text-3xl leading-tight font-bold tracking-tight text-slate-900 sm:text-4xl">
            내 연봉을 시간 단위로
            <br />
            직관적으로 확인해보세요
          </h1>
          <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
            연봉과 월 근로시간을 입력하면 시급, 초당 수익, 오늘 출근 후 누적 수익까지 한 번에 계산합니다.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-xs text-slate-600 sm:text-sm">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
              오늘 내 시간의 가치 확인
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
              사고 싶은 물건까지 역산
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
              숫자로 체감하는 연봉
            </span>
          </div>
        </section>

        <div className="lg:sticky lg:top-8">
          <SalaryForm />
        </div>
      </div>
    </main>
  );
}
