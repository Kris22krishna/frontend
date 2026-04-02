const fs = require('fs');
const path = require('path');

const dir = 'src/components/practice/class-3/Toy-Joy';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx') && !f.includes('Template') && !f.includes('Shared'));

// Map of old text -> new text for each file
const replacements = {
    'SequencingModelConstruction.jsx': [
        [
            /From Q8 \(page 14\): In what order is this table model built\? Which step comes <strong>first<\/strong>\?/g,
            'Look at the table model below. It is built step by step using 3D shapes. Which step comes <strong>first</strong>?'
        ],
        [
            /In the "Construct and Describe" activity \(page 11\), the example says: <em>"The cylinder is \[beside\] the cuboid\. The cone is on the cylinder\."<\/em> Which shape is placed <strong>last<\/strong>\?/g,
            'A model is built like this: <em>"The cylinder is beside the cuboid. The cone is placed on top of the cylinder."</em> Which shape is placed <strong>last</strong>?'
        ],
        [
            /Jaya builds a house \(page 10\) using a <strong>cylinder<\/strong> body and a <strong>cone<\/strong> as the roof\. Which picture shows the <strong>correct order<\/strong> of construction\?/g,
            'Priya builds a toy house using a <strong>cylinder</strong> as the body and a <strong>cone</strong> as the roof. Which picture shows the <strong>correct order</strong> of construction?'
        ],
    ],
    'OppositeFacesCube.jsx': [
        [
            /Look at this die \(from Q7, page 14\)\. The face showing <strong>1 dot<\/strong> is at the front\. Which number is on the face <strong>opposite<\/strong> to it \(at the back\)\?/g,
            'Look at this die. The face showing <strong>1 dot</strong> is at the front. On a standard die, opposite faces always add up to 7. Which number is on the face <strong>opposite</strong> to 1 (at the back)?'
        ],
        [
            /On a standard die \(Q7, page 14\), what is the face <strong>opposite to 3<\/strong>\?/g,
            'On a standard die, opposite faces always add up to 7. What is the face <strong>opposite to 3</strong>?'
        ],
    ],
    'ClassifyingShapes.jsx': [
        [
            /From Q2 \(page 12\): <strong>Click all the Cubes<\/strong> in the picture below\./g,
            'Look at the shapes below. <strong>Click all the Cubes</strong>.'
        ],
        [
            /From Q2 \(page 12\): <strong>Click all the Cones<\/strong>\./g,
            'Look at the shapes below. <strong>Click all the Cones</strong>.'
        ],
        [
            /Match the classroom object to its shape group \(like in the Q1 table on page 11\)\. Click left then right\./g,
            'Match each classroom object to its correct 3D shape group. Click left then right.'
        ],
    ],
    'BuildingCombiningShapes.jsx': [
        [
            /From Q9 \(page 15\): <strong>3 cubes are joined in a straight line<\/strong>\. What does the combined shape look like\?/g,
            'Imagine <strong>3 cubes joined in a straight line</strong>. What does the combined shape look like?'
        ],
        [
            /From Q11 \(page 15\): You need to use <strong>6 dice<\/strong> to make a cuboid\. How many dice wide × long × tall could this be\?/g,
            'You need to use <strong>6 dice</strong> to build a cuboid. How many dice wide × long × tall could this be?'
        ],
        [
            /From Q10 \(page 15\): These models are made from cuboids\. Which model has the <strong>most number of cuboids<\/strong>\?/g,
            'Look at these models made from cuboids. Which model has the <strong>most number of cuboids</strong>?'
        ],
        [
            /Match the number of cubes to the shape it makes \(from Q11, page 15\)\./g,
            'Match the number of cubes to the shape it makes when joined together.'
        ],
    ],
};

files.forEach(f => {
    const p = path.join(dir, f);
    let content = fs.readFileSync(p, 'utf8');
    const reps = replacements[f];
    if (!reps) return;
    
    let changed = false;
    reps.forEach(([from, to]) => {
        const prev = content;
        content = content.replace(from, to);
        if (content !== prev) changed = true;
    });
    
    if (changed) {
        fs.writeFileSync(p, content);
        console.log(`Fixed: ${f}`);
    }
});

console.log('Done removing all page/chapter/textbook references.');
