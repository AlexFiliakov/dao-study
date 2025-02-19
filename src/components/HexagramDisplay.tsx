'use client';

interface HexagramDetails {
  hexagram: string;
  gua: string;
  pronunciation: string;
  translation: string;
  upper: string;
  lower: string;
  opposite_gua: string
  inverse_gua: string;
  mutual_gua: string;
}

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
      Chapter {chapterNumber} relates to the I Ching hexagram {thisHexagramKey}, {thisHexagram.hexagram}, {thisHexagram.gua} ({thisHexagram.pronunciation}), which means {thisHexagram.translation}
    </p>
  );
}