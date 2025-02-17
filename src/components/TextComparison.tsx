'use client';

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
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
  standardSource: string;
  guodianSource: string;
}

const TextComparison: React.FC = () => {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [sources, setSources] = useState<{standard: string, guodian: string}>({
    standard: '',
    guodian: ''
  });

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
        const standardChapters: string[] = standardText.split(/\n(?=[\d一二三四五六七八九十]+章|http)/).slice(0,81);
        const guodianChapters: string[] = guodianText.split(/\n(?=[\d一二三四五六七八九十]+章|http)/).slice(0,81);

        const standardSource: string = standardText.split(/\n(?=[\d一二三四五六七八九十]+章|http)/)[81];
        const guodianSource: string = guodianText.split(/\n(?=[\d一二三四五六七八九十]+章|http)/)[81];

        // Store sources separately
        setSources({
          standard: standardSource,
          guodian: guodianSource
        });

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
            segments,
            standardSource,
            guodianSource
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
        <span className="text-red-600 bg-red-100">
          {segment.standard}
        </span>
        {segment.guodian && (
          <span className="text-green-600 bg-green-100">{segment.guodian}</span>
        )}
      </span>
    );
  };

  // Create separate ChapterCard component
  const ChapterCard = React.memo(({ chapter, index }: { chapter: Chapter, index: number }) => {
    const ChapterNotes = React.lazy(() => 
      import(`@/components/chapter_meanings_diffs/ch${index + 1}`)
        .then(module => ({
          default: () => (
            <div>
              <hr className="my-4 border-t border-neutral-200" />
              {
              //<h2 className="text-xl font-bold">Chapter {(index+1)} Notes</h2>
              }
              {module.default()}  
              <div className="mt-4 text-sm flex items-center">
                <span className="text-gray-700 text-sm">
                  <em>Analysis of the two texts conducted mainly using ChatGPT.</em>
                </span>
              </div>
            </div>
          )
        }))
        .catch(() => ({
          default: () => <div></div>
        }))
    );

    return (
      <Card 
        key={index} 
        id={'ch' + (index+1)} 
        className={'w-full max-w-4xl mx-auto ' + (index % 2 === 0 ? 'border-teal-700' : 'border-teal-500')}
      >
        <CardContent>
          <div className="text-lg">
            <h2 className="text-xl font-bold mb-4">
              {chapter.chapterNum + ' (Chapter ' + (index+1) + ')'}
            </h2>
            <div className="leading-loose">
              {chapter.segments.map((segment, segIndex) => 
                renderSegment(segment, segIndex)
              )}
            </div>
            
            <React.Suspense 
              fallback={
                <div className="my-4 text-neutral-500">
                  Loading chapter notes...
                </div>
              }
            >
              <ChapterNotes />
            </React.Suspense>

            <div className="mt-4 text-sm flex items-center">
              <a href="#toc" className="text-teal-700 hover:underline flex items-center">
              <ChevronUp className="mr-1" />
              Scroll to Top
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  });

  ChapterCard.displayName = 'ChapterCard';

  return (
    //<ScrollArea className="h-[600px]">
      <div>
        <Card id="toc" className="w-full max-w-4xl mx-auto border-teal-700 mt-8 text-lg">
          <CardContent>
            <h2 className="text-xl font-bold mb-4">Table of Contents</h2>
            <div id="toc-content" className="flex flex-row justify-center items-start gap-8">
              <div id="toc-dao" className="flex flex-col items-center w-[300px]">
                <h3 className="font-semibold text-neutral-700">Dao (道)</h3>
                <ul className="list-disc pl-5">
                  {/* Create Table of Contents */
                  chapters.slice(0,37).map((chapter, index) => (
                    <li key={'toc-link-' + index}>
                      <a href={'#ch' + (index+1)} className="text-red-800 hover:underline break-all">
                        Chapter {index+1}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div id="toc-de" className="flex flex-col items-center w-[300px]">
                <h3 className="font-semibold text-neutral-700">De (德)</h3>
                <ul className="list-disc pl-5">
                  {/* Create Table of Contents */
                  chapters.slice(37,81).map((chapter, index) => (
                    <li key={'toc-link-' + index}>
                      <a href={'#ch' + (index+1+37)} className="text-red-800 hover:underline break-all">
                        Chapter {index+1+37}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

      {/* Create individual chapters */}
      {chapters.map((chapter, index) => (
        <ChapterCard 
          key={index}
          chapter={chapter} 
          index={index}
        />
      ))}

      {/* Reference Sources */}
      <Card id="references" className="w-full max-w-4xl mx-auto border-teal-700 mt-8">
        <CardContent>
          <div className="text-lg">
            <h2 className="text-xl font-bold mb-4">References</h2>
            <div className="leading-loose flex flex-col gap-4">
              <div className="flex flex-row gap-2">
                <h3 className="font-semibold text-teal-700">Standard Text Source:</h3>
                <a href={sources.standard} className="text-red-800 hover:underline break-all">
                  {sources.standard}
                </a>
              </div>
              <div className="flex flex-row gap-2">
                <h3 className="font-semibold text-teal-700">Guodian Text Source:</h3>
                <a href={sources.guodian} className="text-red-800 hover:underline break-all">
                  {sources.guodian}
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    //</ScrollArea>
  );
};

export default TextComparison;