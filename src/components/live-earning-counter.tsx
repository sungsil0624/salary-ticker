"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";

function formatWon(value: number) {
  return Math.max(0, value).toLocaleString("ko-KR", {
    maximumFractionDigits: 0,
  });
}

export function LiveEarningCounter({ perSecond }: { perSecond: number }) {
  const [secondsOnPage, setSecondsOnPage] = useState(0);
  const [secondsSinceWorkStart, setSecondsSinceWorkStart] = useState(0);
  const [animatedOnPage, setAnimatedOnPage] = useState(0);
  const [animatedToday, setAnimatedToday] = useState(0);
  const prevOnPage = useRef(0);
  const prevToday = useRef(0);

  useEffect(() => {
    const updateWorkSeconds = () => {
      const now = new Date();
      const workStart = new Date(now);
      const workEnd = new Date(now);
      workStart.setHours(9, 0, 0, 0);
      workEnd.setHours(18, 0, 0, 0);
      const clampedNow = Math.min(
        Math.max(now.getTime(), workStart.getTime()),
        workEnd.getTime()
      );
      const workedSeconds = Math.floor((clampedNow - workStart.getTime()) / 1000);
      setSecondsSinceWorkStart(Math.max(0, workedSeconds));
    };

    updateWorkSeconds();
    const timer = setInterval(() => {
      setSecondsOnPage((prev) => prev + 1);
      updateWorkSeconds();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const earnedOnPage = perSecond * secondsOnPage;
  const earnedToday = perSecond * secondsSinceWorkStart;

  useEffect(() => {
    const controls = animate(prevOnPage.current, earnedOnPage, {
      duration: 0.85,
      ease: "easeOut",
      onUpdate: (latest) => setAnimatedOnPage(latest),
    });
    prevOnPage.current = earnedOnPage;
    return () => controls.stop();
  }, [earnedOnPage]);

  useEffect(() => {
    const controls = animate(prevToday.current, earnedToday, {
      duration: 0.85,
      ease: "easeOut",
      onUpdate: (latest) => setAnimatedToday(latest),
    });
    prevToday.current = earnedToday;
    return () => controls.stop();
  }, [earnedToday]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-sm text-slate-500">이 페이지에 머무는 동안</p>
        <p className="text-3xl font-mono font-bold tracking-tight text-slate-900 sm:text-4xl">
          {formatWon(animatedOnPage)}원
        </p>
      </div>

      <div className="space-y-2 border-t border-slate-200 pt-4 sm:pt-5">
        <p className="text-sm text-slate-500">오늘 출근 후 얼마 벌었는지 (9시 출근 기준)</p>
        <p className="text-2xl font-mono font-bold tracking-tight text-slate-900 sm:text-3xl">
          {formatWon(animatedToday)}원
        </p>
      </div>
    </div>
  );
}
