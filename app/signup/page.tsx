"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password) {
      toast.error("সব তথ্য পূরণ করো");
      return;
    }

    if (password.length < 8) {
      toast.error("Password কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Signup করা যায়নি");
        return;
      }

      toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করো।");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = async (
    provider: "google" | "github"
  ) => {
    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "Signup করা যায়নি");
      }
    } catch {
      toast.error("Social login-এ সমস্যা হয়েছে");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-base-100 p-8 shadow-xl">

        <h1 className="mb-2 text-center text-3xl font-bold">
          Create Account
        </h1>

        <p className="mb-6 text-center text-gray-500">
          বাজার দর-এ তোমাকে স্বাগতম!
        </p>

        <form onSubmit={handleSignup} className="space-y-4">

          <div>
            <label className="mb-1 block font-medium">
              Full Name
            </label>

            <input
              type="text"
              placeholder="তোমার নাম লিখো"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="তোমার Email লিখো"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={8}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "Sign Up"}
          </button>

        </form>

        <div className="divider">অথবা</div>

        <button
          onClick={() => handleSocialSignup("google")}
          className="btn btn-outline mb-3 w-full"
        >
          Continue with Google
        </button>

        <button
          onClick={() => handleSocialSignup("github")}
          className="btn btn-outline w-full"
        >
          Continue with GitHub
        </button>

        <p className="mt-6 text-center">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/login"
            className="font-bold text-primary"
          >
            Login করো
          </Link>
        </p>

      </div>
    </div>
  );
}
