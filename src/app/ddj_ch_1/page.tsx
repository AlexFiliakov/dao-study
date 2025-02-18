import React from 'react';
import { BookOpen, ArrowBigLeft, ArrowBigRight, TableOfContents, SquarePlay } from 'lucide-react';
import Layout from '@/components/Layout';
import TaoistButton from '@/components/TaoistButton';
import Link from 'next/link';

export const metadata = {
  title: 'Dao De Jing: Chapter 1 | 道 Dao Study Group',
  description: 'Exploring the wisdom of the Dao De Jing (道德经).',
};

export default function DDJCh1 () {
  return (
    <Layout>
      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="w-full min-h-screen bg-neutral-50 pt-8 font-serif">
            {/* Header Section */}
            <header className="bg-teal-700 text-neutral-50 p-6 rounded-lg shadow-lg">
            <h1 className="text-5xl font-large mb-2 flex justify-between">Dao De Jing<span style={{ textAlign:'right'}}>屯</span></h1>
                <h1 className="text-3xl font-medium mb-2">The Silk Manuscript Version Chapter 1</h1>
                <p className="text-teal-100">帛书版 第一章</p>
            </header>

            <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-teal-700">
              <p className="text-neutral-600">
                道，可道也，非恒道也；<br />
                The divine law that can be told is not the eternal law;<br />
                名，可名也，非恒名也。<br />
                The name that can be named is not the eternal name.<br />
                无，名万物之始也，<br />
                wu, is the origin of all creations,<br />
                有，名万物之母也。<br />
                you, is the mother of all creations.<br />
                故恒无欲也，以观其眇。<br />
                Free from desire/expectation, you realize the mystery.<br />
                恒有欲也，以观其所噭。<br />
                Caught in desire, you see only the manifestions.<br />
                两者同出，异名同谓。<br />
                Yet mystery and manifestions, arise from the same source,<br />
                but have different names.<br />
                玄之又玄，众眇之门。<br />
                Mystery with mystery, the gateway to all understanding.
              </p>
            </div>

            <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-red-800">
              <div className="flex items-center mb-4">
                <SquarePlay className="text-red-800 mr-3" />
                <h2 className="text-xl text-neutral-800">Video Lecture</h2>
              </div>
              <p className="text-neutral-600">
              <a 
              href="http://xhslink.com/a/nHcgd7294Ca5"
              rel="noopener noreferrer"
              className="text-red-800 hover:underline"
              >
                Click here to watch the talk.
              </a>
              </p>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-md border-l-4 border-teal-700">
            <div className="flex items-center mb-4">
              <BookOpen className="text-teal-700 mr-3" />
              <h2 className="text-xl text-neutral-800">Additional Notes</h2>
            </div>
            <p className="text-neutral-600">
              恒 is used in the Mawangdui silk manuscript, while 常 is used in the standard text. 
              The story behind is that there was an emperor called 刘恒. 
              His name couldn’t be spoken of or written down, so every 恒 in a text was changed to another word.<br /><br />
              Chapter 1 relates to the I Ching hexagram 3, ䷂, 屯 (zhūn or tun), which means &ldquo;accumulating,&rdquo; &ldquo;beginning,&rdquo; or &ldquo;sprouting.&rdquo;
            </p>
          </div>

          {/* Follow-up Section */}
          <div className="mt-8 bg-amber-700 text-neutral-50 p-8 rounded-lg">
            <div className="flex items-center mb-4">
                <h2 className="text-xl">Questions:</h2>
            </div>
            <ol style={{listStyleType: "decimal"}}>
                <li>What’s your understanding of ‘free from desire’? Do you have a related story?</li>
                <li>Have you ever found any treasure when you least expected it?</li>
            </ol>
          </div>

          <div className="mt-8 flex justify-center space-x-4 items-center">
            <Link href="/" passHref>
              <TaoistButton variant="primary">
              <ArrowBigLeft className="w-5 h-5" />
                Home
              </TaoistButton>
            </Link>
            <a href="/ddj_index" rel="noopener noreferrer">
              <TaoistButton variant="primary">
                <TableOfContents className="w-5 h-5" />
                Index
              </TaoistButton>
            </a>
            <a href="/ddj_ch_2" rel="noopener noreferrer">
              <TaoistButton variant="primary">
                Chapter 2
                <ArrowBigRight className="w-5 h-5" />
              </TaoistButton>
            </a>
          </div>
        </div>
      </main>
    </Layout>
  );
};