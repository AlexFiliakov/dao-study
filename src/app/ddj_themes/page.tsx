
import React from 'react';
import { CircleHelp } from 'lucide-react';
import Layout from '@/components/Layout';
import Image from 'next/image';

export const metadata = {
  title: 'Dao De Jing: Chapter 1 | 道 Dao Study Group',
  description: 'Exploring the wisdom of the Dao De Jing (道德经).',
};

export default function DDJThemes () {
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
        <div className="w-full min-h-screen bg-neutral-50 p-8 font-serif">
            {/* Header Section */}
            <header className="bg-teal-700 text-neutral-50 p-6 rounded-lg shadow-lg">
                <h1 className="text-5xl font-large mb-2 flex justify-between">Dao De Jing</h1>
                <h1 className="text-3xl font-medium mb-2">Recurring Themes</h1>
                <p className="text-teal-100">道德经</p>
            </header>

            <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-red-800">
              <div className="flex items-center mb-4">
                <CircleHelp className="text-red-800 mr-3" />
                <h2 className="text-xl text-neutral-800">About This List</h2>
              </div>
              These are the most frequently occurring words in the Dao De Jing, excluding common terms.<br /><br />
              They are grouped into somewhat arbitrary thematic collections.<br /><br />
              <Image
                src="/images/char_frequency.png"
                alt="Dao De Jing Character Frequency"
                objectFit="cover"
                width={300}
                height={300}
                className="w-auto h-auto mb-6 md:mb-0" 
                priority
              />
            </div>

            <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-teal-700">
                {/* <div className="flex items-center mb-4">
                    <BookOpen className="text-teal-700 mr-3" />
                    <h2 className="text-xl text-neutral-800">Recurring Themes</h2>
                </div> */}
                道 (dào) – &ldquo;The Way&rdquo; or &ldquo;the Path&rdquo;; central to Daoist philosophy.<br /><br />
                德 (dé) – &ldquo;Virtue&rdquo; or &ldquo;Power&rdquo;; represents the active expression of the Dao.
            </div>
            <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-teal-700">
                大 (dà) – &ldquo;Great&rdquo; or &ldquo;vast&rdquo;; frequently used to describe the Dao and the natural order.<br /><br />
                常 (cháng) - &ldquo;Constant,&rdquo; &ldquo;eternal,&rdquo; &ldquo;unchanging,&rdquo; or &ldquo;in accordance with natural law.&rdquo; It is a key concept in Daoism, emphasizing the unchanging flow of the Dao.<br /><br />
                不 (bù) – &ldquo;Not&rdquo; or &ldquo;no&rdquo;; frequently used in negations.
            </div>
            <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-teal-700">
                下 (xià) – &ldquo;Low&rdquo; or &ldquo;below&rdquo;; often used metaphorically (e.g., rivers flowing downward).<br /><br />
                知 (zhī) - &ldquo;To know,&rdquo; &ldquo;knowledge,&rdquo; or &ldquo;wisdom,&rdquo; and it plays a crucial role in Daoist philosophy, often in contrast with deeper understanding or intuitive knowing.
            </div>
            <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-teal-700">
                生 (shēng) – &ldquo;Life&rdquo; or &ldquo;to give birth&rdquo;; central to Daoist ideas of nature and existence.<br /><br />
                死 (sǐ) – &ldquo;Death&rdquo;; contrasts with shēng in discussions of the natural cycle.<br /><br />
                道生 (dào shēng) – &ldquo;The Dao gives birth&rdquo;; a recurring phrase about creation.
            </div>
            <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-teal-700">
                天 (tiān) – &ldquo;Heaven&rdquo; or &ldquo;Nature&rdquo;; often represents the cosmic order.<br /><br />
                地 (dì) – &ldquo;Earth&rdquo;; complements tiān in describing the natural world.<br /><br />
                天道 (tiān dào) – &ldquo;The Way of Heaven&rdquo;; a naturalistic concept in Daoism.
            </div>
            <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-teal-700">
                自 (zì) – &ldquo;Self&rdquo; or &ldquo;spontaneity&rdquo;; related to ziran (自然), meaning &ldquo;naturalness.&ldquo;<br /><br />
                圣 (shèng) – &ldquo;Sage&rdquo; or &ldquo;wise person&rdquo;; describes the ideal ruler or enlightened individual.<br /><br />
                王 (wáng) – &ldquo;King&rdquo; or &ldquo;ruler&rdquo;; reflects Daoist political philosophy.<br /><br />
                人 (rén) – &ldquo;Person&rdquo; or &ldquo;human&rdquo;; used in discussions about governance and the sage.<br /><br />
                民 (mín) – &ldquo;People&rdquo;; often mentioned in governance-related passages.
            </div>
            <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-teal-700">
                无 (wú) – &ldquo;Non-being&rdquo; or &ldquo;without&rdquo;; key to the Daoist idea of emptiness and non-attachment.<br /><br />
                有 (yǒu) – &ldquo;Being&rdquo; or &ldquo;existence&rdquo;; often contrasted with wú to express the interplay of opposites.<br /><br />
                为 (wéi) – &ldquo;To act&rdquo; or &ldquo;to do&rdquo;; central to the idea of wu wei (无为, non-action).<br /><br />
                无为 (wú wéi) – &ldquo;Non-action&rdquo; or &ldquo;effortless action&rdquo;; a foundational Daoist principle.<br />
                <a href="ddj_ch_16" rel="noopener noreferrer" className="text-red-800 hover:underline">See notes in Chapter 16.</a>
            </div>
        </div>
      </main>
    </Layout>
  );
};