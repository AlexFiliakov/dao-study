'use client';

import { useState } from 'react';

interface HexagramDetails {
  hexagram: string;
  gua: string;
  pronunciation: string;
  translation: string;
  upper: string;
  lower: string;
}

export default function HexagramGridNumeric({ 
  hexagramDetails 
}: { 
  hexagramDetails: Record<string, HexagramDetails> 
}) {
  const [hoveredHexagram, setHoveredHexagram] = useState<number | null>(null);
  const rows = Array.from({ length: 8 }, (_, i) => i);
  const cols = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div className="grid grid-cols-8 gap-4">
      {rows.map(row => (
        cols.map(col => {
          const hexagramNumber = row * 8 + col + 1;
          const hexagram = hexagramDetails[hexagramNumber.toString()];
          
          return (
            <div 
              key={hexagramNumber}
              className="aspect-square flex flex-col items-center justify-center p-2 border rounded-lg hover:bg-gray-50 relative"
              onMouseEnter={() => setHoveredHexagram(hexagramNumber)}
              onMouseLeave={() => setHoveredHexagram(null)}
            >
              <div className="text-3xl">{hexagram?.hexagram}</div>
              <div className="text-sm font-medium">{hexagram?.gua}</div>
              <div className="text-xs text-gray-500">{hexagramNumber}</div>
              {hoveredHexagram === hexagramNumber && hexagram?.translation && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap z-10">
                  {hexagram?.translation}
                </div>
              )}
            </div>
          );
        })
      ))}
    </div>
  );
}

export function HexagramGridConstructed({ 
  hexagramDetails 
}: { 
  hexagramDetails: Record<string, HexagramDetails> 
}) {
  const [hoveredHexagram, setHoveredHexagram] = useState<string | null>(null);
  const constructionOrder = "☰☱☲☳☴☵☶☷";

  const findHexagramByTrigrams = (upper: string, lower: string) => {
    return Object.values(hexagramDetails).find(
      hexagram => hexagram.upper === upper && hexagram.lower === lower
    );
  };

  return (
    <div className="grid grid-cols-8 gap-4">
      {constructionOrder.split('').map((lowerGua) =>
        constructionOrder.split('').map((upperGua) => {
          const matchingHexagram = findHexagramByTrigrams(upperGua, lowerGua);
          const key = `${upperGua}-${lowerGua}`;
          
          return (
            <div 
              key={key}
              className="aspect-square flex flex-col items-center justify-center p-2 border rounded-lg hover:bg-gray-50 relative"
              onMouseEnter={() => setHoveredHexagram(key)}
              onMouseLeave={() => setHoveredHexagram(null)}
            >
              {matchingHexagram ? (
                <>
                  <div className="text-3xl">{matchingHexagram.hexagram}</div>
                  <div className="text-sm font-medium">{matchingHexagram.gua}</div>
                  <div className="text-xs text-gray-500">
                    {matchingHexagram.pronunciation}
                  </div>
                  {hoveredHexagram === key && matchingHexagram.translation && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap z-10">
                      {matchingHexagram.translation}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="text-3xl">{upperGua}</div>
                  <div className="text-3xl">{lowerGua}</div>
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}