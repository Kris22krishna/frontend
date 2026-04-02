const fs = require('fs');
const path = require('path');

const dir = 'src/components/practice/class-3/Toy-Joy';

const metas = {
    'Identifying3DShapes.jsx': `[
        { type: \`mcq\`, correct: \`cylinder\`, explanation: \`A bottle has a curved surface and two flat circular faces — that makes it a Cylinder! A cube has only flat square faces, so it is wrong.\`, correctLabel: \`Cylinder\` },
        { type: \`mcq\`, correct: \`cone\`, explanation: \`A cone has a pointed top and a flat circular base. A cube has no pointed top — it has six equal square faces only.\`, correctLabel: \`Cone\` },
        { type: \`tf\`, correct: true, explanation: \`True! A bottle is shaped like a cylinder. It has one curved surface and two flat circular faces at the top and bottom.\`, correctLabel: \`True\` },
        { type: \`match\`, totalPairs: 4, explanation: \`Bottle → Cylinder (curved + 2 circular faces) | Box/Dice → Cube (6 square faces) | Party hat → Cone (pointed top) | Ball → Sphere (fully round, no flat faces)\`, correctLabel: \`All 4 pairs matched correctly\` },
        { type: \`multipick\`, correct: [\`s1q8-cyl1\`, \`s1q8-cyl2\`], explanation: \`Shapes A and D are cylinders — they each have a curved surface with two flat circular ends. Shape B is a Cone, Shape C is a Cube, and Shape E is a Cuboid.\`, correctLabel: \`Shape A and Shape D\` },
    ]`,
    'CountingShapes.jsx': `[
        { type: \`mcq\`, correct: \`2\`, explanation: \`Look at the SVG engine carefully — there are exactly 2 yellow triangular cones sitting on top of the cylinders. Count each pointed top to be sure.\`, correctLabel: \`2\` },
        { type: \`rocket\`, correct: { cone: \`1\`, cyl: \`1\`, cub: \`3\` }, explanation: \`Jaya's rocket has 1 Cone (the pointed top), 1 Cylinder (the orange body), and 3 Cuboids (2 blue fins + 1 red base). Always count each shape type separately!\`, correctLabel: \`Cone: 1, Cylinder: 1, Cuboid: 3\` },
        { type: \`mcq\`, correct: \`cylinder\`, explanation: \`The large red boiler has a curved body and two flat circular ends — that is the definition of a Cylinder! A cuboid has only flat rectangular faces, a cube only equal square faces.\`, correctLabel: \`Cylinder\` },
        { type: \`tf\`, correct: false, explanation: \`False! The cabin is a Cuboid, not a Cube. A cube has all 6 faces equal (like a dice), but the cabin is longer in one direction — making it a Cuboid (a rectangular box).\`, correctLabel: \`False\` },
        { type: \`match\`, totalPairs: 4, explanation: \`Red boiler → Cylinder (round + curved) | Blue cabin → Cuboid (rectangle box shape) | Yellow tops → Cone (pointy top) | Grey base → Cuboid (flat rectangular platform). Match shapes by their features!\`, correctLabel: \`All 4 pairs matched\` },
    ]`,
    'DescribingPosition.jsx': `[
        { type: \`mcq\`, correct: \`top\`, explanation: \`The cone is at the very top of the stack — above the cylinder! So the cone is "on top of the cylinder." Under means below, and beside means next to (not on top).\`, correctLabel: \`On top of the cylinder\` },
        { type: \`mcq\`, correct: \`on-top\`, explanation: \`The cylinder is above the cuboid — so the cylinder is "on top of the cuboid." The cuboid is at the bottom and the cone is even higher than the cylinder.\`, correctLabel: \`On top of the cuboid\` },
        { type: \`tf\`, correct: true, explanation: \`True! "Between" means in the middle. The cylinder is sandwiched between the red cuboid (below) and the yellow cuboid (above) — exactly in the middle.\`, correctLabel: \`True\` },
        { type: \`mcq\`, correct: \`cylinders\`, explanation: \`The table legs are the tall, round shapes underneath the tabletop — those are Cylinders! The flat top is a Cuboid, and the cones point upward. Cylinders support the table.\`, correctLabel: \`Cylinders (the legs)\` },
        { type: \`match\`, totalPairs: 4, explanation: \`"On top of" means directly above | "Under" means directly below | "Between" means in the middle of two shapes | "Next to" means beside, at the same level. Position words describe where shapes are relative to each other.\`, correctLabel: \`All 4 pairs matched\` },
    ]`,
    'PropertiesOf3DShapes.jsx': `[
        { type: \`singlePic\`, correct: \`yes\`, explanation: \`A Sphere has no edges and no flat faces — it is completely round and smooth! A Cube has 12 edges, a Cylinder has 2 circular edges, and a Cone has 1 circular edge.\`, correctLabel: \`Sphere\` },
        { type: \`mcq\`, correct: \`cuboid\`, explanation: \`A Cuboid (and a Cube) have only flat rectangular faces — no curved surfaces at all! A Sphere has no flat faces, and a Cylinder and Cone both have curved surfaces.\`, correctLabel: \`Cuboid / Cube\` },
        { type: \`tf\`, correct: true, explanation: \`True! A Cylinder has 2 flat circular faces (top and bottom) AND 1 curved face (the side). That is why it can roll on its side but stand upright too.\`, correctLabel: \`True\` },
        { type: \`match\`, totalPairs: 4, explanation: \`No edges → Sphere | Only flat faces → Cube/Cuboid | Only curved face → Sphere | Both flat + curved faces → Cone and Cylinder. Use the number of flat vs curved faces to identify each shape!\`, correctLabel: \`All 4 pairs matched\` },
        { type: \`multipick\`, correct: [\`s4q5-cone\`, \`s4q5-cyl\`], explanation: \`A Cone has 1 flat circular face (base) AND 1 curved face. A Cylinder has 2 flat circular faces AND 1 curved face. A Cube and Sphere do NOT have both types.\`, correctLabel: \`Cone and Cylinder\` },
    ]`,
    'ClassifyingShapes.jsx': `[
        { type: \`multipick\`, correct: [\`s5q1-cube1\`, \`s5q1-cube2\`, \`s5q1-cube3\`], explanation: \`A Cube has 6 equal square faces and 12 equal edges. Only shapes with all square and equal faces qualify as cubes. Rectangular boxes are cuboids, not cubes.\`, correctLabel: \`The three equal-sided boxes\` },
        { type: \`mcq\`, correct: \`all-cubes-are-cuboids\`, explanation: \`A Cube is a special cuboid where all 6 faces are equal squares. Every cube is technically a cuboid, but not every cuboid is a cube (since a cuboid can have rectangular faces of different sizes).\`, correctLabel: \`All cubes are cuboids, but not all cuboids are cubes\` },
        { type: \`tf\`, correct: true, explanation: \`True! A Cube IS a special type of Cuboid — it just has all equal faces. Think of a die: it is a cube that also satisfies all the rules of a cuboid.\`, correctLabel: \`True\` },
        { type: \`multipick\`, correct: [\`s5q4-cone1\`, \`s5q4-cone2\`, \`s5q4-cone3\`], explanation: \`A Cone has one circular flat base and one curved surface that meets at a single point (apex) at the top. Party hat, ice cream cone, and traffic cone are all cones.\`, correctLabel: \`All the cone-shaped objects\` },
        { type: \`match\`, totalPairs: 4, explanation: \`Ball → Sphere (no flat faces) | Chalk → Cylinder (circular cross-section) | Duster → Cuboid (rectangular box) | Cap → Cone (pointed top with circular base). Real objects map to 3D shapes by their surface features!\`, correctLabel: \`All 4 pairs matched\` },
    ]`,
    'OppositeFacesCube.jsx': `[
        { type: \`mcq\`, correct: \`6\`, explanation: \`On a standard die, opposite faces always add up to 7. So the face opposite to 1 is 6 (because 1 + 6 = 7). This is true for all opposite pairs: 1↔6, 2↔5, 3↔4.\`, correctLabel: \`6\` },
        { type: \`mcq\`, correct: \`4\`, explanation: \`Opposite faces on a standard die always add up to 7. So the face opposite to 3 is 4 (because 3 + 4 = 7). Remember: 1↔6, 2↔5, 3↔4 are the three opposite pairs.\`, correctLabel: \`4\` },
        { type: \`tf\`, correct: true, explanation: \`True! On a standard die, every pair of opposite faces adds up to 7: 1 + 6 = 7, 2 + 5 = 7, 3 + 4 = 7. This is a special property of all standard dice.\`, correctLabel: \`True\` },
        { type: \`mcq\`, correct: \`3\`, explanation: \`If 4 is on the front and the die sits with 6 facing right, you use the rule that 4↔3 are NOT opposite (4↔3 is not an opposite pair — 4↔3 means 3 is adjacent). Actually 4's opposite is 3. Correct: 3.\`, correctLabel: \`3\` },
        { type: \`match\`, totalPairs: 3, explanation: \`On a die: 1 is opposite 6 | 2 is opposite 5 | 3 is opposite 4. All pairs add up to 7! This is always true for a standard die.\`, correctLabel: \`All 3 pairs matched (1↔6, 2↔5, 3↔4)\` },
    ]`,
    'BuildingCombiningShapes.jsx': `[
        { type: \`mcq\`, correct: \`cuboid\`, explanation: \`3 cubes joined in a straight line form a longer shape — a Cuboid! The combined shape has the same height and width as a single cube, but is 3 times longer. It is still a rectangular box = Cuboid.\`, correctLabel: \`A longer Cuboid\` },
        { type: \`mcq\`, correct: \`2x3x1\`, explanation: \`6 dice (cubes) arranged as 2 wide × 3 long × 1 tall makes a flat cuboid. You can also arrange them as 1×2×3, 2×1×3, etc. — but 2×3×1 is the classic flat arrangement.\`, correctLabel: \`2 × 3 × 1\` },
        { type: \`tf\`, correct: true, explanation: \`True! Any arrangement of cubes joined together forms a Cuboid (a rectangular box shape). Whether stacked in a line, flat, or tall, the result always has 6 flat rectangular faces = Cuboid.\`, correctLabel: \`True\` },
        { type: \`mcq\`, correct: \`m10-b\`, explanation: \`The model with the most cuboids has more individual pieces stacked/joined together. Count each distinct rectangular piece in the image — the tallest/widest arrangement has the most.\`, correctLabel: \`Model B (most cuboids)\` },
        { type: \`match\`, totalPairs: 3, explanation: \`6 cubes flat → Flat cuboid (wide and low) | 6 cubes stacked tall → Tall tower (narrow and high cuboid) | 3 cubes in a line → Long cuboid (elongated). Shape of arrangement determines the type of combined cuboid!\`, correctLabel: \`All 3 pairs matched\` },
    ]`,
    'SequencingModelConstruction.jsx': `[
        { type: \`mcq\`, correct: \`place-legs\`, explanation: \`When building a table, you always start from the bottom up! Place the legs (cylinders) first as your foundation. You cannot put the tabletop on before the legs are in place.\`, correctLabel: \`Place the legs (cylinders) first\` },
        { type: \`mcq\`, correct: \`cone\`, explanation: \`The cone is placed last because it sits on top of everything else — the cone is the roof or tip! You build from bottom to top: cuboid base first, then cylinder body, then cone on top.\`, correctLabel: \`Cone (placed last, on the very top)\` },
        { type: \`tf\`, correct: true, explanation: \`True! In 3D model construction, you always build from bottom to top. The base (cuboid) goes first to create a stable foundation, and the top piece (cone or roof) goes last.\`, correctLabel: \`True\` },
        { type: \`mcq\`, correct: \`s8q4-b\`, explanation: \`The correct order is: (1) Place the cuboid base on the ground, (2) Stack the cylinder on the cuboid, (3) Place the cone on top of the cylinder. This is bottom-to-top construction order.\`, correctLabel: \`Cuboid → Cylinder → Cone (bottom to top)\` },
        { type: \`match\`, totalPairs: 3, explanation: \`Step 1: Place the cuboid flat on the ground (stable base) | Step 2: Stack the cylinder on the cuboid (middle body) | Step 3: Place the cone on top (the very last piece goes on top). Always build bottom → middle → top!\`, correctLabel: \`All 3 steps matched in order\` },
    ]`,
};

Object.keys(metas).forEach(f => {
    const p = path.join(dir, f);
    if (!fs.existsSync(p)) return;
    let content = fs.readFileSync(p, 'utf8');
    const start = content.indexOf('const questionMeta =');
    if (start !== -1) {
        const end = content.indexOf('];', start) + 2;
        const newBlock = \`const questionMeta = \${metas[f]};\`;
        content = content.substring(0, start) + newBlock + content.substring(end);
        fs.writeFileSync(p, content);
        console.log("Safely restored " + f);
    }
});
