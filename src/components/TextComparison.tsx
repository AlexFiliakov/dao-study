'use client';

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import Chapter1Notes from '@/components/chapter_meanings_diffs/ch1';
import Chapter2Notes from '@/components/chapter_meanings_diffs/ch2';
import Chapter3Notes from '@/components/chapter_meanings_diffs/ch3';
import Chapter4Notes from '@/components/chapter_meanings_diffs/ch4';
import Chapter5Notes from '@/components/chapter_meanings_diffs/ch5';
import Chapter6Notes from '@/components/chapter_meanings_diffs/ch6';
import Chapter7Notes from '@/components/chapter_meanings_diffs/ch7';
import Chapter8Notes from '@/components/chapter_meanings_diffs/ch8';
import Chapter9Notes from '@/components/chapter_meanings_diffs/ch9';
import Chapter10Notes from '@/components/chapter_meanings_diffs/ch10';
import Chapter11Notes from '@/components/chapter_meanings_diffs/ch11';
import Chapter12Notes from '@/components/chapter_meanings_diffs/ch12';
import Chapter13Notes from '@/components/chapter_meanings_diffs/ch13';
import Chapter14Notes from '@/components/chapter_meanings_diffs/ch14';
import Chapter15Notes from '@/components/chapter_meanings_diffs/ch15';
import Chapter16Notes from '@/components/chapter_meanings_diffs/ch16';
import Chapter17Notes from '@/components/chapter_meanings_diffs/ch17';
import Chapter18Notes from '@/components/chapter_meanings_diffs/ch18';
import Chapter19Notes from '@/components/chapter_meanings_diffs/ch19';
import Chapter20Notes from '@/components/chapter_meanings_diffs/ch20';
import Chapter21Notes from '@/components/chapter_meanings_diffs/ch21';
import Chapter22Notes from '@/components/chapter_meanings_diffs/ch22';
import Chapter23Notes from '@/components/chapter_meanings_diffs/ch23';
import Chapter24Notes from '@/components/chapter_meanings_diffs/ch24';
import Chapter25Notes from '@/components/chapter_meanings_diffs/ch25';
import Chapter26Notes from '@/components/chapter_meanings_diffs/ch26';
import Chapter27Notes from '@/components/chapter_meanings_diffs/ch27';
import Chapter28Notes from '@/components/chapter_meanings_diffs/ch28';
import Chapter29Notes from '@/components/chapter_meanings_diffs/ch29';
import Chapter30Notes from '@/components/chapter_meanings_diffs/ch30';
import Chapter31Notes from '@/components/chapter_meanings_diffs/ch31';
import Chapter32Notes from '@/components/chapter_meanings_diffs/ch32';
import Chapter33Notes from '@/components/chapter_meanings_diffs/ch33';
import Chapter34Notes from '@/components/chapter_meanings_diffs/ch34';
import Chapter35Notes from '@/components/chapter_meanings_diffs/ch35';
import Chapter36Notes from '@/components/chapter_meanings_diffs/ch36';
import Chapter37Notes from '@/components/chapter_meanings_diffs/ch37';
import Chapter38Notes from '@/components/chapter_meanings_diffs/ch38';
import Chapter39Notes from '@/components/chapter_meanings_diffs/ch39';
import Chapter40Notes from '@/components/chapter_meanings_diffs/ch40';
import Chapter41Notes from '@/components/chapter_meanings_diffs/ch41';
import Chapter42Notes from '@/components/chapter_meanings_diffs/ch42';
import Chapter43Notes from '@/components/chapter_meanings_diffs/ch43';
import Chapter44Notes from '@/components/chapter_meanings_diffs/ch44';
import Chapter45Notes from '@/components/chapter_meanings_diffs/ch45';
import Chapter46Notes from '@/components/chapter_meanings_diffs/ch46';
import Chapter47Notes from '@/components/chapter_meanings_diffs/ch47';
import Chapter48Notes from '@/components/chapter_meanings_diffs/ch48';
import Chapter49Notes from '@/components/chapter_meanings_diffs/ch49';
import Chapter50Notes from '@/components/chapter_meanings_diffs/ch50';
import Chapter51Notes from '@/components/chapter_meanings_diffs/ch51';
import Chapter52Notes from '@/components/chapter_meanings_diffs/ch52';
import Chapter53Notes from '@/components/chapter_meanings_diffs/ch53';
import Chapter54Notes from '@/components/chapter_meanings_diffs/ch54';
import Chapter55Notes from '@/components/chapter_meanings_diffs/ch55';
import Chapter56Notes from '@/components/chapter_meanings_diffs/ch56';
import Chapter57Notes from '@/components/chapter_meanings_diffs/ch57';
import Chapter58Notes from '@/components/chapter_meanings_diffs/ch58';
import Chapter59Notes from '@/components/chapter_meanings_diffs/ch59';
import Chapter60Notes from '@/components/chapter_meanings_diffs/ch60';
import Chapter61Notes from '@/components/chapter_meanings_diffs/ch61';
import Chapter62Notes from '@/components/chapter_meanings_diffs/ch62';
import Chapter63Notes from '@/components/chapter_meanings_diffs/ch63';
import Chapter64Notes from '@/components/chapter_meanings_diffs/ch64';
import Chapter65Notes from '@/components/chapter_meanings_diffs/ch65';
import Chapter66Notes from '@/components/chapter_meanings_diffs/ch66';
import Chapter67Notes from '@/components/chapter_meanings_diffs/ch67';
import Chapter68Notes from '@/components/chapter_meanings_diffs/ch68';
import Chapter69Notes from '@/components/chapter_meanings_diffs/ch69';
import Chapter70Notes from '@/components/chapter_meanings_diffs/ch70';
import Chapter71Notes from '@/components/chapter_meanings_diffs/ch71';
import Chapter72Notes from '@/components/chapter_meanings_diffs/ch72';
import Chapter73Notes from '@/components/chapter_meanings_diffs/ch73';
import Chapter74Notes from '@/components/chapter_meanings_diffs/ch74';
import Chapter75Notes from '@/components/chapter_meanings_diffs/ch75';
import Chapter76Notes from '@/components/chapter_meanings_diffs/ch76';
import Chapter77Notes from '@/components/chapter_meanings_diffs/ch77';
import Chapter78Notes from '@/components/chapter_meanings_diffs/ch78';
import Chapter79Notes from '@/components/chapter_meanings_diffs/ch79';
import Chapter80Notes from '@/components/chapter_meanings_diffs/ch80';
import Chapter81Notes from '@/components/chapter_meanings_diffs/ch81';
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

  useEffect(() => {
    // When chapters are ready, scroll to the hash if present
    if (chapters.length > 0 && window.location.hash) {
      const anchor = window.location.hash.slice(1);
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [chapters]);

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
    // No lazy import
    // Instead, directly import each chapter's notes
    // Or conditionally render based on index

    const chapterNotesMap: { [key: number]: React.ReactNode } = {
      1: <Chapter1Notes />,
      2: <Chapter2Notes />,
      3: <Chapter3Notes />,
      4: <Chapter4Notes />,
      5: <Chapter5Notes />,
      6: <Chapter6Notes />,
      7: <Chapter7Notes />,
      8: <Chapter8Notes />,
      9: <Chapter9Notes />,
      10: <Chapter10Notes />,
      11: <Chapter11Notes />,
      12: <Chapter12Notes />,
      13: <Chapter13Notes />,
      14: <Chapter14Notes />,
      15: <Chapter15Notes />,
      16: <Chapter16Notes />,
      17: <Chapter17Notes />,
      18: <Chapter18Notes />,
      19: <Chapter19Notes />,
      20: <Chapter20Notes />,
      21: <Chapter21Notes />,
      22: <Chapter22Notes />,
      23: <Chapter23Notes />,
      24: <Chapter24Notes />,
      25: <Chapter25Notes />,
      26: <Chapter26Notes />,
      27: <Chapter27Notes />,
      28: <Chapter28Notes />,
      29: <Chapter29Notes />,
      30: <Chapter30Notes />,
      31: <Chapter31Notes />,
      32: <Chapter32Notes />,
      33: <Chapter33Notes />,
      34: <Chapter34Notes />,
      35: <Chapter35Notes />,
      36: <Chapter36Notes />,
      37: <Chapter37Notes />,
      38: <Chapter38Notes />,
      39: <Chapter39Notes />,
      40: <Chapter40Notes />,
      41: <Chapter41Notes />,
      42: <Chapter42Notes />,
      43: <Chapter43Notes />,
      44: <Chapter44Notes />,
      45: <Chapter45Notes />,
      46: <Chapter46Notes />,
      47: <Chapter47Notes />,
      48: <Chapter48Notes />,
      49: <Chapter49Notes />,
      50: <Chapter50Notes />,
      51: <Chapter51Notes />,
      52: <Chapter52Notes />,
      53: <Chapter53Notes />,
      54: <Chapter54Notes />,
      55: <Chapter55Notes />,
      56: <Chapter56Notes />,
      57: <Chapter57Notes />,
      58: <Chapter58Notes />,
      59: <Chapter59Notes />,
      60: <Chapter60Notes />,
      61: <Chapter61Notes />,
      62: <Chapter62Notes />,
      63: <Chapter63Notes />,
      64: <Chapter64Notes />,
      65: <Chapter65Notes />,
      66: <Chapter66Notes />,
      67: <Chapter67Notes />,
      68: <Chapter68Notes />,
      69: <Chapter69Notes />,
      70: <Chapter70Notes />,
      71: <Chapter71Notes />,
      72: <Chapter72Notes />,
      73: <Chapter73Notes />,
      74: <Chapter74Notes />,
      75: <Chapter75Notes />,
      76: <Chapter76Notes />,
      77: <Chapter77Notes />,
      78: <Chapter78Notes />,
      79: <Chapter79Notes />,
      80: <Chapter80Notes />,
      81: <Chapter81Notes />,
    };

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
            <hr className="my-4 border-t border-neutral-200" />
            {chapterNotesMap[index + 1]}
            <div className="mt-4 flex items-center text-gray-700 text-sm">
              <em>Analysis of the two texts conducted mainly using ChatGPT.</em>
            </div>
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