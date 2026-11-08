import { Suspense } from "react";
import Hero from "@/app/components/Hero";
import HomeSections, { HomeSectionsSkeleton } from "@/app/components/HomeSection";

export default function Home() {
  return (
    <>
      <Suspense fallback={<div className="skeleton my-6 h-72 rounded-3xl" />}>
        <Hero />
      </Suspense>

      <Suspense fallback={<HomeSectionsSkeleton />}>
        <HomeSections />
      </Suspense>
    </>
  );
}