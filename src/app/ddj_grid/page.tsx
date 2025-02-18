import CharacterGrid from '@/components/CharacterGrid';
import Link from 'next/link';
import { House } from 'lucide-react';
import Image from 'next/image';
import TaoistButton from '@/components/TaoistButton';

export const metadata = {
  title: 'Dao De Jing Character Visualization | 道 Dao Study Group',
  description: 'Exploring the wisdom of the Dao De Jing (道德经) one character and sentence at a time.',
};

export default function CharacterCirclePage() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
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
      <div className="max-w-6xl mx-auto font-serif">
        {/* Header Section */}
        <header className="bg-teal-700 text-neutral-50 my-6 p-6 rounded-lg shadow-lg">
            <h1 className="text-5xl font-large mb-2 flex justify-between">Dao De Jing</h1>
            <h1 className="text-3xl font-medium mb-2">Character Relationships in the Silk Manuscript</h1>
            <p className="text-teal-100">道德经</p>
        </header>
        <CharacterGrid />
        <div className="mt-6 flex justify-center space-x-4 items-center">
          <Link href="/">
            <TaoistButton variant="primary">
              <House className="w-5 h-5" />
              Return Home
            </TaoistButton>
          </Link>
        </div>
      </div>
    </main>
  );
}