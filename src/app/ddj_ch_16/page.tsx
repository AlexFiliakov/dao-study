import React from 'react';
import { Scroll, BookOpen, Coffee } from 'lucide-react';
import Layout from '@/components/Layout';
import { colors } from '@/constants/colors';  // Import colors from constants
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
                <h1 className="text-5xl font-large mb-2 flex justify-between">Dao De Jing<span style={{ textAlign:'right'}}></span></h1>
                <h1 className="text-3xl font-medium mb-2">The Silk Manuscript Version Chapter 16</h1>
                <p className="text-teal-100">帛本 第16章</p>
            </header>

            <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-teal-700">
              <p className="text-neutral-600">
                <span style={{color: '#f7000c'}}>至虛，極也；守情（静），表也。</span><br />
                萬物旁作，吾以觀其復也。<br />
                <span style={{color: '#30b1f0'}}>天物雲雲，各復歸於其根，曰静。</span><br />
                静，是胃復命。復命，常也；<br />
                <span style={{color: '#6d33a1'}}>知常，明也；</span><span style={{color: '#2fb04e'}}>不知常，妄妄作凶；</span><br />
                <span style={{color: '#6d33a1'}}>知常容，容乃公，公乃王，王乃天，天乃道，<br />
                道乃久，沕身不怠。</span><br /><br />
                <span style={{color: '#f7000c'}}>Pursue in your spiritual world to the extreme. Let your heart be at peace.</span><br />
                All creatures living out there. I watch their life cycles.<br />
                <span style={{color: '#30b1f0'}}>Each separate being in the universe, returns to its source.<br />
                Returning to the source is serenity/calmness.</span><br />
                <span style={{color: '#2fb04e'}}>If you don’t realize your source/gift/mission, you tumble in confusion and
                sorrow.</span><br />
                <span style={{color: '#6d33a1'}}>When you realize the source, you naturally become wise/enlightened,
                tolerant, equal, dignified as a king, broad as celestial, forever as Dao.
                Even when your body is immersed in the water (death), your spirit won’t
                die.</span>
              </p>
            </div>

            <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-red-800">
                <p className="text-neutral-600">
                <a 
                  href="http://xhslink.com/a/s4gPkO8VmRW4"
                  rel="noopener noreferrer"
                  className="text-red-800 hover:underline"
                >
                  Click here to watch the video lecture.
                </a>
                </p>
            </div>

          {/* Follow-up Section */}
          <div className="mt-8 bg-amber-700 text-neutral-50 p-8 rounded-lg">
            <div className="flex items-center mb-4">
                <h2 className="text-xl">Questions:</h2>
            </div>
            <ol style={{listStyleType: "decimal"}}>
                <li>Do you believe in fate?</li>
                <li>Have you realized your source, gift, or mission?</li>
                <li>What is inaction related to this chapter?</li>
            </ol>
          </div>
        </div>
      </main>
    </Layout>
  );
};