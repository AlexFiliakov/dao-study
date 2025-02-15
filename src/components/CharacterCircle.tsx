'use client';

import React, { useEffect, useState } from 'react';
import { CharacterPosition, processText } from '@/utils/textProcessing';

interface Point {
  x: number;
  y: number;
}

const numericChars = new Set(['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']);

export default function CharacterCircle() {
  const [characters, setCharacters] = useState<CharacterPosition[]>([]);
  const [selectedChar, setSelectedChar] = useState<CharacterPosition | null>(null);
  const [charPositions, setCharPositions] = useState<Point[]>([]);
  const [linkedChars, setLinkedChars] = useState<Set<string>>(new Set());
  const [clickedChar, setClickedChar] = useState<CharacterPosition | null>(null);

  const gridWidth = 45;  // 45 columns
  const gridHeight = 18; // 18 rows
  const cellSize = 25;   // pixels per cell
  const padding = 15;    // padding around grid
  const svgWidth = gridWidth * cellSize + padding * 2;
  const svgHeight = gridHeight * cellSize + padding * 2;
  const full_opacity = 4;

  useEffect(() => {
    const loadCharacters = async () => {
      const chars = await processText();
      const filteredChars = chars.filter(char => !numericChars.has(char.char));
      setCharacters(filteredChars);
      
      // Calculate positions on grid for filtered characters
      const positions = filteredChars.map((_, index) => {
        const row = Math.floor(index / gridWidth);
        const col = index % gridWidth;
        return {
          x: padding + col * cellSize + cellSize / 2,
          y: padding + row * cellSize + cellSize / 2
        };
      });
      setCharPositions(positions);
    };
    
    loadCharacters();
  }, []);

  const handleMouseEnter = (char: CharacterPosition) => {
    if (!clickedChar) {
      setSelectedChar(char);
      updateLinkedChars(char);
    }
  };

  const handleMouseLeave = () => {
    if (!clickedChar) {
      setSelectedChar(null);
      setLinkedChars(new Set());
    }
  };

  const handleClick = (char: CharacterPosition) => {
    if (clickedChar?.char === char.char) {
      // Clicking again deselects
      setClickedChar(null);
      setSelectedChar(null);
      setLinkedChars(new Set());
    } else {
      // New selection
      setClickedChar(char);
      setSelectedChar(char);
      updateLinkedChars(char);
    }
  };

  const updateLinkedChars = (char: CharacterPosition) => {
    const linked = new Set<string>();
    char.positions.forEach(pos => {
      characters.forEach(otherChar => {
        const isLinked = otherChar.positions.some(p => 
          p === pos - 1 || 
          p === pos + 1
        );
        if (isLinked) {
          linked.add(otherChar.char);
        }
      });
    });
    setLinkedChars(linked);
  };

  // Add helper function to determine character's connection type
  const getCharacterConnectionType = (char: CharacterPosition) => {
    if (!selectedChar || char.char === selectedChar.char) return 'none';
    
    let hasPredecessor = false;
    let hasSuccessor = false;
    
    selectedChar.positions.forEach(pos => {
      if (char.positions.some(p => p === pos - 1)) hasPredecessor = true;
      if (char.positions.some(p => p === pos + 1)) hasSuccessor = true;
    });

    if (hasPredecessor && hasSuccessor) return 'both';
    if (hasPredecessor) return 'predecessor';
    if (hasSuccessor) return 'successor';
    return 'none';
  };

  // Add helper function to count links for a character
  const getCharacterLinkCount = (char: CharacterPosition) => {
    if (!selectedChar) return 0;
    
    let linkCount = 0;
    selectedChar.positions.forEach(pos => {
      if (char.positions.some(p => p === pos - 1 || p === pos + 1)) {
        linkCount++;
      }
    });
    return linkCount;
  };

  const renderConnections = () => {
    if (!selectedChar) return null;

    const charIndex = characters.findIndex(c => c.char === selectedChar.char);
    const currentPos = charPositions[charIndex];

    return (
      <>
        {selectedChar.positions.flatMap((pos, i) => 
          characters.map((char, idx) => {
            // Skip if it's the selected character
            if (char.char === selectedChar.char) return null;

            // Check for immediate predecessor or successor
            const isPredecessor = char.positions.some(p => p === pos - 1);
            const isSuccessor = char.positions.some(p => p === pos + 1);

            if (!isPredecessor && !isSuccessor) return null;

            return (
              <line
                key={`${isPredecessor ? 'prev' : 'next'}-${i}-${idx}`}
                x1={currentPos.x}
                y1={currentPos.y}
                x2={charPositions[idx].x}
                y2={charPositions[idx].y}
                stroke={isPredecessor ? 'orange' : 'blue'}
                strokeWidth="2"
                //opacity="0.3"
                opacity="0"
              />
            );
          })
        ).filter(Boolean)}
      </>
    );
  };

  const getCharacterZIndex = React.useCallback((char: CharacterPosition) => {
    if (selectedChar?.char === char.char) return 1001;
    if (linkedChars.has(char.char)) return 999;
    return 1;
  }, [selectedChar, linkedChars]);

  const sortedCharacters = React.useMemo(() => {
    const filteredChars = characters.filter(char => !numericChars.has(char.char));
    return [...filteredChars].sort((a, b) => {
      const aZIndex = getCharacterZIndex(a);
      const bZIndex = getCharacterZIndex(b);
      return aZIndex - bZIndex;
    });
  }, [characters, getCharacterZIndex]);

  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center">
      <div className="mb-4 flex items-center gap-6">
        {selectedChar && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-green-600">Selected Character: {selectedChar.char}</span>
            </div>
          )}
        <div className="flex items-center gap-2">
          <span className="text-sm text-orange-600">Preceding Character</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-blue-600">Following Character</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-purple-600">Both Preceding and Following</span>
        </div>
      </div>
      <div className="mb-4 flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          (Lighter shades appear less often)
        </div>
      </div>
      <svg 
        width={svgWidth} 
        height={svgHeight} 
        className="bg-white rounded-lg shadow-lg"
      >
        {/* Base layer: non-selected characters */}
        <g className="base-characters">
          {sortedCharacters.map((char) => {
            const originalIndex = characters.findIndex(c => c.char === char.char);
            const isSelected = selectedChar?.char === char.char;
            const isLinked = linkedChars.has(char.char);
            
            if (isSelected) return null; // Skip selected character

            return (
              <g key={char.char}>
                <g
                  onMouseEnter={() => handleMouseEnter(char)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(char)}
                  className="cursor-pointer"
                >
                  <circle
                    cx={charPositions[originalIndex].x}
                    cy={charPositions[originalIndex].y}
                    r="10"
                    fill={(() => {
                      const connectionType = getCharacterConnectionType(char);
                      const linkCount = getCharacterLinkCount(char);
                      const opacity = Math.min(linkCount / full_opacity, 1); // Cap at 1
                      
                      switch (connectionType) {
                        case 'both': 
                          // return `rgba(216, 180, 254, ${opacity})`; // purple with opacity
                          return `rgba(143, 57, 235, ${opacity})`; // purple with opacity
                        case 'predecessor': 
                          // return `rgba(253, 186, 116, ${opacity})`; // orange with opacity
                          return `rgba(228, 86, 17, ${opacity})`; // orange with opacity
                        case 'successor': 
                          // return `rgba(147, 197, 253, ${opacity})`; // blue with opacity
                          return `rgba(46, 103, 236, ${opacity})`; // blue with opacity
                        default: 
                          return 'white';
                      }
                    })()}
                    stroke={isLinked ? '#94a3b8' : '#64748b'}
                    strokeWidth={isLinked ? "1.5" : "1"}
                  />
                  <text
                    x={charPositions[originalIndex].x}
                    y={charPositions[originalIndex].y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="12"
                    fontWeight={isLinked ? "500" : "normal"}
                    className="select-none pointer-events-none"
                  >
                    {char.char}
                  </text>
                </g>
              </g>
            );
          })}
        </g>

        {/* Middle layer: connections */}
        <g className="connections">
          {renderConnections()}
        </g>

        {/* Top layer: selected character */}
        {selectedChar && (
          <g className="selected-character">
            <g
              onMouseEnter={() => handleMouseEnter(selectedChar)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(selectedChar)}
              className="cursor-pointer"
            >
              <circle
                cx={charPositions[characters.findIndex(c => c.char === selectedChar.char)]?.x}
                cy={charPositions[characters.findIndex(c => c.char === selectedChar.char)]?.y}
                r="12"
                fill="#86efac"
                stroke="#94a3b8"
                strokeWidth="1.5"
              />
              <text
                x={charPositions[characters.findIndex(c => c.char === selectedChar.char)]?.x}
                y={charPositions[characters.findIndex(c => c.char === selectedChar.char)]?.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="14"
                fontWeight="500"
                className="select-none pointer-events-none"
              >
                {selectedChar.char}
              </text>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
}