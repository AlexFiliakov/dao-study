export interface CharacterPosition {
  char: string;
  positions: number[];
}

export async function processText(): Promise<CharacterPosition[]> {
  const response = await fetch('/docs/ddj_guodian_chu.txt');
  const text = await response.text();
  
  // Remove whitespace and English alphabet, and create character array
  const chars = text.replace(/\s+|[A-Za-z]|_|\.|:|\/|/g, '').split('');
  
  // Create map of character positions
  const charMap = new Map<string, number[]>();
  chars.forEach((char, index) => {
    if (!charMap.has(char)) {
      charMap.set(char, []);
    }
    charMap.get(char)?.push(index);
  });
  
  // Convert map to array of objects and sort by frequency
  return Array.from(charMap.entries())
    .map(([char, positions]) => ({
      char,
      positions
    }))
    .sort((a, b) => b.positions.length - a.positions.length);
}