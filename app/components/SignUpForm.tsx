"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signUp } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";
import AuthShell from "./AuthShell";
import AuthField from "./AuthField";
import SocialButtons from "./SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return toast.error("আপনার নাম লিখুন");
    if (!email.trim()) return toast.error("ইমেইল লিখুন");
    if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("ইমেইল ঠিকমতো লিখুন");
    if (password.length < 8)
      return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (password !== confirm) return toast.error("দুটো পাসওয়ার্ড মিলছে না");

    setLoading(true);
    const { error } = await signUp.email({ name: name.trim(), email, password });
    setLoading(false);

    if (error) {
      toast.error(authErrorMessage(error));
      return;
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এবার সাইন ইন করুন");
    router.push("/signin");
  };

  return (
    <AuthShell
      title="অ্যাকাউন্ট তৈরি করুন"
      subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <AuthField
          id="name"
          label="নাম"
          type="text"
          placeholder="যেমন: রহিম উদ্দিন"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
        />
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
          autoComplete="new-password"
        />
        <AuthField
          id="confirm"
          label="পাসওয়ার্ড নিশ্চিত করুন"
          type="password"
          placeholder="আবার লিখুন"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete="new-password"
        />

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "অ্যাকাউন্ট তৈরি করুন"
          )}
        </button>
      </form>

      <SocialButtons />

      <p className="mt-4 text-center text-sm">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-medium text-primary">
          সাইন ইন করুন
        </Link>
      </p>
    </AuthShell>
  );
}