"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";
import { Avatar } from "./ProfileView";

// ছবি মাঝখান থেকে চৌকো করে কেটে ছোট করে (ডাটাবেসে হালকা থাকার জন্য)
function fileToAvatar(file: File, size = 256): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        return reject(new Error("canvas"));
      }
      const min = Math.min(img.width, img.height);
      const sx = (img.width - min) / 2;
      const sy = (img.height - min) / 2;
      ctx.drawImage(img, sx, sy, min, min, 0, 0, size, size);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.8));
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("load"));
    };

    img.src = url;
  });
}

export default function UpdateProfileForm() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const fileRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [imageChanged, setImageChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  // বর্তমান নাম ও ছবি ফর্মে বসিয়ে দেবে
  useEffect(() => {
    if (session?.user) {
      setName(session.user.name ?? "");
      setPreview(session.user.image ?? null);
    }
  }, [session?.user?.name, session?.user?.image]);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("শুধু ছবির ফাইল দিন");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("ছবি ৫ এমবির বেশি হতে পারবে না");
      return;
    }

    try {
      const dataUrl = await fileToAvatar(file);
      setPreview(dataUrl);
      setImageChanged(true);
    } catch {
      toast.error("ছবিটি পড়া যায়নি, অন্য ছবি দিন");
    }
    e.target.value = "";
  };

  const removeImage = () => {
    setPreview(null);
    setImageChanged(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return toast.error("নাম খালি রাখা যাবে না");

    const nameChanged = name.trim() !== session?.user?.name;
    if (!nameChanged && !imageChanged) {
      return toast("নতুন কোনো পরিবর্তন নেই");
    }

    const payload: { name?: string; image?: string | null } = {};
    if (nameChanged) payload.name = name.trim();
    if (imageChanged) payload.image = preview; // null দিলে ছবি মুছে যাবে

    setLoading(true);
    const { error } = await authClient.updateUser(payload);
    setLoading(false);

    if (error) {
      toast.error("তথ্য আপডেট করা যায়নি, আবার চেষ্টা করুন");
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  };

  if (isPending) {
    return (
      <div className="mx-auto max-w-md py-8">
        <div className="skeleton h-80 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md py-8">
      <div className="mb-5">
        <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
        <p className="text-sm text-base-content/60">
          আপনার নাম ও প্রোফাইল ছবি বদলে নিন।
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-5 rounded-2xl border border-base-300 bg-base-100 p-6"
      >
        {/* ছবি */}
        <div className="flex items-center gap-4">
          <Avatar name={name} image={preview} size="h-20 w-20" />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="btn btn-outline btn-sm"
            >
              ছবি বদলান
            </button>
            {preview && (
              <button
                type="button"
                onClick={removeImage}
                className="btn btn-ghost btn-sm text-error"
              >
                ছবি মুছুন
              </button>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
        </div>

        {/* নাম */}
        <div className="space-y-1">
          <label htmlFor="name" className="text-sm font-medium">
            নাম
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="আপনার নাম লিখুন"
            className="input w-full"
            autoComplete="name"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            "তথ্য আপডেট করুন"
          )}
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        <Link href="/profile" className="text-base-content/60 hover:text-primary">
          ← প্রোফাইলে ফিরে যান
        </Link>
      </p>
    </div>
  );
}