'use client';

import { useState, useEffect } from 'react';
import { Undo2, CornerRightDown, CornerRightUp } from 'lucide-react';
import { createPortal } from 'react-dom';
import { HexagramDetails } from '@/types/HexagramTypes';

export default function MutualGuaTree({ 
  hexagramDetails 
}: { 
  hexagramDetails: Record<string, HexagramDetails> 
}) {
  const all_gua_keys = Array.from({ length: 64 }, (_, i) => i + 1);
  const [mutualStack1, setMutualStack1] = useState<Set<string>>(new Set());
  const [mutualStack2, setMutualStack2] = useState<Set<string>>(new Set());
  const [hoveredHexagram, setHoveredHexagram] = useState<string | null>(null);

  useEffect(() => {
    const uniqueMutual1Guas = new Set<string>();
    all_gua_keys.forEach(key => {
      const mutualGua = hexagramDetails[key.toString()].mutual_gua;
      uniqueMutual1Guas.add(mutualGua);
    });
    setMutualStack1(uniqueMutual1Guas);
  }, [hexagramDetails, all_gua_keys]);

  useEffect(() => {
    const uniqueMutual2Guas = new Set<string>();
    mutualStack1.forEach(key => {
      const mutualGua = hexagramDetails[key.toString()].mutual_gua;
      uniqueMutual2Guas.add(mutualGua);
    });
    setMutualStack2(uniqueMutual2Guas);
  }, [hexagramDetails, mutualStack1]);

  // Render tooltip in a portal at the end of <body>, so it never blocks the navigation
  const tooltipContent = hoveredHexagram && hexagramDetails[hoveredHexagram] ? (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mb-2 px-3 py-2 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap z-50"
        onMouseEnter={() => setHoveredHexagram(hoveredHexagram)}
        onMouseLeave={() => setHoveredHexagram(null)}
    >
        <div className="text-center mb-2">{hexagramDetails[hoveredHexagram]?.pronunciation}</div>
        <div className="text-center">{hexagramDetails[hoveredHexagram]?.translation}</div>
        <hr className="w-full border-t border-gray-200 my-4" />
        <div className="flex flex-row justify-center gap-4">
            {hexagramDetails[hoveredHexagram]?.opposite_gua && (
                <div className="text-center bg-gray-800/80 border border-gray-200 p-2 rounded-lg">
                    <h2>Opposite Gua</h2>
                    <div className="text-4xl mb-2">{hexagramDetails[hexagramDetails[hoveredHexagram].opposite_gua]?.hexagram}</div>
                    <div className="text-xl mb-1">{hexagramDetails[hexagramDetails[hoveredHexagram].opposite_gua]?.gua}</div>
                    <div className="text-lg">{hexagramDetails[hexagramDetails[hoveredHexagram].opposite_gua]?.pronunciation}</div>
                    <div className="text-lg">{hexagramDetails[hoveredHexagram].opposite_gua}</div>
                    <div className="mt-4">{hexagramDetails[hexagramDetails[hoveredHexagram].opposite_gua]?.translation}</div>
                </div>
            )}
            {hexagramDetails[hoveredHexagram]?.inverse_gua && (
                <div className="text-center bg-gray-800/80 border border-gray-200 p-2 rounded-lg">
                    <h2>Inverse Gua</h2>
                    <div className="text-4xl mb-2">{hexagramDetails[hexagramDetails[hoveredHexagram].inverse_gua]?.hexagram}</div>
                    <div className="text-xl mb-1">{hexagramDetails[hexagramDetails[hoveredHexagram].inverse_gua]?.gua}</div>
                    <div className="text-lg">{hexagramDetails[hexagramDetails[hoveredHexagram].inverse_gua]?.pronunciation}</div>
                    <div className="text-lg">{hexagramDetails[hoveredHexagram].inverse_gua}</div>
                    <div className="mt-4">{hexagramDetails[hexagramDetails[hoveredHexagram].inverse_gua]?.translation}</div>
                </div>
            )}
            {hexagramDetails[hoveredHexagram]?.mutual_gua && (
                <div className="text-center bg-gray-800/80 border border-gray-200 p-2 rounded-lg">
                    <h2>Mutual Gua</h2>
                    <div className="text-4xl mb-2">{hexagramDetails[hexagramDetails[hoveredHexagram].mutual_gua]?.hexagram}</div>
                    <div className="text-xl mb-1">{hexagramDetails[hexagramDetails[hoveredHexagram].mutual_gua]?.gua}</div>
                    <div className="text-lg">{hexagramDetails[hexagramDetails[hoveredHexagram].mutual_gua]?.pronunciation}</div>
                    <div className="text-lg">{hexagramDetails[hoveredHexagram].mutual_gua}</div>
                    <div className="mt-4">{hexagramDetails[hexagramDetails[hoveredHexagram].mutual_gua]?.translation}</div>
                </div>
            )}
        </div>
    </div>
  ) : null;

  const mutualRecurrence = (mutualGua : string) => {
    switch(mutualGua) {
      case "1":
      case "2":
        return <Undo2 className="text-amber-700" />
      case "63":
        return <CornerRightDown className="text-amber-700" />
      case "64":
        return <CornerRightUp className="text-amber-700" />
      default:
        console.error(`Gua ${mutualGua} is not a level-2 mutual gua.`);
        return null;
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="font-bold">Tree of Mutual Guas</h2>
      <p className="text-center max-w-2xl">
        Each hexagram (white background) is grouped under its mutual gua (amber background).
        These mutual guas themselves are grouped under their own mutual guas (dark amber background),
        showing how hexagrams converge through successive mutual relationships.
      </p>
      <div className="flex flex-col text-center gap-4">
        {Array.from(mutualStack2).map((keyMutual2, index, array) => (
          <>
          <div key={'mutual2-'+keyMutual2+"-parent"}>
            <div className="flex flex-row gap-4 items-center">
              <div key={'mutual2-'+keyMutual2+"-child-container"} className="flex flex-col gap-4">
                {Array.from(mutualStack1).map(keyMutual1 => {
                  if (hexagramDetails[keyMutual1].mutual_gua === keyMutual2) {
                    return (
                      <div key={'mutual-'+keyMutual1+"-parent"} className="flex flex-row rounded bg-amber-100 shadow-md p-2 gap-4">
                        {all_gua_keys.map(key => {
                          if (hexagramDetails[key.toString()].mutual_gua === keyMutual1) {
                            return (
                              <>
                              <div key={'child'+key} className="p-2 border rounded bg-neutral-50"
                                      onMouseEnter={() => setHoveredHexagram(key.toString())}
                                      onMouseLeave={() => setHoveredHexagram(null)}
                                  >
                                  <div className="text-2xl">{hexagramDetails[key.toString()].hexagram}</div>
                                  <div className="text-sm text-gray-600">{key}</div>
                              </div>
                              </>
                            );
                          }
                          return null;
                        })}
                        <div key={'mutual-'+keyMutual1} className="flex flex-col p-2 border rounded bg-amber-400"
                                onMouseEnter={() => setHoveredHexagram(keyMutual1)}
                                onMouseLeave={() => setHoveredHexagram(null)}
                            >
                            <div className="text-2xl">{hexagramDetails[keyMutual1].hexagram}</div>
                            <div className="text-sm text-gray-700">{keyMutual1}</div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              <div 
                className="flex flex-col p-2 border rounded h-fit bg-amber-700 shadow-md"
                onMouseEnter={() => setHoveredHexagram(keyMutual2)}
                onMouseLeave={() => setHoveredHexagram(null)}
              >
                <div className="text-2xl text-amber-100">{hexagramDetails[keyMutual2].hexagram}</div>
                <div className="text-sm text-amber-200">{keyMutual2}</div>
              </div>
              <div className="flex flex-col rounded h-fit">
                {mutualRecurrence(keyMutual2)}
              </div>
            </div>
          </div>
          {index !== array.length - 1 && (
            <hr className="w-full border-t border-gray-200" />
          )}
          </>
        ))}
      </div>

      {/* Render tooltip in a portal */}
      {typeof document !== 'undefined' && createPortal(tooltipContent, document.body)}
    </div>
  );
}
