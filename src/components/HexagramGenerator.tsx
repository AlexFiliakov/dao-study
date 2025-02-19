'use client';

import React, { useState } from 'react';
import TaoistButton from '@/components/TaoistButton';

interface HexagramDetails {
  hexagram: string;
  gua: string;
  pronunciation: string;
  translation: string;
  opposite_gua: string;
  inverse_gua: string;
  mutual_gua: string;
}

interface HexagramGeneratorProps {
  hexagramDetails: Record<string, HexagramDetails>;
}

export default function HexagramGenerator({ hexagramDetails }: HexagramGeneratorProps) {
  const [selectedHexagram, setSelectedHexagram] = useState<HexagramDetails | null>(null);

  const generateHexagram = () => {
    // Use current timestamp as seed
    const seed = Date.now();
    const rng = () => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    
    const randomNumber = Math.floor(rng() * 64) + 1;
    const hexagram = hexagramDetails[randomNumber.toString()];
    setSelectedHexagram(hexagram);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <TaoistButton variant="accent" onClick={generateHexagram}>
        Generate Hexagram
      </TaoistButton>
      
      {selectedHexagram && (
        <>
        <div className="text-center">
            <div className="text-4xl mb-2">{selectedHexagram.hexagram}</div>
            <div className="text-xl mb-1">{selectedHexagram.gua}</div>
            <div className="text-lg text-gray-600">{selectedHexagram.pronunciation}</div>
            <div className="mt-4 text-gray-800">{selectedHexagram.translation}</div>
        </div>
        <hr className="w-full border-t border-gray-200" />
        <div className="flex flex-row justify-center gap-4">
            <div className="text-center bg-gray-100 p-2 rounded-lg">
                <h2>Opposite Gua</h2>
                <div className="text-4xl mb-2">{hexagramDetails[selectedHexagram.opposite_gua].hexagram}</div>
                <div className="text-xl mb-1">{hexagramDetails[selectedHexagram.opposite_gua].gua}</div>
                <div className="text-lg text-gray-600">{hexagramDetails[selectedHexagram.opposite_gua].pronunciation}</div>
                <div className="mt-4 text-gray-800">{hexagramDetails[selectedHexagram.opposite_gua].translation}</div>
            </div>
            <div className="text-center bg-gray-100 p-2 rounded-lg">
                <h2>Inverse Gua</h2>
                <div className="text-4xl mb-2">{hexagramDetails[selectedHexagram.inverse_gua].hexagram}</div>
                <div className="text-xl mb-1">{hexagramDetails[selectedHexagram.inverse_gua].gua}</div>
                <div className="text-lg text-gray-600">{hexagramDetails[selectedHexagram.inverse_gua].pronunciation}</div>
                <div className="mt-4 text-gray-800">{hexagramDetails[selectedHexagram.inverse_gua].translation}</div>
            </div>
            <div className="text-center bg-gray-100 p-2 rounded-lg">
                <h2>Mutual Gua</h2>
                <div className="text-4xl mb-2">{hexagramDetails[selectedHexagram.mutual_gua].hexagram}</div>
                <div className="text-xl mb-1">{hexagramDetails[selectedHexagram.mutual_gua].gua}</div>
                <div className="text-lg text-gray-600">{hexagramDetails[selectedHexagram.mutual_gua].pronunciation}</div>
                <div className="mt-4 text-gray-800">{hexagramDetails[selectedHexagram.mutual_gua].translation}</div>
            </div>
        </div>
        </>
      )}
    </div>
  );
}