"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut } from "@/lib/auth-client";
import type { Category } from "@/lib/normalize";

type NavUser = { name: string; image: string | null } | null;

export default function NavbarClient({
  categories,
  date,
  user,
}: {
  categories: Category[];
  date: string;
  user: NavUser;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    toast.success("সাইন আউট সফল হয়েছে");
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100">
      <div className="mx-auto max-w-6xl px-4">
        {/* প্রথম সারি: লোগো + অথ */}
        <div className="flex items-center justify-between gap-3 py-3">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-base-200 text-xl">
              🛒
            </span>
            <span className="leading-tight">
              <span className="block text-lg font-bold sm:text-xl">
                বাজার দর
              </span>
              <span className="block text-xs text-base-content/60">{date}</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-sm sm:btn-md"
                >
                  {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.image}
                      alt={user.name}
                      referrerPolicy="no-referrer"
                      className="h-8 w-8 rounded-lg object-cover"
                    />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm text-white">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <span className="max-w-24 truncate">
                    {user.name?.split(" ")[0]}
                  </span>
                  <span className="text-xs">▾</span>
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-10 mt-2 w-44 rounded-xl border border-base-300 bg-base-100 p-2 shadow"
                >
                  <li>
                    <Link href="/profile">👤 আমার প্রোফাইল</Link>
                  </li>
                  <li>
                    <button onClick={handleSignOut} className="text-error">
                      🚪 সাইন আউট
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="btn btn-outline btn-primary btn-sm sm:btn-md"
                >
                  সাইন ইন
                </Link>
                <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>

        {/* দ্বিতীয় সারি: ক্যাটাগরি (মোবাইলে আড়াআড়ি স্ক্রল) */}
        <nav className="no-scrollbar flex gap-2 overflow-x-auto pb-3">
          {categories.map((c) => {
            const active = pathname === `/category/${c.slug}`;
            return (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className={`btn btn-sm whitespace-nowrap rounded-lg ${
                  active ? "btn-primary" : "btn-ghost"
                }`}
              >
                {c.icon} {c.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}