'use client';

import { useState, useEffect } from 'react';

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

export function useHexagramData() {
  const [hexagramMapping, setHexagramMapping] = useState<Record<string, string>>({});
  const [hexagramDetails, setHexagramDetails] = useState<Record<string, HexagramDetails>>({});

  useEffect(() => {
    const loadHexagramMappings = async () => {
      try {
        const [mappingResponse, detailsResponse] = await Promise.all([
          fetch('/docs/ddj_chapter_to_gua_mapping.json'),
          fetch('/docs/i_ching_guas.json')
        ]);

        const chapterToHexagram = await mappingResponse.json();
        const hexDetails = await detailsResponse.json();

        setHexagramMapping(chapterToHexagram);
        setHexagramDetails(hexDetails);
      } catch (error) {
        console.error('Error loading hexagram data:', error);
      }
    };

    loadHexagramMappings();
  }, []);

  return { hexagramMapping, hexagramDetails };
}