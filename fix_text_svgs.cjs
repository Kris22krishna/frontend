const fs = require('fs');
const path = require('path');

const dir = 'src/components/practice/class-3/Toy-Joy';

const engineSvg = `<svg width="280" height="150" viewBox="0 0 280 150">
        <circle cx="55" cy="125" r="18" fill="#555" stroke="#333" strokeWidth="3"/>
        <circle cx="55" cy="125" r="8" fill="#999"/>
        <circle cx="115" cy="130" r="14" fill="#555" stroke="#333" strokeWidth="3"/>
        <circle cx="115" cy="130" r="6" fill="#999"/>
        <circle cx="200" cy="130" r="14" fill="#555" stroke="#333" strokeWidth="3"/>
        <circle cx="200" cy="130" r="6" fill="#999"/>
        <rect x="70" y="90" width="180" height="40" rx="6" fill="#9b9b9b"/>
        <polygon points="70,90 250,90 260,80 80,80" fill="#7a7a7a"/>
        <polygon points="250,90 260,80 260,120 250,130" fill="#636363"/>
        <rect x="80" y="50" width="70" height="55" rx="8" fill="#e63946"/>
        <ellipse cx="115" cy="50" rx="35" ry="10" fill="#c1121f"/>
        <ellipse cx="115" cy="105" rx="35" ry="10" fill="#c1121f"/>
        <rect x="175" y="60" width="60" height="50" rx="4" fill="#3a86ff"/>
        <polygon points="175,60 235,60 245,50 185,50" fill="#2667cc"/>
        <polygon points="235,60 245,50 245,100 235,110" fill="#1a4fa0"/>
        <rect x="190" y="72" width="20" height="18" rx="3" fill="#90e0ef"/>
        <polygon points="115,10 95,50 135,50" fill="#ffd166"/>
        <polygon points="210,15 192,50 228,50" fill="#ffd166"/>
        <rect x="100" y="32" width="12" height="20" rx="3" fill="#555"/>
      </svg>`;

const rocketSvg = `<svg width="160" height="260" viewBox="0 0 160 260">
        <rect x="35" y="185" width="90" height="40" rx="5" fill="#e63946"/>
        <polygon points="35,185 125,185 133,177 43,177" fill="#c1121f"/>
        <polygon points="125,185 133,177 133,217 125,225" fill="#a00"/>
        <rect x="45" y="110" width="70" height="80" rx="8" fill="#ff7c2a"/>
        <ellipse cx="80" cy="110" rx="35" ry="10" fill="#e0621a"/>
        <ellipse cx="80" cy="190" rx="35" ry="10" fill="#e0621a"/>
        <polygon points="80,20 45,110 115,110" fill="#ffd166"/>
        <ellipse cx="80" cy="110" rx="35" ry="10" fill="#f4b942"/>
        <rect x="5" y="160" width="32" height="28" rx="3" fill="#3a86ff"/>
        <rect x="123" y="160" width="32" height="28" rx="3" fill="#3a86ff"/>
        <polygon points="80,8 72,22 88,22" fill="#ff0099"/>
      </svg>`;

// 1. Create SharedSVGs.jsx
const sharedContent = `import React from 'react';
export const EngineSVG = () => (${engineSvg});
export const RocketSVG = () => (${rocketSvg});
`;
fs.writeFileSync(path.join(dir, 'SharedSVGs.jsx'), sharedContent);

// Function to process files
function replaceInFile(fileName, modifier) {
    const p = path.join(dir, fileName);
    if (fs.existsSync(p)) {
        let content = fs.readFileSync(p, 'utf8');
        content = modifier(content);
        fs.writeFileSync(p, content);
    }
}

