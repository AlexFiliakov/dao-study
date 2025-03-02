'use client'

import { useState } from 'react';
import { HexagramDetails } from '@/types/HexagramTypes';

export default function ApproachedGuas({ 
  hexagramDetails 
}: { 
  hexagramDetails: Record<string, HexagramDetails> 
}) {
  const [selectedHexagram, setSelectedHexagram] = useState<string>("1");
  const [hoveredHexagram, setHoveredHexagram] = useState<string | null>(null);

  const drawHexagramGlyph = (hexagramKey: string) => {
    return (
      <div
        onMouseEnter={() => setHoveredHexagram(hexagramKey)}
        onMouseLeave={() => setHoveredHexagram(null)}
        key={`glyph-${hexagramKey}`}
      >
        <svg width="24" height="24" viewBox="0 0 25 25">
          {/* Base layer: non-selected characters */}
          <g className="base-characters">
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="white"
              stroke="#3d847c"
              strokeWidth="2"
            />
            <text
              x="12"
              y="14"
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="14"
              fontWeight="normal"
              className="select-none pointer-events-none"
            >
              {hexagramDetails[hexagramKey].hexagram}
            </text>
          </g>
        </svg>
      </div>
    );
  };

  const drawOneLineChange = (hexagramKey: string) => {
    return (
      hexagramDetails[hexagramKey].binary.split("").map((_, i) => {
        let approachedGua = hexagramDetails[hexagramKey].binary
        approachedGua = approachedGua.substring(0, i) + (approachedGua[i] === "1" ? "0" : "1") + approachedGua.substring(i + 1);
        const approachedGuaKey = Object.keys(hexagramDetails).find(key => hexagramDetails[key].binary === approachedGua);
        return approachedGuaKey ? (
          <div key={`one-line-${hexagramKey}-${i}-${approachedGuaKey}`}>
            {drawHexagramGlyph(approachedGuaKey)}
          </div>
        ) : null;
      })
    );
  };

  const drawTwoLineChange = (hexagramKey: string) => {
    // Create a more efficient implementation
    const twoLineChanges = [];
    
    // Loop through all possible pairs of positions
    for (let i = 0; i < 5; i++) {
      for (let j = i + 1; j < 6; j++) {
        // Create a copy of the binary string
        const approachedGua = hexagramDetails[hexagramKey].binary.split('');
        
        // Flip the two bits at positions i and j
        approachedGua[i] = approachedGua[i] === '1' ? '0' : '1';
        approachedGua[j] = approachedGua[j] === '1' ? '0' : '1';
        
        // Join back to string
        const approachedGuaStr = approachedGua.join('');
        
        // Find the corresponding hexagram key
        const approachedGuaKey = Object.keys(hexagramDetails).find(
          key => hexagramDetails[key].binary === approachedGuaStr
        );
        
        // If found, add to the result
        if (approachedGuaKey) {
          twoLineChanges.push(
            <div key={`two-line-${hexagramKey}-${i}-${j}-${approachedGuaKey}`}>
              {drawHexagramGlyph(approachedGuaKey)}
            </div>
          );
        }
      }
    }
    
    return (
      <>
        <div className="flex flex-row gap-2 flex-wrap">
          {twoLineChanges.slice(0, 7)}
        </div>
        <div className="flex flex-row gap-2 flex-wrap">
          {twoLineChanges.slice(7)}
        </div>
      </>
    );
  };
  
  const drawThreeLineChange = (hexagramKey: string) => {
    // Create a more efficient implementation
    const threeLineChanges = [];
    
    // Loop through all possible pairs of positions
    for (let i = 0; i < 4; i++) {
      for (let j = i + 1; j < 5; j++) {
        for (let k = j + 1; k < 6; k++) {
          // Create a copy of the binary string
          const approachedGua = hexagramDetails[hexagramKey].binary.split('');
          
          // Flip the two bits at positions i and j
          approachedGua[i] = approachedGua[i] === '1' ? '0' : '1';
          approachedGua[j] = approachedGua[j] === '1' ? '0' : '1';
          approachedGua[k] = approachedGua[k] === '1' ? '0' : '1';
          
          // Join back to string
          const approachedGuaStr = approachedGua.join('');
          
          // Find the corresponding hexagram key
          const approachedGuaKey = Object.keys(hexagramDetails).find(
            key => hexagramDetails[key].binary === approachedGuaStr
          );
          
          // If found, add to the result
          if (approachedGuaKey) {
            threeLineChanges.push(
              <div key={`two-line-${hexagramKey}-${i}-${j}-${k}-${approachedGuaKey}`}>
                {drawHexagramGlyph(approachedGuaKey)}
              </div>
            );
          }
        }
      }
    }
    
    return (
      <>
        <div className="flex flex-row gap-2 flex-wrap">
          {threeLineChanges.slice(0, 7)}
        </div>
        <div className="flex flex-row gap-2 flex-wrap">
          {threeLineChanges.slice(7, 13)}
        </div>
        <div className="flex flex-row gap-2 flex-wrap">
          {threeLineChanges.slice(13)}
        </div>
      </>
    );
  };

  const drawFourLineChange = (hexagramKey: string) => {
    // Create a more efficient implementation
    const fourLineChanges = [];
    
    // Loop through all possible pairs of positions
    for (let i = 0; i < 3; i++) {
      for (let j = i + 1; j < 4; j++) {
        for (let k = j + 1; k < 5; k++) {
          for (let l = k + 1; l < 6; l++) {
            // Create a copy of the binary string
            const approachedGua = hexagramDetails[hexagramKey].binary.split('');
            
            // Flip the two bits at positions i and j
            approachedGua[i] = approachedGua[i] === '1' ? '0' : '1';
            approachedGua[j] = approachedGua[j] === '1' ? '0' : '1';
            approachedGua[k] = approachedGua[k] === '1' ? '0' : '1';
            approachedGua[l] = approachedGua[l] === '1' ? '0' : '1';
            
            // Join back to string
            const approachedGuaStr = approachedGua.join('');
            
            // Find the corresponding hexagram key
            const approachedGuaKey = Object.keys(hexagramDetails).find(
              key => hexagramDetails[key].binary === approachedGuaStr
            );
            
            // If found, add to the result
            if (approachedGuaKey) {
              fourLineChanges.push(
                <div key={`two-line-${hexagramKey}-${i}-${j}-${k}-${l}-${approachedGuaKey}`}>
                  {drawHexagramGlyph(approachedGuaKey)}
                </div>
              );
            }
          }
        }
      }
    }
    
    return (
      <>
        <div className="flex flex-row gap-2 flex-wrap">
          {fourLineChanges.slice(0, 8)}
        </div>
        <div className="flex flex-row gap-2 flex-wrap">
          {fourLineChanges.slice(8)}
        </div>
      </>
    );
  };

  const drawFiveLineChange = (hexagramKey: string) => {
    // Create a more efficient implementation
    const fiveLineChanges = [];
    
    // Loop through all possible pairs of positions
    for (let i = 0; i < 2; i++) {
      for (let j = i + 1; j < 3; j++) {
        for (let k = j + 1; k < 4; k++) {
          for (let l = k + 1; l < 5; l++) {
            for (let m = l + 1; m < 6; m++) {
              // Create a copy of the binary string
              const approachedGua = hexagramDetails[hexagramKey].binary.split('');
              
              // Flip the two bits at positions i and j
              approachedGua[i] = approachedGua[i] === '1' ? '0' : '1';
              approachedGua[j] = approachedGua[j] === '1' ? '0' : '1';
              approachedGua[k] = approachedGua[k] === '1' ? '0' : '1';
              approachedGua[l] = approachedGua[l] === '1' ? '0' : '1';
              approachedGua[m] = approachedGua[m] === '1' ? '0' : '1';
              
              // Join back to string
              const approachedGuaStr = approachedGua.join('');
              
              // Find the corresponding hexagram key
              const approachedGuaKey = Object.keys(hexagramDetails).find(
                key => hexagramDetails[key].binary === approachedGuaStr
              );
              
              // If found, add to the result
              if (approachedGuaKey) {
                fiveLineChanges.push(
                  <div key={`two-line-${hexagramKey}-${i}-${j}-${k}-${l}-${m}-${approachedGuaKey}`}>
                    {drawHexagramGlyph(approachedGuaKey)}
                  </div>
                );
              }
            }
          }
        }
      }
    }
    
    return (
      <>
        <div className="flex flex-row gap-2 flex-wrap">
          {fiveLineChanges}
        </div>
      </>
    );
  };

  const drawSixLineChange = (hexagramKey: string) => {
    // Create a copy of the binary string
    const approachedGua = hexagramDetails[hexagramKey].binary.split('');
    
    // Flip the two bits at positions i and j
    approachedGua[0] = approachedGua[0] === '1' ? '0' : '1';
    approachedGua[1] = approachedGua[1] === '1' ? '0' : '1';
    approachedGua[2] = approachedGua[2] === '1' ? '0' : '1';
    approachedGua[3] = approachedGua[3] === '1' ? '0' : '1';
    approachedGua[4] = approachedGua[4] === '1' ? '0' : '1';
    approachedGua[5] = approachedGua[5] === '1' ? '0' : '1';
    
    // Join back to string
    const approachedGuaStr = approachedGua.join('');
    
    // Find the corresponding hexagram key
    const approachedGuaKey = Object.keys(hexagramDetails).find(
      key => hexagramDetails[key].binary === approachedGuaStr
    );
    
    if (approachedGuaKey) {
      return (
        <div key={`two-line-${hexagramKey}-all-changed-${approachedGuaKey}`}>
          {drawHexagramGlyph(approachedGuaKey)}
        </div>
      );
    }
    return null;
  };

  return (
    <>
    <div className="bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-teal-700">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl">Approached Guas</h2>
        <p>
          The approached gua is the hexagram that is the result of a changing moving lines in the produced hexagram to their opposites.
        </p>
        <p>
          The three-coin divination method gives each line an independent 25% chance of becoming a moving line, which means the distribution of approached guas is predetermined to be the Binomial Distribution with <em>p=0.25</em>.
        </p>
        <p>
          What follows is the analysis of each gua's distribution of approached guas.
        </p>
      </div>
    </div>
    <div className="flex flex-col gap-8 bg-white mt-8 p-6 rounded-lg shadow-md border-l-4 border-teal-700 justify-center items-center">
      <div className="flex flex-col gap-2 justify-center items-center">
        <label htmlFor="hexagram-select">
          Select a hexagram as the produced gua to see its particular distribution of approached guas with a given probability (P) of each gua being approached.
        </label>
        <select
          id="hexagram-select"
          value={selectedHexagram}
          onChange={(e) => setSelectedHexagram(e.target.value)}
          className="border border-teal-500 rounded px-3 py-2 bg-white text-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          {Array.from({ length: 64 }, (_, i) => (i + 1).toString()).map((num) => (
            <option key={num} value={num}>
              {hexagramDetails[num]?.hexagram || ""} ({num}) {hexagramDetails[num]?.translation || ""}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-row gap-2 justify-center items-center">
        <div className="flex flex-row gap-2 justify-center items-center">
          {drawHexagramGlyph(selectedHexagram)}
        </div>
        <div>
          P = 18%
        </div>
      </div>
      <div className="flex flex-row gap-2 justify-center items-center">
        <div className="flex flex-row gap-2 justify-center items-center">
          {drawOneLineChange(selectedHexagram)}
        </div>
        <div>
          P = 6%
        </div>
      </div>
      <div className="flex flex-row gap-2 justify-center items-center">
        <div className="flex flex-col gap-2 justify-center items-center">
          {drawTwoLineChange(selectedHexagram)}
        </div>
        <div>
          P = 2%
        </div>
      </div>
      <div className="flex flex-row gap-2 justify-center items-center">
        <div className="flex flex-col gap-2 justify-center items-center">
          {drawThreeLineChange(selectedHexagram)}
        </div>
        <div>
          P = 0.66%
        </div>
      </div>
      <div className="flex flex-row gap-2 justify-center items-center">
        <div className="flex flex-col gap-2 justify-center items-center">
          {drawFourLineChange(selectedHexagram)}
        </div>
        <div>
          P = 0.22% 
        </div>
      </div>
      <div className="flex flex-row gap-2 justify-center items-center">
        <div className="flex flex-row gap-2 justify-center items-center">
          {drawFiveLineChange(selectedHexagram)}
        </div>
        <div>
          P = 0.073%
        </div>
      </div>
      <div className="flex flex-row gap-2 justify-center items-center">
        <div className="flex flex-row gap-2 justify-center items-center">
          {drawSixLineChange(selectedHexagram)}
        </div>
        <div>
          P = 0.024%
        </div>
      </div>
    </div>
    {hoveredHexagram && (
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mb-2 px-3 py-2 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap z-50"
      key={`tooltip-${hoveredHexagram}`}
      onMouseEnter={() => setHoveredHexagram(hoveredHexagram)}
      onMouseLeave={() => setHoveredHexagram(null)}
      >
        <div className="text-center text-6xl">{hexagramDetails[hoveredHexagram]?.hexagram}</div>
        <div className="text-center text-xl">{hoveredHexagram}</div>
        <div className="text-center mb-2">{hexagramDetails[hoveredHexagram]?.pronunciation}</div>
        <div className="text-center">{hexagramDetails[hoveredHexagram]?.translation}</div>
      </div>
    )}
    </>
  );
}