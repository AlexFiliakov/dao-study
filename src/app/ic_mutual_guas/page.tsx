import React from 'react';
import Layout from '@/components/Layout';
import Image from 'next/image';
import { getHexagramData } from '@/utils/getHexagramData';
import MutualGuas from '@/components/MutualGuas';

export const metadata = {
  title: 'Yi Jing: Mutual Gua Tree | 道 Dao Study Group',
  description: 'Explore the tree of mutual guas.',
};

export default async function IChingGenerator() {
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
            <div className="flex flex-row">
              <div className="flex flex-col items-left">
                <h1 className="text-5xl font-large mb-2 flex justify-between">Yi Jing</h1>
                <h1 className="text-3xl font-medium mb-2">Mutual Gua Relationships</h1>
                <p className="text-teal-100">易经</p>
              </div>
              <div id="terminal-gua" className="flex flex-col items-right ml-auto justify-center">
                <div className="text-teal-100/10 text-6xl font-large">䷀䷁</div>
                <div className="text-teal-100/10 text-6xl font-large">䷾䷿</div>
              </div>
            </div>
          </header>

          <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-amber-700">
            <MutualGuas hexagramDetails={hexagramDetails} />
          </div>
        </div>
      </main>
    </Layout>
  );
};