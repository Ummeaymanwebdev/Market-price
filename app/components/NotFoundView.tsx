import Link from "next/link";

export default function NotFoundView({
  message = "আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center py-20 text-center">
      <p className="text-6xl">🔍</p>
      <h1 className="mt-4 text-5xl font-bold text-primary">৪০৪</h1>
      <p className="mt-3 text-base-content/70">{message}</p>
      <Link href="/" className="btn btn-primary mt-6">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}