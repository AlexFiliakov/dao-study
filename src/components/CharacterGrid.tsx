'use client';

import React, { useEffect, useState } from 'react';
import { CharacterPosition, processText } from '@/utils/textProcessing';

interface Point {
  x: number;
  y: number;
}

const numericChars = new Set(['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']);

export default function CharacterGrid() {
  const [characters, setCharacters] = useState<CharacterPosition[]>([]);
  const [selectedChar, setSelectedChar] = useState<CharacterPosition | null>(null);
  const [charPositions, setCharPositions] = useState<Point[]>([]);
  const [linkedChars, setLinkedChars] = useState<Set<string>>(new Set());
  const [clickedChar, setClickedChar] = useState<CharacterPosition | null>(null);
  const [fullText, setFullText] = useState<string>('');
  const [characterMeanings, setCharacterMeanings] = useState<Record<string, string>>({});
  const [translations, setTranslations] = useState<Record<string, string>>({});

  // Desktop Grid Config
  const gridWidthDesktop = 45;  // 45 columns
  const gridHeightDesktop = 18; // 18 rows
  // Mobile Grid Config
  const gridWidthMobile = 14;  // 14 columns
  const gridHeightMobile = 58; // 58 rows
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateIsDesktop = () => {
        setIsDesktop(window.innerWidth >= 1024);
      };

      updateIsDesktop(); // Set initial value
      window.addEventListener('resize', updateIsDesktop);
      return () => window.removeEventListener('resize', updateIsDesktop);
    }
  }, []);

  const gridWidth = isDesktop ? gridWidthDesktop : gridWidthMobile;
  const gridHeight = isDesktop ? gridHeightDesktop : gridHeightMobile;
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
  }, [gridWidth, gridHeight]);

  useEffect(() => {
    const fetchText = async () => {
      const response = await fetch('/docs/ddj_guodian_chu.txt');
      const text = await response.text();
      setFullText(text.replace(/^.*?　/gm, ''));
    };
    fetchText();
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

  /*
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
            const isPredecessor = char.positions.some(p => 
              selectedChar.positions.some(pos => p === pos - 1)
            );
            const isSuccessor = char.positions.some(p => 
              selectedChar.positions.some(pos => p === pos + 1)
            );

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
  */

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

  const getCharacterContext = (char: CharacterPosition) => {
    if (!fullText) return [];
  
    // Use a regex to split text into sentences (each sentence includes its trailing delimiter, if any)
    const sentenceRegex = /[^；。？！：\n]+[；。？！：\n]?/g;
    const sentences = fullText.match(sentenceRegex) || [];
    
    // For each sentence that contains our character, compute the context and count occurrences
    const contexts = sentences.reduce((acc, sentence) => {
      const firstIndex = sentence.indexOf(char.char);
      if (firstIndex === -1) return acc;
  
      // Count how many times the character appears in this sentence
      const count = sentence.split(char.char).length - 1;
      
      // Only keep sentences with some surrounding text (not a lone character)
      const preceding = sentence.slice(0, firstIndex);
      const following = sentence.slice(firstIndex + 1);
      if ((preceding.length > 0 || following.length > 0) && (preceding + following).trim().length > 0) {
        acc.push({
          preceding,
          current: char.char,
          following,
          count,
        });
      }
      return acc;
    }, [] as { preceding: string; current: string; following: string; count: number }[]);
  
    return contexts.sort((a, b) => b.count - a.count).slice(0,10);
  };

  useEffect(() => {
    const loadCharacterMeanings = async () => {
      const response = await fetch('/docs/ddj_guodian_chu_character_meanings.json');
      const text = await response.text();
      try {
        const characterMeaningsMap = JSON.parse(text);
        setCharacterMeanings(characterMeaningsMap);
      } catch (e) {
        console.error('Error parsing character meanings:', e);
        setCharacterMeanings({});
      }
    };
    loadCharacterMeanings();
  }, []);

  useEffect(() => {
    const loadTranslations = async () => {
      const response = await fetch('/docs/ddj_guodian_chu_sentence_translation.json');
      const text = await response.text();
      try {
        const translationsMap = JSON.parse(text);
        setTranslations(translationsMap);
      } catch (e) {
        console.error('Error parsing translations:', e);
        setTranslations({});
      }
    };
    loadTranslations();
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col justify-center items-center">
      <div className="mb-4 p-6 rounded-lg shadow-lg gap-4 bg-white">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-green-600">{selectedChar == null ? '　' : selectedChar.char} Selected</span>
          </div>
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
        {/*
        <div className="flex justify-center mt-4 items-center text-sm text-gray-600">
          (Lighter shades appear less often)
        </div>
        */}
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
        {/*
        <g className="connections">
          {renderConnections()}
        </g>
        */}

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
      <div className={`bg-white mt-4 p-6 rounded-lg shadow-md ${selectedChar ? 'visible' : 'hidden'}`}>
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-7xl text-gray-600">{selectedChar?.char}</h2>
          <div className="flex items-center">
            <span className="text-sm text-gray-600">
              Appears {selectedChar?.positions.length} times.
            </span>
          </div>
          <div className="flex items-center">
            {selectedChar && (
              <span className="text-sm text-gray-600">
              {characterMeanings[selectedChar.char] ? (
                characterMeanings[selectedChar.char].split('<br />').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
                ))
              ) : (
                <em>Character meaning not found.</em>
              )}
              </span>
            )}
          </div>
          <div className="flex flex-col items-center gap-2 max-w-2xl">
            <h2 className="font-bold text-gray-600">
            {selectedChar && getCharacterContext(selectedChar).length === 10
              ? 'Top ' + getCharacterContext(selectedChar).length + ' sentences:'
              : selectedChar && getCharacterContext(selectedChar).length > 1
              ? getCharacterContext(selectedChar).length + ' sentences:'
              : selectedChar
              ? getCharacterContext(selectedChar).length + ' sentence:'
              : ''
            }
            </h2>
            {selectedChar && getCharacterContext(selectedChar).map((context, index) => {
              const cleanedPreceding = context.preceding.replace(/\r?\n\s*/g, '');
              const cleanedCurrent = context.current.replace(/\r?\n\s*/g, '');
              const cleanedFollowing = context.following.replace(/\r?\n\s*/g, '');

              return (
                <div key={index} className="bg-gray-100 p-1">
                  <p className="text-sm whitespace-normal text-gray-700 text-center">
                    {cleanedPreceding}
                    <em className="text-green-600 text-sm bg-green-100 whitespace-normal not-italic">
                      {cleanedCurrent}
                    </em>
                    {cleanedFollowing.split(cleanedCurrent).map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && (
                          <em className="text-green-600 text-sm bg-green-100 whitespace-normal not-italic">
                            {cleanedCurrent}
                          </em>
                        )}
                      </React.Fragment>
                    ))}
                  </p>
                  <div className="flex items-center justify-center text-base">
                    <span className="text-gray-700 text-sm">
                      {translations[cleanedPreceding + cleanedCurrent + cleanedFollowing] ||
                        <em>Translation not found.</em>}<br />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col items-center gap-2 max-w-2xl">
            <em className="text-gray-700 text-sm">Translated mainly by ChatGPT.</em>
          </div>
        </div>
      </div>
      {/* 
      <div className="mt-4 p-6 rounded-lg shadow-lg bg-white">
        <h2 className="text-lg font-bold text-gray-600">Character Meanings JSON Dump</h2>
        <pre className="text-sm text-gray-600 bg-gray-100 p-4 rounded-lg overflow-auto max-h-64">
          {JSON.stringify(characterMeanings, null, 2)}
        </pre>
      </div>
      */}
    </div>
  );
}