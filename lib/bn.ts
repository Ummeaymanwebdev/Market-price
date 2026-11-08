const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

// 148 -> ১৪৮, 1850 -> ১,৮৫০
export function toBn(value: number | string): string {
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  return new Intl.NumberFormat("bn-BD").format(num);
}

// "১,৮৫০" -> 1850
export function fromBn(value: string | number): number {
  if (typeof value === "number") return value;
  const english = String(value)
    .replace(/[০-৯]/g, (d) => String(bnDigits.indexOf(d)))
    .replace(/,/g, "")
    .replace(/[^\d.-]/g, "");
  return Number(english) || 0;
}

// 2.1 -> ২.১
export function toBnPercent(value: number): string {
  return new Intl.NumberFormat("bn-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(Math.abs(value));
}

// আজকের বাংলা তারিখ
export function banglaDate(): string {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}