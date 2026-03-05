import React from 'react';
import ChapterTest from '../../../../../ChapterTest';
import { generateLinesAndAnglesQuestions } from '../Topics/Skills/linesAndAnglesQuestions';

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
        <ChapterTest
            questions={allQuestions}
            chapterName="Lines and Angles"
            testLevel="Easy"
            skillId={6201}
            backPath="/middle/grade/6/lines-and-angles"
        />
    );
}
