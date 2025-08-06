"use client";

import React from "react";
import USStatesPreview from "@/app/(frontend)/components/channel/States";
import Organisations from "@/app/(frontend)/components/channel/Organisations";
import Image from "next/image";
import NewsTicker from "@/app/(frontend)/components/channel/NewsTicker";
import TeluguNewsUI from "@/app/(frontend)/components/channel/NewsLinks";
export default function LandingPage({  }) {


  
  return (
    <>
    <div className="w-full max-w-6xl mx-auto mb-12">
      {/* Main Content Layout */}
      <div className="flex items-stretch gap-4">
        {/* Left Ad Banner */}
        <div className="hidden lg:flex w-48 bg-white text-white rounded-2xl shadow-2xl p-4 items-center justify-center">
          <Image
            src="https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/Adverts/AGFT.png"
            alt="Banner advertisement"
            width={192}
            height={192}
            className="object-contain w-full h-auto rounded-xl"
          />
        </div>

        {/* News Ticker */}
        <NewsTicker />

        {/* Right Ad Banner */}
        <div className="hidden lg:flex w-48 bg-white text-white rounded-2xl shadow-2xl p-4 items-center justify-center text-center">
          <Image
            src="https://mx8afcx2tqxngq7w.public.blob.vercel-storage.com/Adverts/mypursu.png"
            alt="Banner advertisement"
            width={192}
            height={192}
            className="object-contain w-full h-auto rounded-xl"
          />
        </div>
      </div>

      <Organisations />
      <USStatesPreview />
      <TeluguNewsUI/>
    </div>
    <div>
    </div>
    </>
  );
}