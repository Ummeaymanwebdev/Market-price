"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";

export function Avatar({
  name,
  image,
  size = "h-14 w-14",
}: {
  name?: string | null;
  image?: string | null;
  size?: string;
}) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt={name ?? "প্রোফাইল"}
        referrerPolicy="no-referrer"
        className={`${size} rounded-xl object-cover`}
      />
    );
  }
  return (
    <span
      className={`${size} flex items-center justify-center rounded-xl bg-primary text-xl font-bold text-white`}
    >
      {name?.charAt(0).toUpperCase() ?? "?"}
    </span>
  );
}

export default function ProfileView() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const handleSignOut = async () => {
    await signOut();
    toast.success("সাইন আউট সফল হয়েছে");
    router.push("/");
    router.refresh();
  };

  if (isPending) {
    return (
      <div className="mx-auto max-w-2xl space-y-4 py-8">
        <div className="skeleton h-8 w-48" />
        <div className="skeleton h-24 rounded-2xl" />
        <div className="skeleton h-48 rounded-2xl" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="py-20 text-center">
        <p className="mb-4">প্রোফাইল দেখতে আগে সাইন ইন করুন।</p>
        <Link href="/signin" className="btn btn-primary">
          সাইন ইন
        </Link>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="mx-auto max-w-2xl space-y-5 py-8">
      <div>
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm text-base-content/60">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* ছবি, নাম, ইমেইল, সাইন আউট */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-base-300 bg-base-100 p-5">
        <div className="flex items-center gap-4">
          <Avatar name={user.name} image={user.image} />
          <div>
            <p className="text-lg font-semibold">{user.name}</p>
            <p className="text-sm text-base-content/60">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="btn btn-outline btn-error btn-sm sm:btn-md"
        >
          ↩ সাইন আউট
        </button>
      </div>

      {/* তথ্য */}
      <div className="rounded-2xl border border-base-300 bg-base-100 p-5">
        <h2 className="mb-4 font-semibold">তথ্য</h2>

        <dl className="space-y-3 text-sm">
          <div className="flex justify-between gap-4 border-b border-base-300 pb-3">
            <dt className="text-base-content/60">নাম</dt>
            <dd className="font-medium">{user.name}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-base-content/60">ইমেইল</dt>
            <dd className="font-medium break-all">{user.email}</dd>
          </div>
        </dl>

        {/* আপডেট বাটন: আলাদা রুটে নিয়ে যায় */}
        <Link
          href="/profile/update"
          className="btn btn-primary mt-5 w-full"
        >
          তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}