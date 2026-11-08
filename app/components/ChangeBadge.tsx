import { toBnPercent } from "@/lib/bn";

export default function ChangeBadge({ change }: { change: number }) {
  const up = change > 0;
  const down = change < 0;

  const style = up
    ? "bg-success/10 text-success"
    : down
    ? "bg-error/10 text-error"
    : "bg-base-200 text-base-content/60";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${style}`}
    >
      {up ? "▲" : down ? "▼" : "—"} {toBnPercent(change)}%
    </span>
  );
}