export interface CharacterPosition {
  char: string;
  positions: number[];
}

export async function processText(): Promise<CharacterPosition[]> {
  const response = await fetch('/docs/ddj_guodian_chu.txt');
  const text = await response.text();
  const chapters = text.split('\n');

  // Create a map to store character positions
  const globalCharMap = new Map<string, Set<number>>();
  let globalIndex = 0;

  // Process each chapter
  chapters.forEach((chapter) => {
    const chars = chapter.replace(/\s+|[A-Za-z]|_|\.|:|\/|/g, '').split('');
    
    chars.forEach((char) => {
      if (!globalCharMap.has(char)) {
        globalCharMap.set(char, new Set<number>());
      }
      globalCharMap.get(char)?.add(globalIndex);
      globalIndex++;
    });
  });

  // Convert map to array and sort by frequency
  const charPositions: CharacterPosition[] = Array.from(globalCharMap.entries())
    .map(([char, positions]) => ({
      char,
      positions: Array.from(positions).sort((a, b) => a - b)
    }))
    .sort((a, b) => b.positions.length - a.positions.length);

  return charPositions;
}