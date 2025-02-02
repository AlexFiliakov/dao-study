import React from 'react';
import { BookOpen, ArrowBigLeft, ArrowBigRight, TableOfContents, SquarePlay } from 'lucide-react';
import Layout from '@/components/Layout';
import TaoistButton from '@/components/TaoistButton';

export const metadata = {
  title: 'Dao De Jing: Chapter 1 | 道 Dao Study Group',
  description: 'Exploring the wisdom of the Dao De Jing (道德经).',
};

export default function DDJCh2 () {
  return (
    <Layout>
      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="w-full min-h-screen bg-neutral-50 p-8 font-serif">
            {/* Header Section */}
            <header className="bg-teal-700 text-neutral-50 p-6 rounded-lg shadow-lg">
            <h1 className="text-5xl font-large mb-2 flex justify-between">Dao De Jing<span style={{ textAlign:'right'}}></span></h1>
                <h1 className="text-3xl font-medium mb-2">The Silk Manuscript Version Chapter 2</h1>
                <p className="text-teal-100">帛书版 第二章</p>
            </header>

            <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-teal-700">
              <p className="text-neutral-600">
                Coming soon
              </p>
            </div>

            <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-red-800">
              <div className="flex items-center mb-4">
                <SquarePlay className="text-red-800 mr-3" />
                <h2 className="text-xl text-neutral-800">Video Lecture</h2>
              </div>
              <p className="text-neutral-600">
              Lesson video coming soon.
              </p>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-md border-l-4 border-teal-700">
            <div className="flex items-center mb-4">
              <BookOpen className="text-teal-700 mr-3" />
              <h2 className="text-xl text-neutral-800">Additional Notes</h2>
            </div>
            <p className="text-neutral-600">
              Coming soon
            </p>
          </div>

          {/* Follow-up Section */}
          <div className="mt-8 bg-amber-700 text-neutral-50 p-8 rounded-lg">
            <div className="flex items-center mb-4">
                <h2 className="text-xl">Questions:</h2>
            </div>
            <ol style={{listStyleType: "decimal"}}>
                <li>Coming soon</li>
            </ol>
          </div>

          <div className="mt-8 flex justify-center space-x-4 items-center">
            <a href="/ddj_ch_1" rel="noopener noreferrer">
              <TaoistButton variant="primary">
                <ArrowBigLeft className="w-5 h-5" />
                  Chapter 1
              </TaoistButton>
            </a>
            <a href="/ddj_index" rel="noopener noreferrer">
              <TaoistButton variant="primary">
                <TableOfContents className="w-5 h-5" />
                Index
              </TaoistButton>
            </a>
            <a href="/ddj_ch_16" rel="noopener noreferrer">
              <TaoistButton variant="primary">
                Chapter 16
                <ArrowBigRight className="w-5 h-5" />
              </TaoistButton>
            </a>
          </div>
        </div>
      </main>
    </Layout>
  );
};