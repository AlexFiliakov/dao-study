import React from 'react';
import { BookOpen } from 'lucide-react';
import Layout from '@/components/Layout';
import Image from 'next/image';

export const metadata = {
  title: 'Dao De Jing: Chapter 1 | 道 Dao Study Group',
  description: 'Exploring the wisdom of the Dao De Jing (道德经).',
};

export default function DDJCh1 () {
  return (
    <Layout>
      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="w-full min-h-screen bg-neutral-50 p-8 font-serif">
            {/* Header Section */}
            <header className="bg-teal-700 text-neutral-50 p-6 rounded-lg shadow-lg">
            <h1 className="text-5xl font-large mb-2 flex justify-between">Dao De Jing</h1>
                <p className="text-teal-100">道德经</p>
            </header>

            <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-teal-700 flex flex-col md:flex-row-reverse items-center md:items-start">
              <Image 
              src="/images/Mawangdui_Lao_Tzu.jpg" 
              alt="Mawangdui Lao Tzu Manuscript" 
              width={300}
              height={300}
              className="w-auto h-[300px] rounded-lg shadow-md mb-6 md:mb-0 md:ml-6" 
              />
              <div>
              The best known version of Dao De Jing comes from the &ldquo;Three Kingdoms Period,&rdquo; about 240AD. Unfortunately, it is heavily edited by later transcribers and varies significantly from earlier versions.<br /><br />
              We mainly rely on the Mawangdui version from the Han Dynasty (180BC) discovered in 1973 (aka The Silk Manuscript).<br /><br />
              Where possible, we augment the Silk Manuscript with the Guodian Chu Mu text from Warring States Period (about 300BC) discovered in 1993.<br />
              </div>
            </div>

            <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-teal-700">
              <div className="flex items-center mb-4">
                <BookOpen className="text-teal-700 mr-3" />
                <h2 className="text-xl text-neutral-800">Translation with Notes</h2>
              </div>
              <ul className="list-disc pl-5">
                <li>
                    <a 
                    href="/ddj_ch_1"
                    rel="noopener noreferrer"
                    className="text-red-800 hover:underline"
                    >
                    Chapter 1
                    </a>
                </li>
                <li>
                    <a 
                    href="/ddj_ch_2"
                    rel="noopener noreferrer"
                    className="text-red-800 hover:underline"
                    >
                    Chapter 2 (Coming Soon)
                    </a>
                </li>
                <li>
                    <a 
                    href="/ddj_ch_16"
                    rel="noopener noreferrer"
                    className="text-red-800 hover:underline"
                    >
                    Chapter 16
                    </a>
                </li>
            </ul>
            </div>
        </div>
      </main>
    </Layout>
  );
};