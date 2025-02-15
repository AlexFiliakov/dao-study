import CharacterCircle from '@/components/CharacterCircle';
import Link from 'next/link';
import { House } from 'lucide-react';
import TaoistButton from '@/components/TaoistButton';

export default function CharacterCirclePage() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Character Relationships in the Silk Manuscript
        </h1>
        <CharacterCircle />
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