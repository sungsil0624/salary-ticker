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

  const faqs = [
    {
      question: "이 계산기는 어떤 값을 보여주나요?",
      answer:
        "입력한 연봉과 월 근로시간을 바탕으로 시급, 초당 수익, 오늘 누적 수익과 원하는 물건까지 필요한 근무 시간을 계산합니다.",
    },
    {
      question: "세후 기준 계산은 정확한가요?",
      answer:
        "입력한 공제율로 대략 계산하는 추정치입니다. 실제 실수령액은 개인 공제 항목에 따라 달라질 수 있습니다.",
    },
    {
      question: "월 근로시간은 어떻게 잡아야 하나요?",
      answer:
        "주 40시간 기준이면 약 209시간이 일반적이며, 회사의 근로시간 기준에 맞춰 수정하면 더 정확해집니다.",
    },
    {
      question: "포괄임금제 기준 계산은 무엇인가요?",
      answer:
        "포괄임금제 체크 시 월 근로시간을 1.25배로 환산해 시급을 보수적으로 계산합니다.",
    },
    {
      question: "결과는 어디에 활용하면 좋나요?",
      answer:
        "시간당 가치, 소비 계획, 목표 금액까지 필요한 근무 시간을 직관적으로 비교하는 데 활용할 수 있습니다.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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

        <section
          className="mx-auto mt-10 w-full max-w-5xl rounded-3xl border border-slate-200/70 bg-white/70 p-6 shadow-sm backdrop-blur sm:mt-14 sm:p-8"
          aria-labelledby="faq-title"
        >
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold tracking-[0.2em] text-emerald-600">
              FAQ
            </p>
            <h2
              id="faq-title"
              className="text-2xl font-semibold text-slate-900 sm:text-3xl"
            >
              자주 묻는 질문
            </h2>
            <p className="text-sm text-slate-600 sm:text-base">
              계산 방식과 입력 기준을 빠르게 확인해보세요.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-slate-200 bg-white/90 p-4 text-slate-700 shadow-sm transition hover:border-emerald-200"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-slate-900 sm:text-base">
                  <span>{faq.question}</span>
                  <span className="ml-4 inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 text-sm text-slate-500 transition group-open:rotate-45 group-open:border-emerald-200 group-open:text-emerald-600">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
