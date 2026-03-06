import React from 'react';
// import ChapterTest from '../../../../../ChapterTest';
import { generateLinesAndAnglesQuestions } from '@/components/practice/grade-6/LinesAndAngles/Topics/Skills/linesAndAnglesQuestions';

export default function LinesAndAnglesMediumTest() {
    // For medium test let's pick intermediate concepts.
    const qLT = generateLinesAndAnglesQuestions('line-types', 3);
    const qAA = generateLinesAndAnglesQuestions('adjacent-angles', 3);
    const qLP = generateLinesAndAnglesQuestions('linear-pair', 4);

    let allQuestions = [...qLT, ...qAA, ...qLP]
        .map((q, idx) => ({ ...q, id: `la-md-${idx}` }))
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
            <h1 className="text-3xl font-bold">Medium Test</h1>
            <p className="mt-4 text-slate-500">Coming soon</p>
        </div>
        // <ChapterTest
        //     questions={allQuestions}
        //     chapterName="Lines and Angles"
        //     testLevel="Medium"
        //     skillId={6202}
        //     backPath="/middle/grade/6/lines-and-angles"
        // />
    );
}
