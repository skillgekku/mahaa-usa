"use client";

import React from "react";
import { ChannelConfig } from "@/app/(frontend)/lib/types";
import { useTheme } from "@/app/(frontend)/hooks/useTheme";
import { THEME_CLASSES } from "@/app/(frontend)/lib/constants";
import USStatesPreview from "@/app/(frontend)/components/channel/UstatesPreview";
import Organisations from "@/app/(frontend)/components/channel/Organisations";
import Image from "next/image";
import NewsTicker from "@/app/(frontend)/components/channel/NewsTicker";
import NewsSection from "@/app/(frontend)/components/channel/Articles";

interface LandingPageProps {
  conferences: ChannelConfig[];
  onConferenceSelect: (conference: ChannelConfig) => void;
}

export default function LandingPage({ conferences }: LandingPageProps) {
  const { isDarkMode } = useTheme();
  const theme = THEME_CLASSES[isDarkMode ? "dark" : "light"];

  return (
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
      <NewsSection />
    </div>
  );
}