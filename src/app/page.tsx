"use client";

import Header from "@/components/Header";
import TestWallet from "@/components/TestWallet";
import ActionButtons from "@/components/ActionButtons";
import dynamic from "next/dynamic";

const PriceChart = dynamic(() => import("@/components/PriceChart"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto p-4">
        <TestWallet />
        <PriceChart />
        <ActionButtons />
      </main>
    </div>
  );
}