// 2. CountingShapes.jsx
replaceInFile('CountingShapes.jsx', (content) => {
    // Add import
    content = content.replace("import './toy-joy.css';", "import './toy-joy.css';\nimport { EngineSVG, RocketSVG } from './SharedSVGs';");
    
    // Replace SVG blocks with component usage (Regex mapping)
    content = content.replace(/<svg width="280" height="150" viewBox="0 0 280 150">[\s\S]*?<\/svg>/g, '<EngineSVG />');
    content = content.replace(/<svg width="160" height="260" viewBox="0 0 160 260">[\s\S]*?<\/svg>/g, '<RocketSVG />');
    
    // Replace texts
    content = content.replace(/ \(\s*from the textbook\s*\)/gi, '');
    content = content.replace(/Devika's toy engine \(from the textbook\)/gi, "this toy engine");
    content = content.replace(/Devika's toy engine/gi, 'this toy engine');
    
    // For Q3, Q4, Q5 add the SVG
    content = content.replace(/(In this toy engine[\s\S]*?red boiler part\?<\/p>)/, "$1\n    <div style={{display:'flex',justifyContent:'center',margin:'14px 0'}}><EngineSVG /></div>");
    content = content.replace(/(In this toy engine, the <strong>cabin.*?<\/p>)/, "$1\n    <div style={{display:'flex',justifyContent:'center',margin:'14px 0'}}><EngineSVG /></div>");
    content = content.replace(/(Match each part of this toy engine[\s\S]*?<\/p>)/, "$1\n    <div style={{display:'flex',justifyContent:'center',margin:'14px 0'}}><EngineSVG /></div>");

    // Add value and onChange to inputs
    content = content.replace(/<input id="rc-cone" type="number" min="0" max="9" placeholder="\?"\/>/, 
        `<input id="rc-cone" type="number" min="0" max="9" placeholder="?" value={rocket.cone} onChange={e => setRocket(p => ({...p, cone: e.target.value}))}/>`);
    content = content.replace(/<input id="rc-cyl" type="number" min="0" max="9" placeholder="\?"\/>/, 
        `<input id="rc-cyl" type="number" min="0" max="9" placeholder="?" value={rocket.cyl} onChange={e => setRocket(p => ({...p, cyl: e.target.value}))}/>`);
    content = content.replace(/<input id="rc-cub" type="number" min="0" max="9" placeholder="\?"\/>/, 
        `<input id="rc-cub" type="number" min="0" max="9" placeholder="?" value={rocket.cub} onChange={e => setRocket(p => ({...p, cub: e.target.value}))}/>`);
    
    // Remove check answer button
    content = content.replace(/<button className="check-btn".*?<\/button>/, '');
    
    return content;
});

// 3. DescribingPosition.jsx
replaceInFile('DescribingPosition.jsx', (content) => {
    content = content.replace("import './toy-joy.css';", "import './toy-joy.css';\nimport { RocketSVG } from './SharedSVGs';");
    
    content = content.replace(/In the rocket model from the chapter/g, "In this rocket model");
    
    // Add RocketSVG exactly under that paragraph
    content = content.replace(/(In this rocket model, the <strong>cylindrical body.*?<\/p>)/, "$1\n    <div style={{display:'flex',justifyContent:'center',margin:'14px 0'}}><RocketSVG /></div>");
    
    content = content.replace(/In the chapter question: "Which shape/g, 'Which shape');
    
    content = content.replace(/from page 14 of the chapter/g, "");
    
    return content;
});

// 4. PropertiesOf3DShapes.jsx
replaceInFile('PropertiesOf3DShapes.jsx', (content) => {
    content = content.replace(/From the textbook question \(Q3, page 12\):\s*w/gi, 'W');
    content = content.replace(/From the textbook \(Q3, p.12\):\s*W/gi, 'W');
    return content;
});

// 5. ClassifyingShapes.jsx
replaceInFile('ClassifyingShapes.jsx', (content) => {
    content = content.replace(/The textbook says:\s*<em>"Note that a cube is a special type of cuboid."<\/em>/gi, '<em>"Note that a cube is a special type of cuboid."</em>');
    return content;
});

console.log("Fixed texts, SVGs, and input states");
