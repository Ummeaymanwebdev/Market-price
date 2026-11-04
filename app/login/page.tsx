
"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("সব তথ্য পূরণ করো");
      return;
    }

    setLoading(true);

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      toast.error(error.message || "Login করা যায়নি");
      return;
    }

    toast.success("সফলভাবে Login হয়েছে!");
    router.push("/");
    router.refresh();
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });

    if (error) {
      toast.error(error.message || "Login করা যায়নি");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md rounded-2xl bg-base-100 p-8 shadow-xl">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Welcome Back!
        </h1>

        <p className="mb-6 text-center text-gray-500">
          তোমার অ্যাকাউন্টে Login করো
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="mb-1 block font-medium">Email</label>
            <input
              type="email"
              placeholder="তোমার Email দাও"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Password</label>
            <input
              type="password"
              placeholder="তোমার Password দাও"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? "Login হচ্ছে..." : "Login"}
          </button>
        </form>

        <div className="divider">অথবা</div>

        <button
          onClick={() => handleSocialLogin("google")}
          className="btn btn-outline mb-3 w-full"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-bold text-primary">
            Sign Up করো
          </Link>
        </p>
      </div>
    </div>
  );
}
