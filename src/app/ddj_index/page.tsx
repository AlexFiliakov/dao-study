import React from 'react';
import { BookOpen } from 'lucide-react';
import Layout from '@/components/Layout';

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

            <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-teal-700">
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