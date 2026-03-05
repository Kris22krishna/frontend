import React from 'react';
import ChapterTest from '../../../../../ChapterTest';
import { generateLinesAndAnglesQuestions } from '../Topics/Skills/linesAndAnglesQuestions';

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
        <ChapterTest
            questions={allQuestions}
            chapterName="Lines and Angles"
            testLevel="Hard"
            skillId={6203}
            backPath="/middle/grade/6/lines-and-angles"
        />
    );
}
