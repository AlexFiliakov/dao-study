'use client';

import React, { useState } from 'react';
import { CircleHelp } from 'lucide-react';
import TaoistButton from '@/components/TaoistButton';

interface HexagramDetails {
  hexagram: string;
  gua: string;
  pronunciation: string;
  translation: string;
  opposite_gua: string;
  inverse_gua: string;
  mutual_gua: string;
  binary: string;
}

interface HexagramGeneratorProps {
  hexagramDetails: Record<string, HexagramDetails>;
}

export default function HexagramGenerator({ hexagramDetails }: HexagramGeneratorProps) {
  const [selectedHexagram, setSelectedHexagram] = useState<HexagramDetails | null>(null);
  const [approachedHexagram, setApproachedHexagram] = useState<HexagramDetails | null>(null);
  const [thrownHexagram, setThrownHexagram] = useState('');
  const [showApproachedHelp, setShowApproachedHelp] = useState(false);
  const [showMutualHelp, setShowMutualHelp] = useState(false);

  const lookupHexagramByBinary = (binary_lookup: string) => {
    const hexagramKey = Object.keys(hexagramDetails).find(key => hexagramDetails[key].binary === binary_lookup);
    if (!hexagramKey) {
      console.error('No matching hexagram found');
      return '';
    }
    return hexagramKey;
  }

  const convertApproachedLine = (line: number) => {
    switch (line) {
      case 0: // 0 = moving yin
        return 1;
      case 1: // 1 = stable yang
        return 1;
      case 2: // 2 = stable yin
        return 0;
      case 3: // 3 = moving yang
        return 0;
      default:
        console.error('Wrong line input, must be 0-3');
        return -1;
    }
  }

  const diagramThrownLine = (line: number) => {
    switch (line) {
        case 0: // 0 = moving yin
            return '⚊×⚊';
        case 1: // 1 = stable yang
            return '⚊⚊⚊';
        case 2: // 2 = stable yin
            return '⚊ ⚊';
        case 3: // 3 = moving yang
            return '⚊⊖⚊';
        default:
            console.error('Wrong line input, must be 0-3');
            return '';
    }
  }

  const generateHexagram = () => {
    const rng = () => {
        // Use current timestamp as seed
        // const seed = Date.now();
        const x = Math.random();
        return x - Math.floor(x);
    };
    
    // 0 = moving yin ⚊◯⚊
    // 1 = stable yang ⚊⚊⚊
    // 2 = stable yin ⚊ ⚊
    // 3 = moving yang ⚊×⚊
    const firstLine = Math.floor(rng() * 2) + Math.floor(rng() * 2) + Math.floor(rng() * 2);
    const secondLine = Math.floor(rng() * 2) + Math.floor(rng() * 2) + Math.floor(rng() * 2);
    const thirdLine = Math.floor(rng() * 2) + Math.floor(rng() * 2) + Math.floor(rng() * 2);
    const fourthLine = Math.floor(rng() * 2) + Math.floor(rng() * 2) + Math.floor(rng() * 2);
    const fifthLine = Math.floor(rng() * 2) + Math.floor(rng() * 2) + Math.floor(rng() * 2);
    const sixthLine = Math.floor(rng() * 2) + Math.floor(rng() * 2) + Math.floor(rng() * 2);

    // generate the given gua
    const binary_lookup = (firstLine % 2).toString()
        + (secondLine % 2).toString()
        + (thirdLine % 2).toString()
        + (fourthLine % 2).toString()
        + (fifthLine % 2).toString()
        + (sixthLine % 2).toString();

    const hexagramKey = lookupHexagramByBinary(binary_lookup);
    if (hexagramKey == '') {
      console.error('No matching hexagram found');
      return;
    }

    const thrownHexagram = diagramThrownLine(sixthLine) + "<br />"
                            + diagramThrownLine(fifthLine) + "<br />"
                            + diagramThrownLine(fourthLine) + "<br />"
                            + diagramThrownLine(thirdLine) + "<br />"
                            + diagramThrownLine(secondLine) + "<br />"
                            + diagramThrownLine(firstLine);
    setThrownHexagram(thrownHexagram);

    const hexagram = hexagramDetails[hexagramKey];
    setSelectedHexagram(hexagram);

    // Calculate approached gua
    const approached_binary = (convertApproachedLine(firstLine) % 2).toString()
                                + (convertApproachedLine(secondLine) % 2).toString()
                                + (convertApproachedLine(thirdLine) % 2).toString()
                                + (convertApproachedLine(fourthLine) % 2).toString()
                                + (convertApproachedLine(fifthLine) % 2).toString()
                                + (convertApproachedLine(sixthLine) % 2).toString();
    const approachedHexagramKey = lookupHexagramByBinary(approached_binary);
    if (approachedHexagramKey == '') {
        console.error('No matching approached hexagram found');
        return;
      }
  
    const approachedHexagram = hexagramDetails[approachedHexagramKey];
    setApproachedHexagram(approachedHexagram);

    // Calculate the lines to consult
    // const total_moving_lines = 6 - [firstLine, secondLine, thirdLine, fourthLine, fifthLine, sixthLine].filter(line => line < 3).filter(line => line > 0).length;
    // switch (total_moving_lines) {
    //   case 0:
    //     setApproachedHexagram(null);
    //     break;
    //   case 1:
    //     const approached_binary = (convertApproachedLine(firstLine) % 2).toString()
    //                                 + (convertApproachedLine(secondLine) % 2).toString()
    //                                 + (convertApproachedLine(thirdLine) % 2).toString()
    //                                 + (convertApproachedLine(fourthLine) % 2).toString()
    //                                 + (convertApproachedLine(fifthLine) % 2).toString()
    //                                 + (convertApproachedLine(sixthLine) % 2).toString();
    //     break;
    //   case 2: // start by testing for moving Yin and Yang, and only shift the Yin line
    //     if (firstLine == 0 && (secondLine == 3 || thirdLine == 3 || fourthLine == 3 || fifthLine == 3 || sixthLine == 3)) {
    //         const approached_binary = (convertApproachedLine(firstLine) % 2).toString()
    //                                     + (secondLine % 2).toString()
    //                                     + (thirdLine % 2).toString()
    //                                     + (fourthLine % 2).toString()
    //                                     + (fifthLine % 2).toString()
    //                                     + (sixthLine % 2).toString();
    //     } else if (secondLine == 0 && (firstLine == 3 || thirdLine == 3 || fourthLine == 3 || fifthLine == 3 || sixthLine == 3)) {
    //         const approached_binary = (firstLine % 2).toString()
    //                                     + (convertApproachedLine(secondLine) % 2).toString()
    //                                     + (thirdLine % 2).toString()
    //                                     + (fourthLine % 2).toString()
    //                                     + (fifthLine % 2).toString()
    //                                     + (sixthLine % 2).toString();
    //     } else if (thirdLine == 0 && (firstLine == 3 || secondLine == 3 || fourthLine == 3 || fifthLine == 3 || sixthLine == 3)) {
    //         const approached_binary = (firstLine % 2).toString()
    //                                     + (secondLine % 2).toString()
    //                                     + (convertApproachedLine(thirdLine) % 2).toString()
    //                                     + (fourthLine % 2).toString()
    //                                     + (fifthLine % 2).toString()
    //                                     + (sixthLine % 2).toString();
    //     } else if (fourthLine == 0 && (firstLine == 3 || secondLine == 3 || thirdLine == 3 || fifthLine == 3 || sixthLine == 3)) {
    //         const approached_binary = (firstLine % 2).toString()
    //                                     + (secondLine % 2).toString()
    //                                     + (thirdLine % 2).toString()
    //                                     + (convertApproachedLine(fourthLine) % 2).toString()
    //                                     + (fifthLine % 2).toString()
    //                                     + (sixthLine % 2).toString();
    //     } else if (fifthLine == 0 && (firstLine == 3 || secondLine == 3 || thirdLine == 3 || fourthLine == 3 || sixthLine == 3)) {
    //         const approached_binary = (firstLine % 2).toString()
    //                                     + (secondLine % 2).toString()
    //                                     + (thirdLine % 2).toString()
    //                                     + (fourthLine % 2).toString()
    //                                     + (convertApproachedLine(fifthLine) % 2).toString()
    //                                     + (sixthLine % 2).toString();
    //     } else if (sixthLine == 0 && (firstLine == 3 || secondLine == 3 || thirdLine == 3 || fourthLine == 3 || fifthLine == 3)) {
    //         const approached_binary = (firstLine % 2).toString()
    //                                     + (secondLine % 2).toString()
    //                                     + (thirdLine % 2).toString()
    //                                     + (fourthLine % 2).toString()
    //                                     + (fifthLine % 2).toString()
    //                                     + (convertApproachedLine(sixthLine) % 2).toString();
    //     } else if (sixthLine == 0) { // now we test for two Yin lines and shift the last Yin line
    //         const approached_binary = (firstLine % 2).toString()
    //                                     + (secondLine % 2).toString()
    //                                     + (thirdLine % 2).toString()
    //                                     + (fourthLine % 2).toString()
    //                                     + (fifthLine % 2).toString()
    //                                     + (convertApproachedLine(sixthLine) % 2).toString();
    //     } else if (fifthLine == 0) {
    //         const approached_binary = (firstLine % 2).toString()
    //                                     + (secondLine % 2).toString()
    //                                     + (thirdLine % 2).toString()
    //                                     + (fourthLine % 2).toString()
    //                                     + (convertApproachedLine(fifthLine) % 2).toString()
    //                                     + (sixthLine % 2).toString();
    //     } else if (fourthLine == 0) {
    //         const approached_binary = (firstLine % 2).toString()
    //                                     + (secondLine % 2).toString()
    //                                     + (thirdLine % 2).toString()
    //                                     + (convertApproachedLine(fourthLine) % 2).toString()
    //                                     + (fifthLine % 2).toString()
    //                                     + (sixthLine % 2).toString();
    //     } else if (thirdLine == 0) {
    //         const approached_binary = (firstLine % 2).toString()
    //                                     + (secondLine % 2).toString()
    //                                     + (convertApproachedLine(thirdLine) % 2).toString()
    //                                     + (fourthLine % 2).toString()
    //                                     + (fifthLine % 2).toString()
    //                                     + (sixthLine % 2).toString();
    //     } else if (secondLine == 0) {
    //         const approached_binary = (firstLine % 2).toString()
    //                                     + (convertApproachedLine(secondLine) % 2).toString()
    //                                     + (thirdLine % 2).toString()
    //                                     + (fourthLine % 2).toString()
    //                                     + (fifthLine % 2).toString()
    //                                     + (sixthLine % 2).toString();
    //     } else if (sixthLine == 3) { // now we test for two Yang lines and shift the last Yang line
    //         const approached_binary = (firstLine % 2).toString()
    //                                     + (secondLine % 2).toString()
    //                                     + (thirdLine % 2).toString()
    //                                     + (fourthLine % 2).toString()
    //                                     + (fifthLine % 2).toString()
    //                                     + (convertApproachedLine(sixthLine) % 2).toString();
    //     } else if (fifthLine == 3) {
    //         const approached_binary = (firstLine % 2).toString()
    //                                     + (secondLine % 2).toString()
    //                                     + (thirdLine % 2).toString()
    //                                     + (fourthLine % 2).toString()
    //                                     + (convertApproachedLine(fifthLine) % 2).toString()
    //                                     + (sixthLine % 2).toString();
    //     } else if (fourthLine == 3) {
    //         const approached_binary = (firstLine % 2).toString()
    //                                     + (secondLine % 2).toString()
    //                                     + (thirdLine % 2).toString()
    //                                     + (convertApproachedLine(fourthLine) % 2).toString()
    //                                     + (fifthLine % 2).toString()
    //                                     + (sixthLine % 2).toString();
    //     } else if (thirdLine == 3) {
    //         const approached_binary = (firstLine % 2).toString()
    //                                     + (secondLine % 2).toString()
    //                                     + (convertApproachedLine(thirdLine) % 2).toString()
    //                                     + (fourthLine % 2).toString()
    //                                     + (fifthLine % 2).toString()
    //                                     + (sixthLine % 2).toString();
    //     } else if (secondLine == 3) {
    //         const approached_binary = (firstLine % 2).toString()
    //                                     + (convertApproachedLine(secondLine) % 2).toString()
    //                                     + (thirdLine % 2).toString()
    //                                     + (fourthLine % 2).toString()
    //                                     + (fifthLine % 2).toString()
    //                                     + (sixthLine % 2).toString();
    //     } else {
    //         console.error('Moving lines miscalculated for 2 moving lines');
    //     }
    //     break;
    //   case 3: // now we pull the middle moving line only
    //     if (firstLine == 0 || firstLine == 3) {
    //         if (secondLine == 0 || secondLine == 3) { // second line is then the middle line
    //             const approached_binary = (firstLine % 2).toString()
    //             + (convertApproachedLine(secondLine) % 2).toString()
    //             + (thirdLine % 2).toString()
    //             + (fourthLine % 2).toString()
    //             + (fifthLine % 2).toString()
    //             + (sixthLine % 2).toString();
    //         } else if (thirdLine == 0 || thirdLine == 3) { // third line is then the middle line
    //             const approached_binary = (firstLine % 2).toString()
    //             + (secondLine % 2).toString()
    //             + (convertApproachedLine(thirdLine) % 2).toString()
    //             + (fourthLine % 2).toString()
    //             + (fifthLine % 2).toString()
    //             + (sixthLine % 2).toString();
    //         } else if (fourthLine == 0 || fourthLine == 3) { // fourth line must be the middle then
    //             const approached_binary = (firstLine % 2).toString()
    //             + (secondLine % 2).toString()
    //             + (thirdLine % 2).toString()
    //             + (convertApproachedLine(fourthLine) % 2).toString()
    //             + (fifthLine % 2).toString()
    //             + (sixthLine % 2).toString();
    //         } else { // otherwise the fifth line is the middle
    //             const approached_binary = (firstLine % 2).toString()
    //             + (secondLine % 2).toString()
    //             + (thirdLine % 2).toString()
    //             + (fourthLine % 2).toString()
    //             + (convertApproachedLine(fifthLine) % 2).toString()
    //             + (sixthLine % 2).toString();
    //         }
    //     } else if (secondLine == 0 || secondLine == 3) {
    //         if (thirdLine == 0 || thirdLine == 3) { // third line is then the middle line
    //             const approached_binary = (firstLine % 2).toString()
    //             + (secondLine % 2).toString()
    //             + (convertApproachedLine(thirdLine) % 2).toString()
    //             + (fourthLine % 2).toString()
    //             + (fifthLine % 2).toString()
    //             + (sixthLine % 2).toString();
    //         } else if (fourthLine == 0 || fourthLine == 3) { // fourth line must be the middle then
    //             const approached_binary = (firstLine % 2).toString()
    //             + (secondLine % 2).toString()
    //             + (thirdLine % 2).toString()
    //             + (convertApproachedLine(fourthLine) % 2).toString()
    //             + (fifthLine % 2).toString()
    //             + (sixthLine % 2).toString();
    //         } else { // otherwise the fifth line is the middle
    //             const approached_binary = (firstLine % 2).toString()
    //             + (secondLine % 2).toString()
    //             + (thirdLine % 2).toString()
    //             + (fourthLine % 2).toString()
    //             + (convertApproachedLine(fifthLine) % 2).toString()
    //             + (sixthLine % 2).toString();
    //         }
    //     } else if (thirdLine == 0 || thirdLine == 3) {
    //         if (fourthLine == 0 || fourthLine == 3) { // fourth line must be the middle then
    //             const approached_binary = (firstLine % 2).toString()
    //             + (secondLine % 2).toString()
    //             + (thirdLine % 2).toString()
    //             + (convertApproachedLine(fourthLine) % 2).toString()
    //             + (fifthLine % 2).toString()
    //             + (sixthLine % 2).toString();
    //         } else { // otherwise the fifth line is the middle
    //             const approached_binary = (firstLine % 2).toString()
    //             + (secondLine % 2).toString()
    //             + (thirdLine % 2).toString()
    //             + (fourthLine % 2).toString()
    //             + (convertApproachedLine(fifthLine) % 2).toString()
    //             + (sixthLine % 2).toString();
    //         }
    //     } else if (fourthLine == 0 || fourthLine == 3) { // that means the last 3 lines are moving
    //         const approached_binary = (firstLine % 2).toString()
    //                                     + (secondLine % 2).toString()
    //                                     + (thirdLine % 2).toString()
    //                                     + (fourthLine % 2).toString()
    //                                     + (convertApproachedLine(fifthLine) % 2).toString()
    //                                     + (sixthLine % 2).toString();
    //     }
    //     break;
    //   case 4:
    //     break;
    //   case 5:
    //     break;
    //   case 6:
    //     break;
    //   default:
    //     console.error('Moving lines miscalculated');
    // }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <TaoistButton variant="accent" onClick={generateHexagram}>
        Generate Hexagram
      </TaoistButton>
      
      {selectedHexagram && (
        <>
        <div className="text-center">
            <h2 className="font-bold">Thrown Gua</h2>
            <div id="thrown-gua" className="my-4 p-2 text-gray-800 leading-none bg-gray-100 rounded-lg inline-block"
                dangerouslySetInnerHTML={{ __html: thrownHexagram }}
            />
            <div className="text-4xl mb-2">{selectedHexagram.hexagram}</div>
            <div className="text-xl mb-1">{selectedHexagram.gua}</div>
            <div className="text-lg text-gray-600">{selectedHexagram.pronunciation}</div>
            <div className="mt-4 text-gray-800">{selectedHexagram.translation}</div>
        </div>
        <hr className="w-full border-t border-gray-200" />
        <div className="text-center bg-gray-100 p-2 rounded-lg">
            <div className="flex flex-row justify-center relative">
                <CircleHelp 
                    className="text-red-800 mr-1 cursor-help"
                    onMouseEnter={() => setShowApproachedHelp(true)}
                    onMouseLeave={() => setShowApproachedHelp(false)}
                />
                <h2 className="font-bold">Approached Gua</h2>
                <div 
                    id="approached-gua" 
                    className={`absolute left-1/2 -translate-x-1/2 top-8 text-left bg-gray-100 p-6 rounded-lg shadow-lg 
                        transition-opacity duration-200 w-[600px] max-w-[90vw] z-50 ${
                        showApproachedHelp ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                    onMouseEnter={() => setShowApproachedHelp(true)}
                    onMouseLeave={() => setShowApproachedHelp(false)}
                >
                    <h2 className="font-bold">Approached Gua</h2>
                    <p>This is a gua formed after moving lines alternate between yin and yang. It indicates one's future tendency or potential.</p>
                    <ol style={{ listStyleType: 'decimal', paddingLeft: '1rem' }}>
                        <li>If there is no moving line, only consult the main gua.</li>
                        <li>If there is exactly one moving line, pay special attention to the Yao Text for this line, and then consult the approached gua.</li>
                        <li>If there are two moving lines—one yin and the other yang—consult only the yin moving line.</li>
                        <li>If the two moving lines are both yin or both yang, consult the lower one.</li>
                        <li>If there are three moving lines, consult only the middle one.</li>
                        <li>If there are four moving lines, consult only the upper of the two nonmoving lines.</li>
                        <li>If there are five moving lines, consult only the other, nonmoving line.</li>
                        <li>If six lines are all moving, consult the Decision of the new gua, the approached gua.</li>
                        <li>Since there is a seventh invisible line in the first and second gua, Qian and Kun, for these gua consult the seventh Yao Text, called All Nines or All Sixes.</li>
                    </ol>
                    <br />
                    <p className="text-sm">Source: "The Complete I Ching" by Taoist Master Alfred Huang, Page 17.</p>
                </div>
            </div>
            <div className="text-4xl mb-2">{approachedHexagram?.hexagram}</div>
            <div className="text-xl mb-1">{approachedHexagram?.gua}</div>
            <div className="text-lg text-gray-600">{approachedHexagram?.pronunciation}</div>
            <div className="mt-4 text-gray-800">{approachedHexagram?.translation}</div>
        </div>
        <hr className="w-full border-t border-gray-200" />
        <div className="flex flex-row justify-center gap-4">
            <div className="text-center bg-gray-100 p-2 rounded-lg">
                <h2 className="font-bold">Opposite Gua</h2>
                <div className="text-4xl mb-2">{hexagramDetails[selectedHexagram.opposite_gua].hexagram}</div>
                <div className="text-xl mb-1">{hexagramDetails[selectedHexagram.opposite_gua].gua}</div>
                <div className="text-lg text-gray-600">{hexagramDetails[selectedHexagram.opposite_gua].pronunciation}</div>
                <div className="mt-4 text-gray-800">{hexagramDetails[selectedHexagram.opposite_gua].translation}</div>
            </div>
            <div className="text-center bg-gray-100 p-2 rounded-lg">
                <h2 className="font-bold">Inverse Gua</h2>
                <div className="text-4xl mb-2">{hexagramDetails[selectedHexagram.inverse_gua].hexagram}</div>
                <div className="text-xl mb-1">{hexagramDetails[selectedHexagram.inverse_gua].gua}</div>
                <div className="text-lg text-gray-600">{hexagramDetails[selectedHexagram.inverse_gua].pronunciation}</div>
                <div className="mt-4 text-gray-800">{hexagramDetails[selectedHexagram.inverse_gua].translation}</div>
            </div>
            <div className="text-center bg-gray-100 p-2 rounded-lg">
                <div className="flex flex-row justify-center relative">
                    <CircleHelp 
                        className="text-red-800 mr-1 cursor-help"
                        onMouseEnter={() => setShowMutualHelp(true)}
                        onMouseLeave={() => setShowMutualHelp(false)}
                    />
                    <h2 className="font-bold">Mutual Gua</h2>
                    <div 
                    id="mutual-gua" 
                    className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-left bg-gray-100 p-6 rounded-lg shadow-lg 
                        transition-opacity duration-200 w-[800px] max-w-[90vw] z-50 ${
                        showMutualHelp ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                    onMouseEnter={() => setShowMutualHelp(true)}
                    onMouseLeave={() => setShowMutualHelp(false)}
                    >
                        <div className="max-h-[80vh] overflow-y-auto">
                            <h2 className="font-bold text-xl mb-4">Mutual Gua</h2>
                            <p className="mb-4 leading-relaxed">
                                If you want to know more about your present situation, 
                                you can get insight from the mutual gua, 
                                formed by the mutual intersections of the second, third, fourth, and fifth lines. 
                                The ancient sages considered these four lines to be the heart of any six-line gua. 
                                A mutual gua is formed by two trigrams. 
                                The second, third, and fourth lines of the original gua form the lower, or inner, mutual gua. 
                                The third, fourth, and fifth lines form the upper, or outer, mutual gua. 
                                Put the lower mutual gua and the upper mutual gua together and a six-line mutual gua is obtained. 
                                When you have the six-line mutual gua, read the name, symbol, King Wen's Decision, and Confucius's Commentary. 
                                The hidden meaning of any gua lies in its mutual gua; it should not be ignored.
                            </p>
                            <br />
                            <p className="text-sm">Source: "The Complete I Ching" by Taoist Master Alfred Huang, Page 17.</p>
                        </div>
                    </div>
                </div>
                <div className="text-4xl mb-2">{hexagramDetails[selectedHexagram.mutual_gua].hexagram}</div>
                <div className="text-xl mb-1">{hexagramDetails[selectedHexagram.mutual_gua].gua}</div>
                <div className="text-lg text-gray-600">{hexagramDetails[selectedHexagram.mutual_gua].pronunciation}</div>
                <div className="mt-4 text-gray-800">{hexagramDetails[selectedHexagram.mutual_gua].translation}</div>
            </div>
        </div>
        </>
      )}
    </div>
  );
}