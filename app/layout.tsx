import { Suspense } from "react";
import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Navbar from "@/app/components/Navbar";
import PriceTicker from "@/app/components/PriceTicker";
import Footer from "@/app/components/Footer";
import "./globals.css";

const hind = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" data-theme="bazardor">
      <body
  className={`${hind.variable} flex min-h-screen flex-col bg-base-100 text-base-content`}
>
  <Suspense
    fallback={
      <div className="border-b border-base-300">
        <div className="skeleton mx-auto my-3 h-16 max-w-6xl" />
      </div>
    }
  >
    <Navbar />
  </Suspense>

  <Suspense fallback={<div className="skeleton h-9 rounded-none" />}>
    <PriceTicker />
  </Suspense>

  <main className="mx-auto w-full max-w-6xl flex-1 px-4">{children}</main>
  <Footer />
  <Toaster position="top-center" />
</body>
    </html>
  );
}