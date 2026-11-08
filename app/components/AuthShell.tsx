import Link from "next/link";

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-md py-10">
      <div className="mb-5 text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mt-1 text-sm text-base-content/60">{subtitle}</p>
      </div>

      <div className="rounded-2xl border border-base-300 bg-base-100 p-6 shadow-sm">
        {children}
      </div>

      <p className="mt-5 text-center text-sm">
        <Link href="/" className="text-base-content/60 hover:text-primary">
          ← হোম পেজে ফিরে যান
        </Link>
      </p>
    </div>
  );
}