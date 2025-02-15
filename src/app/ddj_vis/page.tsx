import CharacterCircle from '@/components/CharacterCircle';
import Link from 'next/link';
import { House } from 'lucide-react';

export default function CharacterCirclePage() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Character Relationships in the Silk Manuscript
        </h1>
        <CharacterCircle />
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md border-l-4 border-teal-700">
          <Link href="/" className="flex items-center">
            <House className="text-teal-700 mr-3" />
            <h2 className="text-xl text-teal-700 hover:underline">Return Home</h2>
          </Link>
        </div>
      </div>
    </main>
  );
}