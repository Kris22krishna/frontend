import React from 'react';
import ChapterTest from '../../../../../ChapterTest';
import { generateLinesAndAnglesQuestions } from '../Topics/Skills/linesAndAnglesQuestions';

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
        <ChapterTest
            questions={allQuestions}
            chapterName="Lines and Angles"
            testLevel="Medium"
            skillId={6202}
            backPath="/middle/grade/6/lines-and-angles"
        />
    );
}
