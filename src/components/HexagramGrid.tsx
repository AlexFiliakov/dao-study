'use client';

import { useState } from 'react';
import { HexagramDetails } from '@/types/HexagramTypes';

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
                    <div className="text-center mb-2">{hexagram?.pronunciation}</div>
                    <div className="text-center">{hexagram?.translation}</div>
                    <hr className="w-full border-t border-gray-200 my-4" />
                    <div className="flex flex-row justify-center gap-4">
                        <div className="text-center bg-gray-800/80 border border-gray-200 p-2 rounded-lg">
                            <h2>Opposite Gua</h2>
                            <div className="text-4xl mb-2">{hexagramDetails[hexagram?.opposite_gua].hexagram}</div>
                            <div className="text-xl mb-1">{hexagramDetails[hexagram?.opposite_gua].gua}</div>
                            <div className="text-lg">{hexagramDetails[hexagram?.opposite_gua].pronunciation}</div>
                            <div className="text-lg">{hexagram?.opposite_gua}</div>
                            <div className="mt-4">{hexagramDetails[hexagram?.opposite_gua].translation}</div>
                        </div>
                        <div className="text-center bg-gray-800/80 border border-gray-200 p-2 rounded-lg">
                            <h2>Inverse Gua</h2>
                            <div className="text-4xl mb-2">{hexagramDetails[hexagram?.inverse_gua].hexagram}</div>
                            <div className="text-xl mb-1">{hexagramDetails[hexagram?.inverse_gua].gua}</div>
                            <div className="text-lg">{hexagramDetails[hexagram?.inverse_gua].pronunciation}</div>
                            <div className="text-lg">{hexagram?.inverse_gua}</div>
                            <div className="mt-4">{hexagramDetails[hexagram?.inverse_gua].translation}</div>
                        </div>
                        <div className="text-center bg-gray-800/80 border border-gray-200 p-2 rounded-lg">
                            <h2>Mutual Gua</h2>
                            <div className="text-4xl mb-2">{hexagramDetails[hexagram?.mutual_gua].hexagram}</div>
                            <div className="text-xl mb-1">{hexagramDetails[hexagram?.mutual_gua].gua}</div>
                            <div className="text-lg">{hexagramDetails[hexagram?.mutual_gua].pronunciation}</div>
                            <div className="text-lg">{hexagram?.mutual_gua}</div>
                            <div className="mt-4">{hexagramDetails[hexagram?.mutual_gua].translation}</div>
                        </div>
                    </div>
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
                  <div className="text-xs text-gray-500">{matchingHexagram && Object.keys(hexagramDetails).find(key => hexagramDetails[key] === matchingHexagram)}</div>
                  {hoveredHexagram === key && matchingHexagram.translation && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap z-10">
                        <div className="text-center mb-2">{matchingHexagram?.pronunciation}</div>
                        <div className="text-center">{matchingHexagram?.translation}</div>
                        <hr className="w-full border-t border-gray-200 my-4" />
                        <div className="flex flex-row justify-center gap-4">
                            <div className="text-center bg-gray-800/80 border border-gray-200 p-2 rounded-lg">
                                <h2>Opposite Gua</h2>
                                <div className="text-4xl mb-2">{hexagramDetails[matchingHexagram?.opposite_gua].hexagram}</div>
                                <div className="text-xl mb-1">{hexagramDetails[matchingHexagram?.opposite_gua].gua}</div>
                                <div className="text-lg">{hexagramDetails[matchingHexagram?.opposite_gua].pronunciation}</div>
                                <div className="text-lg">{matchingHexagram?.opposite_gua}</div>
                                <div className="mt-4">{hexagramDetails[matchingHexagram?.opposite_gua].translation}</div>
                            </div>
                            <div className="text-center bg-gray-800/80 border border-gray-200 p-2 rounded-lg">
                                <h2>Inverse Gua</h2>
                                <div className="text-4xl mb-2">{hexagramDetails[matchingHexagram?.inverse_gua].hexagram}</div>
                                <div className="text-xl mb-1">{hexagramDetails[matchingHexagram?.inverse_gua].gua}</div>
                                <div className="text-lg">{hexagramDetails[matchingHexagram?.inverse_gua].pronunciation}</div>
                                <div className="text-lg">{matchingHexagram?.inverse_gua}</div>
                                <div className="mt-4">{hexagramDetails[matchingHexagram?.inverse_gua].translation}</div>
                            </div>
                            <div className="text-center bg-gray-800/80 border border-gray-200 p-2 rounded-lg">
                                <h2>Mutual Gua</h2>
                                <div className="text-4xl mb-2">{hexagramDetails[matchingHexagram?.mutual_gua].hexagram}</div>
                                <div className="text-xl mb-1">{hexagramDetails[matchingHexagram?.mutual_gua].gua}</div>
                                <div className="text-lg">{hexagramDetails[matchingHexagram?.mutual_gua].pronunciation}</div>
                                <div className="text-lg">{matchingHexagram?.mutual_gua}</div>
                                <div className="mt-4">{hexagramDetails[matchingHexagram?.mutual_gua].translation}</div>
                            </div>
                        </div>
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