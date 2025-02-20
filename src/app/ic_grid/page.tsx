import React from 'react';
import Layout from '@/components/Layout';
import Image from 'next/image';
import HexagramGridNumeric, { HexagramGridConstructed } from '@/components/HexagramGrid';
import { getHexagramData } from '@/utils/getHexagramData';

export const metadata = {
  title: 'Yi Jing: Hexagram Matrix | 道 Dao Study Group',
  description: 'The 64 hexagrams of the Yi Jing displayed in a matrix format.',
};

export default async function IChingGrid() {
  const { hexagramDetails } = await getHexagramData();

  return (
    <Layout>
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="space-y-8">
          <div className="relative w-full aspect-[1920/774] rounded-lg overflow-hidden">
            <Image
              src="/images/temple daytime.png"
              alt="Yang Tian Gian Temple (仰天观)"
              layout="fill"
              objectFit="cover"
              sizes="100vw"
              priority
            />
          </div>
        </div>
        <div className="w-full min-h-screen bg-neutral-50 pt-8 font-serif">
          <header className="bg-teal-700 text-neutral-50 p-6 rounded-lg shadow-lg">
              <h1 className="text-5xl font-large mb-2 flex justify-between">Yi Jing</h1>
              <h1 className="text-3xl font-medium mb-2">Hexagram Matrix</h1>
              <p className="text-teal-100">易经</p>
          </header>

          <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-teal-700">
            <h2 className="text-xl text-neutral-800 mb-4">Numerical Order</h2>
            <HexagramGridNumeric hexagramDetails={hexagramDetails} />
          </div>
          
          <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-teal-700">
            <h2 className="text-xl text-neutral-800 mb-4">Construction from Trigrams (☰ ☱ ☲ ☳ ☴ ☵ ☶ ☷)</h2>
            <HexagramGridConstructed hexagramDetails={hexagramDetails} />
          </div>
        </div>
      </main>
    </Layout>
  );
};