import { SalaryForm } from "@/components/salary-form";
import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "연봉 계산기",
  description:
    "세전/세후 연봉과 월 근로시간을 입력해 시급, 초당 수익, 오늘 누적 수익을 계산해보세요.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_NAME} | 연봉 계산기`,
    description:
      "연봉을 시간 단위로 직관적으로 계산하고, 사고 싶은 물건까지 필요한 근무 시간을 확인해보세요.",
    url: "/",
  },
};

export default function HomePage() {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "ko-KR",
  };

  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: SITE_URL,
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    inLanguage: "ko-KR",
    description: "연봉을 시급, 초당 수익, 근무 시간으로 환산하는 웹 계산기",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }}
      />
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
    </>
  );
}
