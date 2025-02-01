import React from 'react';
import { Scroll, BookOpen, Coffee } from 'lucide-react';

const TaoistThemeDemo = () => {
  return (
    <div className="w-full min-h-screen bg-neutral-50 p-8 font-serif">
      {/* Header Section */}
      <header className="bg-teal-700 text-neutral-50 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-medium mb-2">Tao Study Group</h1>
        <p className="text-teal-100">Exploring the wisdom of the Tao Te Ching</p>
      </header>

      {/* Main Content Section */}
      <main className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Feature Cards */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-800">
          <div className="flex items-center mb-4">
            <Scroll className="text-red-800 mr-3" />
            <h2 className="text-xl text-neutral-800">Weekly Readings</h2>
          </div>
          <p className="text-neutral-600">
            Join us as we explore the ancient wisdom of the Tao Te Ching through weekly guided readings and discussions.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-teal-700">
          <div className="flex items-center mb-4">
            <BookOpen className="text-teal-700 mr-3" />
            <h2 className="text-xl text-neutral-800">Study Materials</h2>
          </div>
          <p className="text-neutral-600">
            Access our curated collection of translations, commentaries, and supplementary resources.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-700">
          <div className="flex items-center mb-4">
            <Coffee className="text-green-700 mr-3" />
            <h2 className="text-xl text-neutral-800">Tea & Discussion</h2>
          </div>
          <p className="text-neutral-600">
            Monthly gatherings for tea ceremony and open discussions about Taoist philosophy.
          </p>
        </div>
      </main>

      {/* Quote Section */}
      <div className="mt-8 bg-neutral-800 text-neutral-50 p-8 rounded-lg">
        <blockquote className="text-xl italic">
          "The Tao that can be told is not the eternal Tao.
          The name that can be named is not the eternal name."
        </blockquote>
        <p className="mt-4 text-neutral-400">- Tao Te Ching, Chapter 1</p>
      </div>

      {/* Color Palette Demo */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Theme Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-teal-700 rounded-lg shadow-md"></div>
            <span className="mt-2 text-sm">Primary Teal</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-red-800 rounded-lg shadow-md"></div>
            <span className="mt-2 text-sm">Accent Red</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-green-700 rounded-lg shadow-md"></div>
            <span className="mt-2 text-sm">Nature Green</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-amber-700 rounded-lg shadow-md"></div>
            <span className="mt-2 text-sm">Wisdom Gold</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-neutral-50 rounded-lg shadow-md border"></div>
            <span className="mt-2 text-sm">Background</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-neutral-800 rounded-lg shadow-md"></div>
            <span className="mt-2 text-sm">Dark Gray</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaoistThemeDemo;