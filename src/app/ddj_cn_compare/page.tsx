import TextComparison from '@/components/TextComparison';
import React from 'react';
import Layout from '@/components/Layout';
import Image from 'next/image';
import { getHexagramData } from '@/utils/getHexagramData';

export const metadata = {
  title: 'Dao De Jing Text Comparison | 道 Dao Study Group',
  description: 'Comparing the Standard Text of Dao De Jing (道德经) with the Guodian Chu (郭店楚簡) and Mawangdui (马王堆帛书) revisions .',
};

export default async function DDJCompare() {
  const { hexagramMapping, hexagramDetails } = await getHexagramData();

  return (
    <Layout>
      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Image */}
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
          {/* Header Section */}
          <header className="bg-teal-700 text-neutral-50 p-6 rounded-lg shadow-lg">
              <h1 className="text-5xl font-large mb-2 flex justify-between">Dao De Jing</h1>
              <h1 className="text-3xl font-medium mb-2">Text Comparison</h1>
              <p className="text-teal-100">道德经</p>
          </header>

          <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-red-800">
            <div className="flex items-top mb-4">
              <h2 className="text-xl text-neutral-800">Comparing the Standard Text (
                <span className="text-red-600 bg-red-100">red</span>
                ) with the Guodian Chu (郭店楚簡) and Mawangdui (马王堆帛书) revisions (
                <span className="text-green-600 bg-green-100">green</span>).
              </h2>
            </div>
            <p className="text-gray-700">
              The difference between the two versions of Dao De Jing is subtle but profound, especially when considering the historical evolution of Chinese character meanings and philosophical implications.
            </p>
          </div>
          <TextComparison 
            hexagramMapping={hexagramMapping} 
            hexagramDetails={hexagramDetails} 
          />
        </div>
      </main>
    </Layout>
  );
};