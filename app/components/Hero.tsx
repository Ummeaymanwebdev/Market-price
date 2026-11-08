import Image from "next/image";
import { connection } from "next/server";
import { banglaDate } from "@/lib/bn";

export default async function Hero() {
  await connection();

  return (
    <section className="my-6 grid items-center gap-6 rounded-3xl border border-base-300 bg-base-100 p-6 md:grid-cols-[1fr_auto] md:p-10">
      <div className="space-y-4 text-center md:text-left">
        <span className="inline-block rounded-full bg-base-200 px-3 py-1 text-sm text-primary">
          {banglaDate()}
        </span>

        <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
          আজকের বাজারের দাম এক নজরে
        </h1>

        <p className="mx-auto max-w-xl text-base-content/70 md:mx-0">
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>

        <div className="flex flex-wrap justify-center gap-3 md:justify-start">
          {/* anchor link: route change হয় না, একই পেজে স্ক্রল করে */}
          <a href="#সব-পণ্য" className="btn btn-primary btn-sm sm:btn-md">
            সব পণ্য দেখুন
          </a>
          <a href="#risers" className="btn btn-outline btn-sm sm:btn-md">
            ⚖️ বাজার তুলনা
          </a>
        </div>
      </div>

      <Image
        src="/bazar-hero.png"
        alt="বাজার দর"
        width={320}
        height={320}
        priority
        className="mx-auto h-auto w-56 sm:w-72 md:w-80"
      />
    </section>
  );
}