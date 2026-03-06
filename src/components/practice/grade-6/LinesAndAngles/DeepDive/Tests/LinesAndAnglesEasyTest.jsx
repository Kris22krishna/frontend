import React from 'react';
// import ChapterTest from '../../../../../ChapterTest';
import { generateLinesAndAnglesQuestions } from '@/components/practice/grade-6/LinesAndAngles/Topics/Skills/linesAndAnglesQuestions';

export default function LinesAndAnglesEasyTest() {
    // We can pull questions from various topics. For easy test let's pick basic ones.
    const qIntro = generateLinesAndAnglesQuestions('intro', 4);
    const qLSR = generateLinesAndAnglesQuestions('line-segment-ray', 3);
    const qAT = generateLinesAndAnglesQuestions('angle-types', 3);

    let allQuestions = [...qIntro, ...qLSR, ...qAT]
        .map((q, idx) => ({ ...q, id: `la-ez-${idx}` }))
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
            <h1 className="text-3xl font-bold">Easy Test</h1>
            <p className="mt-4 text-slate-500">Coming soon</p>
        </div>
        // <ChapterTest
        //     questions={allQuestions}
        //     chapterName="Lines and Angles"
        //     testLevel="Easy"
        //     skillId={6201}
        //     backPath="/middle/grade/6/lines-and-angles"
        // />
    );
}
