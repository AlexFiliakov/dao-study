import React from 'react';
import { BookOpen, UsersRound } from 'lucide-react';
import Layout from '@/components/Layout';
import { colors } from '@/constants/colors';  // Import colors from constants
import Image from 'next/image';

export const metadata = {
  title: '道 Dao Study Group',
  description: 'Exploring the wisdom of the Dao De Jing (道德经).',
};

export default function HomePage () {
  return (
    <Layout>
      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Image */}
          <div className="relative w-full aspect-[4096/2624] rounded-lg overflow-hidden">
            <Image
              src="/images/temple main upscaled.png"
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
            <h1 className="text-3xl font-medium mb-2">道 Dao Study Group</h1>
            <p className="text-teal-100">Exploring the wisdom of the Dao De Jing (道德经)</p>
          </header>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-md border-l-4 border-teal-700">
            <div className="flex items-center mb-4">
              <BookOpen className="text-teal-700 mr-3" />
              <h2 className="text-xl text-neutral-800">Which version of Dao De Jing should you read?</h2>
            </div>
            <p className="text-neutral-600">
            <a 
              href="http://xhslink.com/a/gSeMaboVgRW4"
              rel="noopener noreferrer"
              className="text-red-800 hover:underline"
            >
              Watch this video to find out.
            </a>
            </p>
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-md border-l-4 border-red-800">
            <div className="flex items-center mb-4">
              <UsersRound className="text-red-800 mr-3" />
              <h2 className="text-xl text-neutral-800">Want to join our reading group?</h2>
            </div>
            <p className="text-neutral-600">
            You’re welcome to join our online discussion group and attend regular meetings.<br />
            <a 
              href="https://www.xiaohongshu.com/user/profile/56d679e284edcd74c7a5b3ea?xsec_token=YBG_D8LT9e1_o7_C414m3_XaL3SdpvFZSrH9yZn-anoP4=&xsec_source=app_share&xhsshare=CopyLink&appuid=678b3543000000000a03d01c&apptime=1738414009&share_id=8559959d05a242f9b0b8de56aedece49"
              rel="noopener noreferrer"
              className="text-red-800 hover:underline"
            >
              Contact @Bella.小道 on Red Note for more information.
            </a>
            </p>
          </div>

          {/* Quote Section */}
          <div className="mt-8 bg-amber-700 text-neutral-50 p-8 rounded-lg">
            <blockquote className="text-xl italic">
            玄之又玄，众眇之门。<br />
              Mystery with mystery, the gateway to all understanding.
            </blockquote>
            <p className="mt-4 text-neutral-50">- Dao De Jing, Chapter 1</p>
          </div>

        </div>
      </main>
    </Layout>
  );
};