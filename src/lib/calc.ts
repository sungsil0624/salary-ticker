export function calculateWage({
  annualSalary,
  monthlyHours,
  inclusive = false,
}: {
  annualSalary: number;
  monthlyHours: number;
  inclusive?: boolean;
}) {
  const INCLUSIVE_HOURS_MULTIPLIER = 1.25;
  const effectiveMonthlyHours = inclusive
    ? monthlyHours * INCLUSIVE_HOURS_MULTIPLIER
    : monthlyHours;
  const safeMonthlyHours =
    Number.isFinite(effectiveMonthlyHours) && effectiveMonthlyHours > 0
      ? effectiveMonthlyHours
      : 1;
  const safeAnnualSalary =
    Number.isFinite(annualSalary) && annualSalary > 0 ? annualSalary : 0;

  const hourly = safeAnnualSalary / 12 / safeMonthlyHours;
  const perSecond = hourly / 3600;

  return {
    hourly,
    perSecond,
    effectiveMonthlyHours: safeMonthlyHours,
  };
}

export function formatWon(value: number) {
  return new Intl.NumberFormat("ko-KR", {
    maximumFractionDigits: 0,
  }).format(value);
}
