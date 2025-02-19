import React from 'react';
import { BookOpen, ArrowBigLeft, ArrowBigRight, TableOfContents, SquarePlay } from 'lucide-react';
import Layout from '@/components/Layout';
import TaoistButton from '@/components/TaoistButton';
import HexagramDisplay from '@/components/HexagramDisplay';
import { getHexagramData } from '@/utils/getHexagramData';

export const metadata = {
  title: 'Dao De Jing: Chapter 2 | 道 Dao Study Group',
  description: 'Exploring the wisdom of the Dao De Jing (道德经).',
};

export default async function DDJCh2 () {
  const { hexagramMapping, hexagramDetails } = await getHexagramData();

  return (
    <Layout>
      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="w-full min-h-screen bg-neutral-50 pt-8 font-serif">
            {/* Header Section */}
            <header className="bg-teal-700 text-neutral-50 p-6 rounded-lg shadow-lg">
            <h1 className="text-5xl font-large mb-2 flex justify-between">Dao De Jing<span style={{ textAlign:'right'}}>乾</span></h1>
                <h1 className="text-3xl font-medium mb-2">The Silk Manuscript Version Chapter 2</h1>
                <p className="text-teal-100">帛书版 第二章</p>
            </header>

            <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-teal-700">
              <p className="text-neutral-600">
                天下皆知美之为美也，恶已；<br />
                皆知善，此其不善已。<br />
                When everyone in the world knows beauty as beauty, ugliness arises;<br />
                When everyone knows good as good, evil arises.<br />
                有，无之相生也；<br />
                难，易之相成也。<br />
                Thus, being and non-being give birth to each other;<br />
                difficult and easy compete with each other.<br />
                长，短之相形也；<br />
                高，下之相呈也。<br />
                Long and short contrast each other;<br />
                high and low distinguish each other.<br />
                音，声之相和也；<br />
                先，后之相随也。<br />
                Sound and voice harmonize each other,<br />
                Front and back follow each other.<br />
                是以圣人居无为之事，行不言之教。<br />
                Therefore, the king dwells in inaction activities and practices wordless teaching.<br />
                万物作而弗恃也；为而弗恃也，成而弗居。<br />
                All things arise, and he doesn’t turn away from them;<br />
                he acts but doesn’t boast on his achievements;<br />
                he accomplishes but doesn’t claim credit.<br />
                夫唯弗居也，是以弗去也。<br />
                It is precisely because he does not claim credit, that his people never leave him.
              </p>
            </div>

            <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-red-800">
              <div className="flex items-center mb-4">
                <SquarePlay className="text-red-800 mr-3" />
                <h2 className="text-xl text-neutral-800">Video Lecture</h2>
              </div>
              <p className="text-neutral-600">
              <a 
              href="http://xhslink.com/a/XaficQbOc1Q5"
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
              See the related Taoist parable:&nbsp;
              <a 
              href="https://en.wikipedia.org/wiki/The_old_man_lost_his_horse"
              rel="noopener noreferrer"
              className="text-red-800 hover:underline"
              >
                Sai Weng Loses His Horse
              </a>.<br /><br />
              <HexagramDisplay 
                chapterNumber={2} 
                hexagramMapping={hexagramMapping} 
                hexagramDetails={hexagramDetails} 
              />
            </p>
          </div>

          {/* Follow-up Section */}
          <div className="mt-8 bg-amber-700 text-neutral-50 p-8 rounded-lg">
            <div className="flex items-center mb-4">
                <h2 className="text-xl">Questions:</h2>
            </div>
            <ol style={{listStyleType: "decimal"}}>
                <li>What’s the difference between Laozi’s dialectical thinking and the Western mainstream thought?</li>
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