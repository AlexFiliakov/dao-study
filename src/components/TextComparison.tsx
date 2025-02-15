'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
// import { ScrollArea } from './ui/scroll-area';

interface TextSegment {
  type: 'same' | 'diff';
  text?: string;
  standard?: string;
  guodian?: string;
}

interface Chapter {
  chapterNum: string;
  segments: TextSegment[];
}

const TextComparison: React.FC = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    const loadTexts = async (): Promise<void> => {
      try {
        const [standardResponse, guodianResponse] = await Promise.all([
          fetch('/docs/ddj_standard.txt'),
          fetch('/docs/ddj_guodian_chu.txt')
        ]);

        const [standardText, guodianText] = await Promise.all([
          standardResponse.text(),
          guodianResponse.text()
        ]);

        // Split texts into chapters
        const standardChapters: string[] = standardText.split(/\n(?=[\d一二三四五六七八九十]+章|http)/);
        const guodianChapters: string[] = guodianText.split(/\n(?=[\d一二三四五六七八九十]+章|http)/);

        // Process chapters
        const processedChapters: Chapter[] = standardChapters.map((standardChapter, index) => {
          const guodianChapter: string = guodianChapters[index] || '';
          
          // Extract chapter number and content
          const chapterMatch = standardChapter.match(/^([\d一二三四五六七八九十]+章)/);
          const chapterNum: string = chapterMatch ? chapterMatch[1] : '';
          
          // Keep chapter numbers for comparison
          const standardContent: string = standardChapter.replace(/^[\d一二三四五六七八九十]+章[　]?/, '');
          const guodianContent: string = guodianChapter.replace(/^[\d一二三四五六七八九十]+章[　]?/, '');

          // Compare characters and mark differences using LCS
          const segments: TextSegment[] = compareTexts(standardContent, guodianContent);

          return {
            chapterNum,
            segments
          };
        });

        setChapters(processedChapters);
      } catch (error) {
        console.error('Error loading texts:', error);
      }
    };

    loadTexts();
  }, []);

  const compareTexts = (standard: string, guodian: string): TextSegment[] => {
    const lcsMatrix = Array(standard.length + 1).fill(null).map(() => Array(guodian.length + 1).fill(0));

    // Build LCS matrix
    for (let i = 1; i <= standard.length; i++) {
      for (let j = 1; j <= guodian.length; j++) {
        if (standard[i - 1] === guodian[j - 1]) {
          lcsMatrix[i][j] = lcsMatrix[i - 1][j - 1] + 1;
        } else {
          lcsMatrix[i][j] = Math.max(lcsMatrix[i - 1][j], lcsMatrix[i][j - 1]);
        }
      }
    }

    const segments: TextSegment[] = [];
    let i = standard.length;
    let j = guodian.length;
    let tempStandard = '';
    let tempGuodian = '';

    // Backtrack through the matrix
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && standard[i - 1] === guodian[j - 1]) {
        // Characters match
        if (tempStandard || tempGuodian) {
          segments.push({ type: 'diff', standard: tempStandard, guodian: tempGuodian });
          tempStandard = '';
          tempGuodian = '';
        }
        segments.push({ type: 'same', text: standard[i - 1] });
        i--;
        j--;
      } else if (j > 0 && (i === 0 || lcsMatrix[i][j - 1] >= lcsMatrix[i - 1][j])) {
        // Extra character in guodian text
        tempGuodian = guodian[j - 1] + tempGuodian;
        j--;
      } else if (i > 0) {
        // Extra character in standard text
        tempStandard = standard[i - 1] + tempStandard;
        i--;
      }
    }

    // Add any remaining differences
    if (tempStandard || tempGuodian) {
      segments.push({ type: 'diff', standard: tempStandard, guodian: tempGuodian });
    }

    return segments.reverse();
  };

  const renderSegment = (segment: TextSegment, index: number): React.JSX.Element => {
    if (segment.type === 'same') {
      return <span key={index}>{segment.text}</span>;
    }
    
    return (
      <span key={index} className="relative group">
        <span className="text-red-600 bg-red-200">
          {segment.standard}
        </span>
        {segment.guodian && (
          <span className="text-green-600">{segment.guodian}</span>
        )}
      </span>
    );
  };

  return (
    //<ScrollArea className="h-[600px]">
      chapters.map((chapter, index) => (
        <Card key={index} className={index % 2 == 0 ? 'w-full max-w-4xl mx-auto border-teal-700' : 'w-full max-w-4xl mx-auto border-teal-500'}>
          <CardContent>
            <div className="text-lg">
              <h2 className="text-xl font-bold mb-4">{index === 81 ? 'Reference' : chapter.chapterNum + ' (Chapter ' + (index+1) + ')'}</h2>
              <div className="leading-loose">
                {chapter.segments.map((segment, segIndex) => 
                  renderSegment(segment, segIndex)
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))
    //</ScrollArea>
  );
};

export default TextComparison;