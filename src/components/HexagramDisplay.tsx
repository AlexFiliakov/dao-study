'use client';

import { useHexagramData } from '@/hooks/useHexagramData';

interface HexagramDisplayProps {
  chapterNumber: number;
}

export default function HexagramDisplay({ chapterNumber }: HexagramDisplayProps) {
  const { hexagramMapping, hexagramDetails } = useHexagramData();
  
  const thisHexagramKey = hexagramMapping[chapterNumber.toString()];
  const thisHexagram = thisHexagramKey ? hexagramDetails[thisHexagramKey] : null;

  return (
    thisHexagram ? (
      <p>Chapter {chapterNumber} relates to the I Ching hexagram {thisHexagramKey}, {thisHexagram.hexagram}, {thisHexagram.gua} ({thisHexagram.pronunciation}), which means {thisHexagram.translation}</p>
    ) : (
      <p>No hexagram mapping found.</p>
    )
  );
}