import { GridSkeleton } from "@/app/components/ProductGrid";

export default function Loading() {
  return (
    <div className="space-y-6 py-6">
      <div className="skeleton h-24 rounded-2xl" />
      <div className="skeleton h-16 rounded-2xl" />
      <div className="skeleton h-5 w-48" />
      <GridSkeleton count={6} />
    </div>
  );
}