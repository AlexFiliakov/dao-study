'use client';

import { HexagramDetails } from '@/types/HexagramTypes';

interface HexagramDisplayProps {
  chapterNumber: number;
  hexagramMapping: Record<string, string>;
  hexagramDetails: Record<string, HexagramDetails>;
}

export default function HexagramDisplay({ 
  chapterNumber, 
  hexagramMapping, 
  hexagramDetails 
}: HexagramDisplayProps) {
  if (!hexagramMapping || !hexagramDetails) {
    return <p>Hexagram data not available.</p>;
  }

  const thisHexagramKey = hexagramMapping[chapterNumber.toString()];
  const thisHexagram = thisHexagramKey ? hexagramDetails[thisHexagramKey] : null;

  if (!thisHexagram) {
    return <p>No hexagram mapping found for Chapter {chapterNumber}.</p>;
  }

  return (
    <p>
      Chapter {chapterNumber} relates to the Yi Jing hexagram {thisHexagramKey}, {thisHexagram.hexagram}, {thisHexagram.gua} ({thisHexagram.pronunciation}), which means {thisHexagram.translation}
    </p>
  );
}