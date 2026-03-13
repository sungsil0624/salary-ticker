"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const activeKey = useMemo(() => {
    if (!pathname) {
      return "home";
    }
    if (pathname.startsWith("/net-salary-table")) {
      return "net";
    }
    if (pathname === "/" || pathname.startsWith("/result")) {
      return "home";
    }
    return "home";
  }, [pathname]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            ST
          </span>
          Salary Ticker
        </Link>

        <nav className="hidden items-center gap-3 text-sm font-medium text-slate-600 md:flex">
          <Link
            href="/"
            className={
              activeKey === "home"
                ? "rounded-full bg-slate-100 px-3 py-2 text-slate-900 hover:bg-slate-200"
                : "rounded-full px-3 py-2 text-slate-700 hover:bg-slate-100"
            }
          >
            연봉 계산기
          </Link>
          <Link
            href="/net-salary-table"
            className={
              activeKey === "net"
                ? "flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-slate-900 hover:bg-slate-200"
                : "flex items-center gap-2 rounded-full px-3 py-2 text-slate-700 hover:bg-slate-100"
            }
          >
            실수령액 계산기
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100 md:hidden"
          aria-label="메뉴 열기"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <span className="sr-only">메뉴</span>
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-full bg-current transition ${
                isOpen ? "translate-y-[7px] rotate-45" : ""}
              `}
            />
            <span
              className={`absolute left-0 top-1.5 h-0.5 w-full bg-current transition ${
                isOpen ? "opacity-0" : ""}
              `}
            />
            <span
              className={`absolute left-0 top-3 h-0.5 w-full bg-current transition ${
                isOpen ? "-translate-y-[7px] -rotate-45" : ""}
              `}
            />
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200/70 bg-white/95 px-4 pb-4 pt-3 md:hidden">
          <nav className="flex flex-col gap-2 text-sm font-medium text-slate-700">
            <Link
              href="/"
              className={
                activeKey === "home"
                  ? "rounded-xl bg-slate-100 px-3 py-2 text-slate-900 hover:bg-slate-200"
                  : "rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-100"
              }
              onClick={() => setIsOpen(false)}
            >
              연봉 계산기
            </Link>
            <Link
              href="/net-salary-table"
              className={
                activeKey === "net"
                  ? "rounded-xl bg-slate-100 px-3 py-2 text-slate-900 hover:bg-slate-200"
                  : "rounded-xl px-3 py-2 text-slate-700 hover:bg-slate-100"
              }
              onClick={() => setIsOpen(false)}
            >
              실수령액 계산기
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
