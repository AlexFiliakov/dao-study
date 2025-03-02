import React from 'react';
import { ArrowDown01 } from 'lucide-react';
import Layout from '@/components/Layout';
import Image from 'next/image';
import { getHexagramData } from '@/utils/getHexagramData';
import ApproachedGuas from '@/components/ApproachedGuas';

export const metadata = {
  title: 'Yi Jing: Approached Guas | 道 Dao Study Group',
  description: 'Explore the distribution of approached guas.',
};

export default async function IChingApproached() {
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
                <h1 className="text-3xl font-medium mb-2">Approached Gua Distributions</h1>
                <p className="text-teal-100">易经</p>
              </div>
                <div id="terminal-gua" className="flex flex-col justify-center items-right ml-auto">
                  <ArrowDown01 className="w-20 h-20" color="#34847c" />
                </div>
            </div>
          </header>

          <ApproachedGuas hexagramDetails={hexagramDetails} />
        </div>
      </main>
    </Layout>
  );
};