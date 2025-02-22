'use client';

import { useState, useEffect, createRef } from 'react';
import { Undo2, CornerRightDown, CornerRightUp, Save } from 'lucide-react';
import { createPortal } from 'react-dom';
import { HexagramDetails } from '@/types/HexagramTypes';
// html-to-image
import { toPng } from 'html-to-image';

export default function MutualGuas({ 
  hexagramDetails 
}: { 
  hexagramDetails: Record<string, HexagramDetails> 
}) {
  const all_gua_keys = Array.from({ length: 64 }, (_, i) => i + 1);
  const all_gua_in_mutual_order = Array.from('"34", "50", "30", "55", "56", "62", "2", "23", "24", "27", "3", "8", "20", "42", "4", "7", "19", "41", "29", "59", "60", "61", "5", "9", "48", "57", "11", "18", "26", "46", "15", "22", "36", "52", "37", "39", "53", "63", "6", "10", "47", "58", "12", "17", "25", "45", "16", "21", "35", "51", "38", "40", "54", "64", "1", "28", "43", "44", "13", "31", "33", "49", "14", "32"'.replaceAll("\"", "").split(", "));
  const all_mutual_gua_in_second_order = Array.from('"43", "28", "2", "23", "24", "27", "38", "54", "40", "64", "37", "53", "39", "63", "1", "44"'.replaceAll("\"", "").split(", "));
  const [mutualStack1, setMutualStack1] = useState<Set<string>>(new Set());
  const [mutualStack2, setMutualStack2] = useState<Set<string>>(new Set());
  const [hoveredHexagram, setHoveredHexagram] = useState<string | null>(null);
  const [mutualRefs, setMutualRefs] = useState<Record<string, React.RefObject<HTMLDivElement | null>>>({});

  useEffect(() => {
    const newRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {};
    mutualStack2.forEach((key) => {
      newRefs[key] = createRef<HTMLDivElement>();
    });
    newRefs["mutualGuaRef"] = createRef<HTMLDivElement>();
    newRefs["gua_circle"] = createRef<HTMLDivElement>();
    setMutualRefs(newRefs);
  }, [mutualStack2]);

  useEffect(() => {
    const uniqueMutual1Guas = new Set<string>();
    all_gua_keys.forEach(key => {
      const mutualGua = hexagramDetails[key.toString()].mutual_gua;
      if (mutualGua) {
        uniqueMutual1Guas.add(mutualGua);
      }
    });
    setMutualStack1(uniqueMutual1Guas);
  }, [hexagramDetails, all_gua_keys]);

  useEffect(() => {
    const uniqueMutual2Guas = new Set<string>();
    mutualStack1.forEach(key => {
      const mutualGua = hexagramDetails[key.toString()].mutual_gua;
      if (mutualGua) {
        uniqueMutual2Guas.add(mutualGua);
      }
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

  const saveAsPng = async (refKey: string, fileName: string) => {
    if (mutualRefs[refKey].current) {
      try {
        const element = mutualRefs[refKey].current;
        if (element) {
          const pngDataUrl = await toPng(element);
          const downloadLink = document.createElement('a');
          downloadLink.href = pngDataUrl;
          downloadLink.download = fileName;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        }
      } catch (error) {
        console.error('Error saving image:', error);
      }
    }
  };

  const parseMeaning = (translation : string) => {
    return translation.split(",")[0].replaceAll("\"", "").replaceAll(".", "");
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="font-bold">About Mutual Guas</h2>
      <p className="text-center max-w-2xl">
        A mutual gua is formed by the mutual intersections of the second, third, fourth, and fifth lines. 
        The ancient sages considered these four lines to be the heart of any six-line gua. 
        A mutual gua is formed by two trigrams. 
        The second, third, and fourth lines of the original gua form the lower, or inner, mutual gua. 
        The third, fourth, and fifth lines form the upper, or outer, mutual gua. 
        Put the lower mutual gua and the upper mutual gua together and a six-line mutual gua is obtained.
      </p>
      <h2 className="font-bold">Construction Example</h2>
      <p className="text-center max-w-2xl">
        For example, let's see the mutual gua formed from Hexagram 39 (Jian or "hardship"):
      </p>
      <div className="flex flex-row text-align-center gap-4 items-center text-lg" ref={mutualRefs['mutualGuaRef']}>
        <svg width="48" height="72" viewBox="0 0 48 72">
          <line x1="4" y1="6" x2="20" y2="6" stroke="#6b7280" stroke-width="4" />
          <line x1="28" y1="6" x2="44" y2="6" stroke="#6b7280" stroke-width="4" />
          <line x1="4" y1="18" x2="44" y2="18" stroke="#991b1b" stroke-width="4" />
          <line x1="4" y1="30" x2="20" y2="30" stroke="#6b21a8" stroke-width="4" />
          <line x1="28" y1="30" x2="44" y2="30" stroke="#6b21a8" stroke-width="4" />
          <line x1="4" y1="42" x2="44" y2="42" stroke="#d97706" stroke-width="4" />
          <line x1="4" y1="56" x2="20" y2="56" stroke="#0d9488" stroke-width="4" />
          <line x1="28" y1="56" x2="44" y2="56" stroke="#0d9488" stroke-width="4" />
          <line x1="4" y1="68" x2="20" y2="68" stroke="#6b7280" stroke-width="4" />
          <line x1="28" y1="68" x2="44" y2="68" stroke="#6b7280" stroke-width="4" />
        </svg>
        <div>→</div>
        <svg width="48" height="72" viewBox="0 0 48 72">
          <line x1="4" y1="6" x2="44" y2="6" stroke="#991b1b" stroke-width="4" />
          <line x1="4" y1="18" x2="20" y2="18" stroke="#6b21a8" stroke-width="4" />
          <line x1="28" y1="18" x2="44" y2="18" stroke="#6b21a8" stroke-width="4" />
          <line x1="4" y1="30" x2="44" y2="30" stroke="#d97706" stroke-width="4" />
          <line x1="4" y1="42" x2="20" y2="42" stroke="#6b21a8" stroke-width="4" />
          <line x1="28" y1="42" x2="44" y2="42" stroke="#6b21a8" stroke-width="4" />
          <line x1="4" y1="56" x2="44" y2="56" stroke="#d97706" stroke-width="4" />
          <line x1="4" y1="68" x2="20" y2="68" stroke="#0d9488" stroke-width="4" />
          <line x1="28" y1="68" x2="44" y2="68" stroke="#0d9488" stroke-width="4" />
        </svg>
      </div>
      <p className="text-center max-w-2xl">
        As shown above, the mutual gua for Hexagram 39 is Hexagram 64 (Wei Ji or "before completion").
      </p>
      <button onClick={() => saveAsPng('mutualGuaRef', 'mutual_gua_example.png')} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hidden">
        Save Mutual Gua Example as PNG
      </button>
      <hr className="w-full border-t border-gray-200" />
      <h2 className="font-bold">Tree of Mutual Guas</h2>
      <p className="text-center max-w-2xl">
        Each hexagram (white background) is grouped under its mutual gua (amber background).
        These mutual guas themselves are grouped under their own mutual guas (dark amber background),
        showing how hexagrams converge through successive mutual relationships. 
        Arrows on the right indicate final recursive relationships (guas 1 and 2 are their own mutual guas, 
        while guas 63 and 64 are each other's mutual guas).
      </p>
      <div className="flex flex-col text-center gap-4">
        {Array.from(mutualStack2).map(keyMutual2 => (
          <div key={'mutual2-'+keyMutual2+"-parent"}>
            <div 
              ref={mutualRefs[keyMutual2]}
              className="flex flex-row gap-4 items-center rounded-xl border border-gray-200 bg-white shadow-md p-4"
            >
              <div key={'mutual2-'+keyMutual2+"-child-container"} className="flex flex-col gap-4 w-full">
                {Array.from(mutualStack1).map(keyMutual1 => {
                  if (hexagramDetails[keyMutual1].mutual_gua === keyMutual2) {
                    return (
                      <div key={'mutual-'+keyMutual1+"-parent"} className="flex flex-row rounded-lg border border-amber-200 bg-amber-100 shadow-md p-2 gap-4">
                        {all_gua_keys.map(key => {
                          if (hexagramDetails[key.toString()].mutual_gua === keyMutual1) {
                            return (
                              <>
                                <div key={'child'+key} className="p-2 border rounded bg-neutral-50 w-full"
                                  onMouseEnter={() => setHoveredHexagram(key.toString())}
                                  onMouseLeave={() => setHoveredHexagram(null)}
                                >
                                  <div className="text-6xl">{hexagramDetails[key.toString()].hexagram}</div>
                                  <div className="text-sm text-gray-600">{key}</div>
                                  <div className="text-xs text-gray-600">{parseMeaning(hexagramDetails[key.toString()].translation)}</div>
                                </div>
                              </>
                            );
                          }
                          return null;
                        })}
                        <div key={'mutual-'+keyMutual1} className="flex flex-col p-2 border border-amber-500 rounded bg-amber-400 w-full"
                                onMouseEnter={() => setHoveredHexagram(keyMutual1)}
                                onMouseLeave={() => setHoveredHexagram(null)}
                            >
                            <div className="text-6xl text-amber-950">{hexagramDetails[keyMutual1].hexagram}</div>
                            <div className="text-sm text-amber-800">{keyMutual1}</div>
                            <div className="text-xs text-amber-800">{parseMeaning(hexagramDetails[keyMutual1].translation)}</div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
              <div 
                className="flex flex-col p-2 border border-amber-800 rounded h-fit bg-amber-700 max-w[130px]"
                onMouseEnter={() => setHoveredHexagram(keyMutual2)}
                onMouseLeave={() => setHoveredHexagram(null)}
              >
                <div className="text-6xl text-amber-100">{hexagramDetails[keyMutual2].hexagram}</div>
                <div className="text-sm text-amber-200">{keyMutual2}</div>
                <div className="text-xs text-amber-200">{parseMeaning(hexagramDetails[keyMutual2].translation)}</div>
              </div>
              <div className="flex flex-col rounded h-fit">
                {mutualRecurrence(keyMutual2)}
              </div>
            </div>
            <button 
              onClick={() => saveAsPng(keyMutual2, `mutual_gua_${keyMutual2}.png`)}
              className="mt-2 mb-4 text-teal-100 hover:text-teal-50 bg-teal-700 hover:bg-teal-500 py-2 px-4 flex rounded items-center leading-none"
            >
              <Save className="inline mr-2" />Save Gua {keyMutual2} Group as PNG
            </button>
          </div>
        ))}
      </div>

      <hr className="w-full border-t border-gray-200" />
      <h2 className="font-bold">Gua Circle</h2>
      <p className="text-center max-w-2xl">
        The Gua Circle shows the mutual relationships between the 64 hexagrams. 
        Each hexagram is connected to its mutual gua. 
        The mutual guas are then connected to their mutual guas, 
        forming a circular structure that demonstrates the recursive nature of the mutual guas.
      </p>
      <div id="gua-circle-container" className="w-full flex justify-center bg-white" ref={mutualRefs["gua_circle"]}>
        <div className="relative w-[min(900px,95vw)] h-[min(900px,95vw)] mx-auto origin-center">
          {/* Cross lines */}
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-300 z-10 shadow-none"></div>
          <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gray-300 z-10 shadow-none"></div>

          {/* All Hexagrams */}
          {all_gua_in_mutual_order.map((key, i) => {
            const angle = (2 * Math.PI * (i + 0.5)) / 64 + Math.PI / mutualStack1.size - Math.PI * 3 / 4;
            const radiusPercent = 430.0 / 900.0 * 100;
            const x = `${radiusPercent * Math.cos(angle) - 8.0/9.0}%`; // added an offset correction of 8/9
            const y = `${radiusPercent * Math.sin(angle) - 16.0/9.0}%`;
            return (
              <div
                key={key}
                className="absolute text-xs text-center"
                style={{
                  left: `calc(50% + ${x})`,
                  top: `calc(50% + ${y})`,
                  transform: 'translate(-50%, -50%) scale(min(1, calc(95vw/900px)))'
                }}
                onMouseEnter={() => setHoveredHexagram(key)}
                onMouseLeave={() => setHoveredHexagram(null)}
              >
                <div id={"gua"+{key}} className="leading-tight">
                  <div className="text-lg leading-none mb-0.5">{hexagramDetails[key].hexagram}</div>
                  <div className="text-gray-500 leading-none">{key}</div>
                </div>
              </div>
            );
          })}

          {/* Mutual Guas */}
          {all_mutual_gua_in_second_order.map((key, i) => {
            const angle = (2 * Math.PI * (i + 0.5)) / mutualStack1.size - Math.PI * 3 / 4;
            const radiusPercent = 300.0 / 900.0 * 100;
            const x = `${radiusPercent * Math.cos(angle) - 20.0/9.0}%`;
            const y = `${radiusPercent * Math.sin(angle) - 35.0/9.0}%`;

            return (
              <div
                key={key}
                className="absolute text-xs text-center"
                style={{
                  left: `calc(50% + ${x})`,
                  top: `calc(50% + ${y})`,
                  transform: 'translate(-50%, -50%) scale(min(1, calc(95vw/900px)))'
                }}
                onMouseEnter={() => setHoveredHexagram(key)}
                onMouseLeave={() => setHoveredHexagram(null)}
              >
                <div className="flex flex-col p-2 border border-amber-500 rounded bg-amber-400">
                  <div className="text-2xl text-amber-950 leading-none">{hexagramDetails[key].hexagram}</div>
                  <div className="text-xl text-amber-800">{key}</div>
                </div>
              </div>
            );
          })}

          {/* Second Mutual Guas */}
          {Array.from(mutualStack2).map((key, i) => {
            const angle = (2 * Math.PI * i) / mutualStack2.size - Math.PI * 3 / 4;
            const radiusPercent = 125.0 / 900.0 * 100;
            const x = `${radiusPercent * Math.cos(angle) - 36.0/9.0}%`;
            const y = `${radiusPercent * Math.sin(angle) - 59.0/9.0}%`;

            return (
              <div
                key={key}
                className="absolute text-xs text-center"
                style={{
                  left: `calc(50% + ${x})`,
                  top: `calc(50% + ${y})`,
                  transform: 'translate(-50%, -50%) scale(min(1, calc(95vw/900px)))'
                }}
                onMouseEnter={() => setHoveredHexagram(key)}
                onMouseLeave={() => setHoveredHexagram(null)}
              >
                <div className="flex flex-col p-2 border border-amber-800 rounded h-fit bg-amber-700">
                  <div className="text-6xl text-amber-100">{hexagramDetails[key].hexagram}</div>
                  <div className="text-4xl text-amber-200">{key}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button onClick={() => saveAsPng("gua_circle", "mutual_gua_circle.png")}
        className="mt-2 mb-4 text-teal-100 hover:text-teal-50 bg-teal-700 hover:bg-teal-500 py-2 px-4 rounded flex items-center leading-none"
      >
        <Save className="inline mr-2" />Save Diagram as PNG
      </button>

      {/* Render tooltip in a portal */}
      {typeof document !== 'undefined' && createPortal(tooltipContent, document.body)}
    </div>
  );
}
