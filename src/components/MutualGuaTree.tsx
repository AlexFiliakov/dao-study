'use client';

import { useState, useEffect } from 'react';
import { HexagramDetails } from '@/types/HexagramTypes';

export default function MutualGuaTree({ 
    hexagramDetails 
}: { 
    hexagramDetails: Record<string, HexagramDetails> 
}) {
    const all_gua_keys = Array.from({ length: 64 }, (_, i) => i + 1);
    const [mutualStack1, setMutualStack1] = useState<Set<string>>(new Set());
    const [mutualStack2, setMutualStack2] = useState<Set<string>>(new Set());

    useEffect(() => {
        const uniqueMutual1Guas = new Set<string>();
        all_gua_keys.forEach(key => {
            const mutualGua = hexagramDetails[key.toString()].mutual_gua;
            uniqueMutual1Guas.add(mutualGua);
        });
        setMutualStack1(uniqueMutual1Guas);
    }, [hexagramDetails, all_gua_keys]);

    useEffect(() => {
        const uniqueMutual2Guas = new Set<string>();
        mutualStack1.forEach(key => {
            const mutualGua = hexagramDetails[key.toString()].mutual_gua;
            uniqueMutual2Guas.add(mutualGua);
        });
        setMutualStack2(uniqueMutual2Guas);
    }, [hexagramDetails, mutualStack1]);

    return (
        <div className="flex flex-col items-center gap-4">
            <h2 className="font-bold">Tree of Mutual Guas</h2>
            <p>Darker guas are mutuals of their children on the left.</p>
            <div className="flex flex-col text-center gap-8">
                {Array.from(mutualStack2).map((keyMutual2, index, array) => (
                    <>
                    <div key={'mutual2-'+keyMutual2+"-parent"} className="flex flex-row gap-4 items-center">
                        <div key={'mutual2-'+keyMutual2+"-child-container"} className="flex flex-col gap-4">
                            {Array.from(mutualStack1).map(keyMutual1 => {
                                if (hexagramDetails[keyMutual1].mutual_gua === keyMutual2) {
                                    return (
                                        <div key={'mutual-'+keyMutual1+"-parent"} className="flex flex-row gap-4">
                                            {all_gua_keys.map(key => {
                                                if (hexagramDetails[key.toString()].mutual_gua === keyMutual1) {
                                                    return (
                                                        <>
                                                        <div key={'child'+key} className="p-2 border rounded">
                                                            <div className="text-2xl">{hexagramDetails[key.toString()].hexagram}</div>
                                                            <div className="text-sm text-gray-600">{key}</div>
                                                        </div>
                                                        </>
                                                    );
                                                }
                                                return null;
                                            })}
                                            <div key={'mutual-'+keyMutual1} className="flex flex-col p-2 border rounded bg-amber-400">
                                                <div className="text-2xl">{hexagramDetails[keyMutual1].hexagram}</div>
                                                <div className="text-sm text-gray-700">{keyMutual1}</div>
                                            </div>
                                        </div>
                                    );
                                }
                                return null;
                            })}
                        </div>
                        <div key={'mutual2-'+keyMutual2} className="flex flex-col p-2 border rounded h-fit bg-amber-700">
                            <div className="text-2xl text-amber-100">{hexagramDetails[keyMutual2].hexagram}</div>
                            <div className="text-sm text-amber-200">{keyMutual2}</div>
                        </div>
                    </div>
                    {index !== array.length - 1 && (
                        <hr className="w-full border-t border-gray-200" />
                    )}
                    </>
                ))}
            </div>
        </div>
    );
}
