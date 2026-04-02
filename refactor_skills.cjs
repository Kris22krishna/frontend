const fs = require('fs');

const skillMeta = {
    'Identifying3DShapes': { id: 'TJ-01', name: 'Identifying 3D Shapes' },
    'CountingShapes': { id: 'TJ-02', name: 'Counting Shapes in a Model' },
    'DescribingPosition': { id: 'TJ-03', name: 'Describing Position of Shapes' },
    'PropertiesOf3DShapes': { id: 'TJ-04', name: 'Properties of 3D Shapes' },
    'ClassifyingShapes': { id: 'TJ-05', name: 'Classifying Shapes' },
    'OppositeFacesCube': { id: 'TJ-06', name: 'Opposite Faces of a Cube' },
    'BuildingCombiningShapes': { id: 'TJ-07', name: 'Building and Combining Shapes' },
    'SequencingModelConstruction': { id: 'TJ-08', name: 'Sequencing a Model Construction' }
};

const files = fs.readdirSync('src/components/practice/class-3/Toy-Joy').filter(f => Object.keys(skillMeta).some(k => f.includes(k)));

files.forEach(f => {
    const p = 'src/components/practice/class-3/Toy-Joy/' + f;
    const content = fs.readFileSync(p, 'utf8');
    const skillKey = f.replace('.jsx', '');
    const meta = skillMeta[skillKey];

    // Find the 5 qcards
    const qcards = [];
    // A regex to match <div className="qcard" ... to the matching closing </div>
    // This is safely done by replacing <div className="qcard" with a marker if needed, but since it's just regex
    // We can split by `<div className="qcard"` or `<div className="qcard">` and recombine
    
    // Use split string technique
    const parts = content.split('<div className="qcard"');
    if (parts.length > 1) {
        for (let i = 1; i < parts.length; i++) {
            let part = '<div className="qcard"' + parts[i];
            
            // To find the exact end, we look for the next <div className="qcard" (handled by split)
            // Exception: the last card goes until </section>
            if (i === parts.length - 1) {
                const sectionIdx = part.lastIndexOf('</section>');
                if (sectionIdx !== -1) {
                    part = part.substring(0, sectionIdx);
                }
            }
            // Add a key wrapper for React array iterators
            qcards.push(`<>` + part + `</>`);
        }
    }

    const code = `import React from 'react';
import { useToyJoyLogic } from './useToyJoyLogic';
import ToyJoyPracticeTemplate from './ToyJoyPracticeTemplate';
import './toy-joy.css';

const ${skillKey} = () => {
    const logicProps = useToyJoyLogic();
    const { 
        handleMcq, getMcqClass, 
        handleTf, getTfClass, 
        handleMatch, getMatchClass,
        handleSinglePic, getSinglePicClass,
        toggleMultiPic, getMultiPicClass, checkMultiPick,
        rocket, setRocket, handleCheckRocket,
        fb 
    } = logicProps;

    const questions = [
        ${qcards.join(',\n        ')}
    ];

    return (
        <ToyJoyPracticeTemplate 
            skillId="${meta.id}" 
            skillName="${meta.name}" 
            questions={questions} 
            logicProps={logicProps} 
        />
    );
};

export default ${skillKey};
`;

    fs.writeFileSync(p, code);
});

console.log("Refactored skills");
