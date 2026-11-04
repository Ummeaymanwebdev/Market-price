
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-base-200 px-4">
      <h1 className="text-4xl font-bold">
        বাজার দর
      </h1>

      <p className="text-center text-gray-600">
        প্রয়োজনীয় পণ্যের দাম এক নজরে।
      </p>

      <div className="flex gap-3">
        <Link href="/login" className="btn btn-primary">
          Login
        </Link>

        <Link href="/signup" className="btn btn-outline">
          Sign Up
        </Link>
      </div>
    </main>
  );
}
