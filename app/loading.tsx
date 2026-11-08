export default function Loading() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl px-4 py-10">
      <div className="mb-8 h-8 w-48 animate-pulse rounded-lg bg-gray-200" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-xl border p-5"
          >
            <div className="mb-4 h-40 rounded-lg bg-gray-200" />
            <div className="mb-3 h-5 w-3/4 rounded bg-gray-200" />
            <div className="h-5 w-1/2 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </main>
  );
}