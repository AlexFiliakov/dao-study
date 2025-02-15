export interface CharacterPosition {
  char: string;
  positions: number[];
}

interface ProcessOptions {
  startChapter?: number;
  endChapter?: number;
  minFrequency?: number;
  maxPositions?: number;
}

const cache = new Map<string, CharacterPosition[]>();

export async function processText(options: ProcessOptions = {}): Promise<CharacterPosition[]> {
  const {
    startChapter = 1,
    endChapter = 81,
    minFrequency = 1, // Changed to 1 to show all characters
  } = options;

  // Check cache
  const cacheKey = `${startChapter}-${endChapter}-${minFrequency}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  const response = await fetch('/docs/ddj_guodian_chu.txt');
  const text = await response.text();
  const chapters = text.split('\n').slice(startChapter - 1, endChapter);

  // Pre-allocate Map with estimated size
  const globalCharMap = new Map<string, number[]>();
  let globalIndex = 0;

  // Process selected chapters
  for (const chapter of chapters) {
    const chars = chapter.replace(/\s+|[A-Za-z]|_|\.|:|\/|/g, '').split('');
    
    for (const char of chars) {
      if (!globalCharMap.has(char)) {
        globalCharMap.set(char, []);
      }
      const positions = globalCharMap.get(char)!;
      positions.push(globalIndex);
      globalIndex++;
    }
  }

  // Filter and convert to array
  const charPositions: CharacterPosition[] = Array.from(globalCharMap.entries())
    .filter(([_, positions]) => positions.length >= minFrequency)
    .map(([char, positions]) => ({
      char,
      positions
    }))
    .sort((a, b) => b.positions.length - a.positions.length); // Keep sorting by frequency

  // Store in cache
  cache.set(cacheKey, charPositions);

  return charPositions;
}

// Clean up cache periodically
export function clearCache(): void {
  cache.clear();
}