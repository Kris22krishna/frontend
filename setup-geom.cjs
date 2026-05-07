const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'src', 'components', 'Math-Branches');
const calcDir = path.join(baseDir, 'Calculus');
const geomDir = path.join(baseDir, 'Coordinate-Geometry');

// Create directories
if (!fs.existsSync(geomDir)) fs.mkdirSync(geomDir);
if (!fs.existsSync(path.join(geomDir, 'Engines'))) fs.mkdirSync(path.join(geomDir, 'Engines'));

// 1. CSS
let css = fs.readFileSync(path.join(calcDir, 'calculus.css'), 'utf-8');
css = css.replace(/calc-/g, 'geom-');
// Update theme colors a bit for geom
css = css.replace(/--geom-teal: #0ea5e9;/g, '--geom-teal: #0d9488;'); 
css = css.replace(/--geom-violet: #8b5cf6;/g, '--geom-violet: #059669;');
css = css.replace(/--geom-rose: #f43f5e;/g, '--geom-rose: #2563eb;');
fs.writeFileSync(path.join(geomDir, 'coordinate-geometry.css'), css);

// 2. QuizEngine
let quizEngine = fs.readFileSync(path.join(calcDir, 'Engines', 'QuizEngine.jsx'), 'utf-8');
quizEngine = quizEngine.replace(/prefix = 'calc'/g, "prefix = 'geom'");
fs.writeFileSync(path.join(geomDir, 'Engines', 'QuizEngine.jsx'), quizEngine);

// 3. AssessmentEngine
let assessmentEngine = fs.readFileSync(path.join(calcDir, 'Engines', 'AssessmentEngine.jsx'), 'utf-8');
assessmentEngine = assessmentEngine.replace(/prefix = 'calc'/g, "prefix = 'geom'");
fs.writeFileSync(path.join(geomDir, 'Engines', 'AssessmentEngine.jsx'), assessmentEngine);

console.log('Scaffolding complete.');
