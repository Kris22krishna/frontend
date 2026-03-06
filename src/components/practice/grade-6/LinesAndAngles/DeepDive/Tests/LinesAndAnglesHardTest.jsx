import React from 'react';
// import ChapterTest from '../../../../../ChapterTest';
import { generateLinesAndAnglesQuestions } from '@/components/practice/grade-6/LinesAndAngles/Topics/Skills/linesAndAnglesQuestions';

export default function LinesAndAnglesHardTest() {
    // For hard test let's pick advanced geometric concepts.
    const qVO = generateLinesAndAnglesQuestions('vertically-opposite', 4);
    const qTrans = generateLinesAndAnglesQuestions('transversal-angles', 4);
    const qAP = generateLinesAndAnglesQuestions('angles-at-point', 2);

    let allQuestions = [...qVO, ...qTrans, ...qAP]
        .map((q, idx) => ({ ...q, id: `la-hd-${idx}` }))
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
            <h1 className="text-3xl font-bold">Hard Test</h1>
            <p className="mt-4 text-slate-500">Coming soon</p>
        </div>
        // <ChapterTest
        //     questions={allQuestions}
        //     chapterName="Lines and Angles"
        //     testLevel="Hard"
        //     skillId={6203}
        //     backPath="/middle/grade/6/lines-and-angles"
        // />
    );
}
