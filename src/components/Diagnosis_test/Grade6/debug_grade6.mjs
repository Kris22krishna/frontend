import * as g6 from './grade6Generators.mjs';
import * as g10 from '../Grade10/grade10Generators.mjs';
import * as g4 from '../Grade4/grade4Generators.mjs';

const generators = [
    'generateIntegerUnderstanding',
    'generateIntegerOps',
    'generateWholeNumberProperties',
    'generateWholeNumberPattern',
    'generateFractionOps',
    'generateDecimalConversion',
    'generateRatio',
    'generateProportion',
    'generateAlgebraExpression',
    'generateSimpleEquation',
    'generatePolygonSides',
    'generateTriangleType',
    'generateAreaRect',
    'generatePerimeterRect',
    'generateDataInterpretation',
    'generatePrimeComposite',
    'generateLCM',
    'generateFactorTree',
    'generateAlphabetSymmetry',
    'generateNumberPlay',
    'generateNumberPattern',
    'generateAddSubMultipleSelect'
];

console.log("Checking Grade 6 Local Generators...");
generators.forEach(name => {
    try {
        if (typeof g6[name] !== 'function') {
            console.error(`ERROR: ${name} is not a function or not exported!`);
        } else {
            const q = g6[name]();
            console.log(`SUCCESS: ${name} generated a question of type ${q.type}`);
        }
    } catch (e) {
        console.error(`ERROR: ${name} threw an error:`, e.message);
    }
});

const g10Generators = [
    'generateNaturalWholeNumbers',
    'generateIntegers',
    'generateFractions',
    'generateDecimals',
    'generateLCM',
    'generateHCF',
    'generateRatioProportion',
    'generateBODMAS',
    'generatePerimeter'
];

console.log("\nChecking Grade 10 Generators...");
g10Generators.forEach(name => {
    try {
        if (typeof g10[name] !== 'function') {
            console.error(`ERROR: ${name} (G10) is not a function or not exported!`);
        } else {
            const q = g10[name]();
            console.log(`SUCCESS: ${name} (G10) generated a question of type ${q.type}`);
        }
    } catch (e) {
        console.error(`ERROR: ${name} (G10) threw an error:`, e.message);
    }
});

const g4Generators = [
    'generateAreaShape',
    'generatePerimeterShape',
    'generateFVETable'
];

console.log("\nChecking Grade 4 Generators...");
g4Generators.forEach(name => {
    try {
        if (typeof g4[name] !== 'function') {
            console.error(`ERROR: ${name} (G4) is not a function or not exported!`);
        } else {
            const q = g4[name]();
            console.log(`SUCCESS: ${name} (G4) generated a question of type ${q.type}`);
        }
    } catch (e) {
        console.error(`ERROR: ${name} (G4) threw an error:`, e.message);
    }
});
