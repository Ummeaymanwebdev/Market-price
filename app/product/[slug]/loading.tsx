export default function Loading() {
  return (
    <div className="space-y-6 py-6">
      <div className="skeleton h-5 w-48" />
      <div className="skeleton h-40 rounded-2xl" />
      <div className="skeleton h-7 w-40" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="skeleton h-24 rounded-2xl" />
        <div className="skeleton h-24 rounded-2xl" />
        <div className="skeleton h-24 rounded-2xl" />
      </div>
      <div className="skeleton h-72 rounded-2xl" />
    </div>
  );
}