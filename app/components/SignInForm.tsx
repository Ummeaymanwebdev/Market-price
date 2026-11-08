"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";
import AuthShell from "./AuthShell";
import AuthField from "./AuthField";
import SocialButtons from "./SocialButtons";

export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // সাইন ইনের পর কোন পেজে যাবে (শুধু নিজের সাইটের পথ, না থাকলে হোম)
  const redirectParam = params.get("redirect");
  const redirectTo =
    redirectParam && redirectParam.startsWith("/") ? redirectParam : "/";

  // প্রোটেক্টেড পেজ থেকে এলে বার্তা দেখাবে
  useEffect(() => {
    if (params.get("protected")) {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন", { id: "protected" });
    }
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) return toast.error("ইমেইল লিখুন");
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("ইমেইল ঠিকমতো লিখুন");
    if (!password) return toast.error("পাসওয়ার্ড লিখুন");

    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(authErrorMessage(error));
      return;
    }

    toast.success("সাইন ইন সফল হয়েছে");
    router.push(redirectTo);
    router.refresh();
  };

  return (
    <AuthShell
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <AuthField
          id="email"
          label="ইমেইল"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <AuthField
          id="password"
          label="পাসওয়ার্ড"
          type="password"
          placeholder="কমপক্ষে ৮ অক্ষর"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "সাইন ইন"
          )}
        </button>
      </form>

      <SocialButtons callbackURL={redirectTo} />

      <p className="mt-4 text-center text-sm">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-medium text-primary">
          সাইন আপ করুন
        </Link>
      </p>
    </AuthShell>
  );
}