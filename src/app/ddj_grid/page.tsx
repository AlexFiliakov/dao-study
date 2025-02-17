import CharacterGrid from '@/components/CharacterGrid';
import Link from 'next/link';
import { House } from 'lucide-react';
import TaoistButton from '@/components/TaoistButton';

export const metadata = {
  title: 'Dao De Jing Character Visualization | 道 Dao Study Group',
  description: 'Exploring the wisdom of the Dao De Jing (道德经) one character and sentence at a time.',
};

export default function CharacterCirclePage() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto font-serif">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Character Relationships in the Silk Manuscript
        </h1>
        <CharacterGrid />
        <div className="mt-8 flex justify-center space-x-4 items-center">
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