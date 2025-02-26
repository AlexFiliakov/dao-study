// Client-side wrapper to hide Hexagram to DDJ Mappings unless "?user=alex" is in the URL

'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import HexagramDisplay from './HexagramDisplay';
import { HexagramDetails } from '@/types/HexagramTypes';

interface HexagramDisplayClientWrapperProps {
  chapterNumber: number;
  hexagramMapping: Record<string, string>;
  hexagramDetails: Record<string, HexagramDetails>;
}

function HexagramContent({ 
  chapterNumber, 
  hexagramMapping, 
  hexagramDetails,
  show
}: HexagramDisplayClientWrapperProps & { show: boolean }) {
  if (!show) {
    return null;
  }
  
  return (
    <HexagramDisplay
      chapterNumber={chapterNumber}
      hexagramMapping={hexagramMapping}
      hexagramDetails={hexagramDetails}
    />
  );
}

export default function HexagramDisplayClientWrapper({
  chapterNumber,
  hexagramMapping,
  hexagramDetails
}: HexagramDisplayClientWrapperProps) {
  const searchParams = useSearchParams();
  const showHexagrams = searchParams.get('user') === 'alex';
  
  return (
    <Suspense fallback={<p>Loading hexagram information...</p>}>
      <HexagramContent
        chapterNumber={chapterNumber}
        hexagramMapping={hexagramMapping}
        hexagramDetails={hexagramDetails}
        show={showHexagrams}
      />
    </Suspense>
  );
}