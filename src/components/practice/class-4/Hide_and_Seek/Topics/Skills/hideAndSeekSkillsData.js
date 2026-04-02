// hideAndSeekSkillsData.js for Grade 4 - Hide and Seek
// 20 practice + 20 assessment questions per skill
// Questions include image/visual fields for interactive picture-based content
// Content derived from NCERT Chapter 2 — spatial reasoning, views, grids, maps

export const generateHideAndSeekSkillsData = () => {
    const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const items = ['🍎', '💎', '📍', '🏁', '🤖', '🐶', '⚽', '🚗', '⭐'];
    const getRndItem = () => items[rnd(0, items.length - 1)];
    return [
        {
            id: 'views-of-objects',
            title: 'Views of Objects',
            desc: 'Learn how objects look from the top, front, and side.',
            color: '#059669',
            icon: '👁️',
            learnSections: [
                {
                    heading: 'Top View (Bird\'s Eye View)',
                    content: 'The top view is what you see when looking straight down at an object. A glass from the top looks like a circle. A book looks like a rectangle. A tall building? Still a rectangle from above!',
                    example: 'A cup from above looks like a circle ⭕, but from the side it looks like a rectangle with a handle.',
                },
                {
                    heading: 'Front and Side Views',
                    content: 'The front view is what you see when facing an object directly. The side view is what you see from the left or right. The same chair can look totally different from each direction!',
                    example: 'A car from the front shows headlights. From the side, you see the wheels and door shape.',
                }
            ],
            practice: [
                { type: 'multiple-choice', question: 'A round glass kept upright on a table looks like what shape from the TOP?', options: ['Square', 'Circle', 'Triangle', 'Rectangle'], correctAnswer: 1, explanation: 'Looking straight down at an upright round glass, you see its circular rim.', image: '🥛' },
                { type: 'multiple-choice', question: 'A book lying flat on a table — what does it look like from above?', options: ['Circle', 'Triangle', 'Rectangle', 'Oval'], correctAnswer: 2, explanation: 'Books are rectangular, and from the top view you see a flat rectangle.', image: '📕' },
                { type: 'multiple-choice', question: 'From which view can you see the wheels of a bicycle?', options: ['Top View', 'Front View', 'Side View', 'Bottom View'], correctAnswer: 2, explanation: 'From the side view, you can see both wheels and the frame of the bicycle.', image: '🚲' },
                { type: 'multiple-choice', question: 'A cone (like a party hat) standing upright on a table looks like what from the TOP?', options: ['Triangle', 'Circle', 'Square', 'Star'], correctAnswer: 1, explanation: 'Looking down at an upright cone, you see its circular base.', image: '🎉' },
                { type: 'multiple-choice', question: 'A dice kept on a table looks like what from the FRONT?', options: ['Circle', 'Triangle', 'Square', 'Oval'], correctAnswer: 2, explanation: 'The face you see at the front of a dice is a square.', image: '🎲' },
                { type: 'multiple-choice', question: 'You look at a football from the front. What shape do you see?', options: ['Circle', 'Oval', 'Rectangle', 'Square'], correctAnswer: 0, explanation: 'A football (soccer ball) looks like a circle from any direction!', image: '⚽' },
                { type: 'multiple-choice', question: 'A suitcase lying on its side — what does the TOP view look like?', options: ['Circle', 'Rectangle', 'Triangle', 'Square'], correctAnswer: 1, explanation: 'A suitcase is rectangular, so from above it shows a rectangle.', image: '🧳' },
                { type: 'multiple-choice', question: 'A coin standing upright on a table looks like what from the SIDE?', options: ['Circle', 'Line', 'Square', 'Triangle'], correctAnswer: 1, explanation: 'A coin is very thin, so from the side it looks like a line.', image: '🪙' },
                { type: 'multiple-choice', question: 'A square table from the TOP looks like a...', options: ['Triangle', 'Square', 'Circle', 'Oval'], correctAnswer: 1, explanation: 'Looking from above, a square table looks like a square.', image: '🪑' },
                { type: 'multiple-choice', question: 'A cylinder (like a tin can) standing upright looks like what from the TOP?', options: ['Rectangle', 'Oval', 'Circle', 'Square'], correctAnswer: 2, explanation: 'The top of an upright cylinder is a circle.', image: '🥫' },
                { type: 'multiple-choice', question: 'A bus from the FRONT view is roughly what shape?', options: ['Circle', 'Rectangle', 'Triangle', 'Hexagon'], correctAnswer: 1, explanation: 'The front of a bus is generally rectangular with the windshield visible.', image: '🚌' },
                { type: 'multiple-choice', question: 'Looking at a tree from the top — what shape does the canopy look like?', options: ['Circle/Oval', 'Rectangle', 'Triangle', 'Line'], correctAnswer: 0, explanation: 'A tree canopy spreads out in a roughly circular shape when seen from above.', image: '🌳' },
                { type: 'multiple-choice', question: 'An open umbrella from above looks like a...', options: ['Triangle', 'Rectangle', 'Circle', 'Star'], correctAnswer: 2, explanation: 'An open umbrella from above looks like a big circle.', image: '☂️' },
                { type: 'multiple-choice', question: 'A mobile phone lying flat — top view shape?', options: ['Rectangle', 'Circle', 'Triangle', 'Oval'], correctAnswer: 0, explanation: 'Phones are rectangular, so the top view is a rectangle.', image: '📱' },
                { type: 'multiple-choice', question: 'A tent from the SIDE looks like a...', options: ['Rectangle', 'Circle', 'Triangle', 'Hexagon'], correctAnswer: 2, explanation: 'Most tents have a triangular shape when viewed from the side.', image: '⛺' },
                { type: 'multiple-choice', question: 'How many standard views are commonly used to describe any object?', options: ['1', '2', '3', '4'], correctAnswer: 2, explanation: 'The three standard views are: Top View, Front View, and Side View.' },
                { type: 'multiple-choice', question: 'A ball looks the same from EVERY direction. Which shape is it?', options: ['Cube', 'Sphere', 'Cylinder', 'Cone'], correctAnswer: 1, explanation: 'A sphere (ball) looks like a circle from every direction!', image: '🏀' },
                { type: 'multiple-choice', question: 'A table from the TOP view shows mainly its...', options: ['Legs', 'Surface/Top', 'Sides', 'Bottom'], correctAnswer: 1, explanation: 'From above, you mainly see the flat tabletop surface.' },
                { type: 'multiple-choice', question: 'A candle standing upright from the TOP looks like a...', options: ['Rectangle', 'Circle', 'Triangle', 'Square'], correctAnswer: 1, explanation: 'Looking straight down at a candle, you see its round top.', image: '🕯️' },
                { type: 'multiple-choice', question: 'Which view means looking at an object from above?', options: ['Top View', 'Front View', 'Side View', 'Back View'], correctAnswer: 0, explanation: 'When you look from above, you are seeing the top view.' },
            ],
            assessment: [
                { type: 'multiple-choice', question: 'A glass kept upright on a table looks like what from the TOP?', options: ['Rectangle', 'Circle', 'Triangle', 'Square'], correctAnswer: 1, explanation: 'Looking down into an upright glass, you see its circular rim.' },
                { type: 'multiple-choice', question: 'A shoe kept on the floor, from the SIDE view, shows its...', options: ['Sole only', 'Full profile with heel and toe', 'Top surface only', 'Laces only'], correctAnswer: 1, explanation: 'The side view of a shoe kept normally on the floor shows its complete profile shape.', image: '👟' },
                { type: 'multiple-choice', question: 'A cricket bat held upright from the FRONT (face) looks like a...', options: ['Circle', 'Wide paddle shape', 'Triangle', 'Thin line'], correctAnswer: 1, explanation: 'The front face of a cricket bat shows its wide flat paddle shape.', image: '🏏' },
                { type: 'multiple-choice', question: 'A donut lying flat on a plate looks like what from the TOP?', options: ['A circle with a hole', 'A rectangle', 'A solid circle', 'A square'], correctAnswer: 0, explanation: 'A donut lying flat, seen from above, shows a circle with a hole in the middle.', image: '🍩' },
                { type: 'multiple-choice', question: 'A cube from ANY direction always looks like a...', options: ['Rectangle', 'Square', 'Circle', 'Triangle'], correctAnswer: 1, explanation: 'Every face of a cube is a square, so from any standard view it appears square.' },
                { type: 'multiple-choice', question: 'A party hat standing upright on a table looks like what from the SIDE?', options: ['Circle', 'Rectangle', 'Triangle', 'Oval'], correctAnswer: 2, explanation: 'A party hat standing upright looks like a triangle from the side.', image: '🎉' },
                { type: 'multiple-choice', question: 'A cylinder standing upright looks like what from the SIDE?', options: ['Circle', 'Rectangle', 'Triangle', 'Hexagon'], correctAnswer: 1, explanation: 'The side view of an upright cylinder is a rectangle.', image: '🥫' },
                { type: 'multiple-choice', question: 'Which view helps you see the top of a table?', options: ['Top View', 'Front View', 'Side View', 'Bottom View'], correctAnswer: 0, explanation: 'To see the top surface of a table, look from above.', image: '🪑' },
                { type: 'multiple-choice', question: 'A plate lying flat on the table looks like what from the TOP?', options: ['Rectangle', 'Circle', 'Triangle', 'Square'], correctAnswer: 1, explanation: 'A plate lying flat is round, so it looks like a circle from above.', image: '🍽️' },
                { type: 'multiple-choice', question: 'Two stacked cubes from the FRONT look like a...', options: ['Square', 'Tall Rectangle', 'Two Squares Side by Side', 'Circle'], correctAnswer: 1, explanation: 'Stacked cubes from the front show a tall rectangle (2 squares high).' },
                { type: 'multiple-choice', question: 'A laptop from the TOP (when closed) looks like a...', options: ['Circle', 'Rectangle', 'Triangle', 'Square'], correctAnswer: 1, explanation: 'A closed laptop from above shows its rectangular lid.', image: '💻' },
                { type: 'multiple-choice', question: 'A sphere gives the SAME shape from all views. That shape is a...', options: ['Square', 'Rectangle', 'Circle', 'Triangle'], correctAnswer: 2, explanation: 'A sphere always looks like a circle no matter which direction you look from.' },
                { type: 'multiple-choice', question: 'A cone standing upright looks like what from the FRONT?', options: ['Circle', 'Triangle', 'Rectangle', 'Square'], correctAnswer: 1, explanation: 'The front view of an upright cone looks triangular.', image: '🔺' },
                { type: 'multiple-choice', question: 'A ladder from the FRONT view looks like...', options: ['A tall rectangle with rungs', 'A circle', 'A triangle', 'A single line'], correctAnswer: 0, explanation: 'From the front, a ladder shows two vertical sides with horizontal rungs.' },
                { type: 'multiple-choice', question: 'A book standing upright — side view?', options: ['Thin rectangle', 'Square', 'Circle', 'Full cover page'], correctAnswer: 0, explanation: 'From the side, a book looks like a thin rectangle (showing the spine and pages).' },
                { type: 'multiple-choice', question: 'A clock on the wall — front view shape?', options: ['Square', 'Circle', 'Rectangle', 'Triangle'], correctAnswer: 1, explanation: 'Most wall clocks are circular when viewed from the front.', image: '🕐' },
                { type: 'multiple-choice', question: 'A door from the FRONT looks like a...', options: ['Circle', 'Rectangle', 'Triangle', 'Oval'], correctAnswer: 1, explanation: 'A door usually has a rectangular front shape.', image: '🚪' },
                { type: 'multiple-choice', question: 'Which object, kept in its usual position, looks like a circle from the TOP?', options: ['Book', 'Plate', 'Door', 'Box'], correctAnswer: 1, explanation: 'A plate is round, so its top view is a circle.', image: '🍽️' },
                { type: 'multiple-choice', question: 'A traffic cone standing on the road looks like what from the TOP?', options: ['Triangle', 'Circle', 'Square', 'Star'], correctAnswer: 1, explanation: 'Looking down at a traffic cone standing on the road, you see its circular base.', image: '🔶' },
                { type: 'multiple-choice', question: 'The top, front, and side of an object are called different...', options: ['Views', 'Colors', 'Numbers', 'Maps'], correctAnswer: 0, explanation: 'Top view, front view, and side view are different views of the same object.' },
            ]
        },
        {
            id: 'grid-navigation',
            title: 'Grid Navigation',
            desc: 'Navigate grids using rows, columns, and coordinates.',
            color: '#7c3aed',
            icon: '🗓️',
            learnSections: [
                {
                    heading: 'Understanding Grids',
                    content: 'A grid is like graph paper — it has rows (horizontal lines, labeled A, B, C...) and columns (vertical lines, labeled 1, 2, 3...). Each square has a unique address, like B3 (Row B, Column 3).',
                    example: 'A chess board is an 8×8 grid. Each square has coordinates like E4 or A1.',
                },
                {
                    heading: 'Moving on a Grid',
                    content: 'To move on a grid, you go "up/down" (between rows) or "left/right" (between columns). You can also follow instructions like "Go 2 squares right, then 3 squares up."',
                    example: 'Starting at A1, go right 3 = A4. Then go up 2 = C4.',
                }
            ],
            practice: [
                { type: 'multiple-choice', question: 'In a grid, rows go which direction?', options: ['Up and Down', 'Left and Right (Horizontal)', 'Diagonal', 'Circular'], correctAnswer: 1, explanation: 'Rows are horizontal — they go left and right across the grid.', grid: { rows: 6, cols: 6 } },
                { type: 'multiple-choice', question: 'In a grid, columns go which direction?', options: ['Horizontal', 'Diagonal', 'Vertical (Up and Down)', 'Random'], correctAnswer: 2, explanation: 'Columns are vertical — they go up and down.', grid: { rows: 6, cols: 6 } },
                { type: 'multiple-choice', question: 'What does B3 mean on a grid?', options: ['Block 3', 'Row B, Column 3', 'Building 3', '3rd row, B column'], correctAnswer: 1, explanation: 'The letter represents the row, the number represents the column.', grid: { rows: 6, cols: 6, highlightCell: 'B3' } },
                (() => {
                    const r = rnd(3, 8);
                    const cl = rnd(3, 8);
                    const ans = r * cl;
                    const fake1 = ans + rnd(1, 5);
                    const fake2 = ans - rnd(1, 4);
                    const fake3 = r + cl;
                    const opts = [ans, fake1, fake2, fake3].sort(() => Math.random() - 0.5);
                    return { type: 'multiple-choice', question: `On a ${r}×${cl} grid, how many squares are there in total?`, options: opts.map(String), correctAnswer: opts.indexOf(ans), explanation: `${r} rows × ${cl} columns = ${ans} squares total.`, grid: { rows: r, cols: cl } };
                })(),
                (() => {
                    const r = rnd(4, 6); const c = rnd(4, 6);
                    const startRow = String.fromCharCode(65 + rnd(0, r - 1));
                    const startCol = rnd(1, c - 2);
                    const moveRight = rnd(1, c - startCol);
                    const endCol = startCol + moveRight;
                    const ans = startRow + endCol;
                    const fake1 = startRow + (startCol - 1 === 0 ? startCol + moveRight + 1 : startCol - 1);
                    const fake2 = String.fromCharCode(startRow.charCodeAt(0) + (moveRight > r ? 1 : moveRight > 65 + r ? 65 : moveRight)) + startCol;
                    const fake3 = startRow + (endCol + 1);
                    const opts = [ans, fake1, fake2, fake3].sort();
                    return { type: 'multiple-choice', question: `Starting at ${startRow}${startCol}, you move ${moveRight} ${moveRight === 1 ? 'square' : 'squares'} right. Where are you now?`, options: opts, correctAnswer: opts.indexOf(ans), explanation: `Moving right increases the column number. ${startRow}${startCol} → ${ans}.`, grid: { rows: r, cols: c, items: [{ row: startRow, col: startCol, label: '📍' }, { row: startRow, col: endCol, label: '🏁' }] } };
                })(),
                { type: 'multiple-choice', question: 'Starting at A1, you move 3 squares up. Where are you?', options: ['A4', 'D1', 'A3', 'C1'], correctAnswer: 1, explanation: 'Moving up changes the row letter. A → B → C → D. So A1 up 3 = D1.', grid: { rows: 6, cols: 6, items: [{ row: 'A', col: 1, label: '📍' }, { row: 'D', col: 1, label: '🏁' }] } },
                { type: 'multiple-choice', question: 'Which game uses a grid with coordinates to find hidden ships?', options: ['Chess', 'Battleship', 'Ludo', 'Snakes & Ladders'], correctAnswer: 1, explanation: 'Battleship uses grid coordinates (like B4) to call out attacks!', image: '🚢', grid: { rows: 6, cols: 6 } },
                (() => {
                    const r = rnd(2, 6);
                    const cl = rnd(3, 8);
                    const opts = [cl, r, cl + r, cl * r].map(String);
                    return { type: 'multiple-choice', question: `A ${r}×${cl} grid has how many columns?`, options: opts.map(String), correctAnswer: 0, explanation: `${r}×${cl} means ${r} rows and ${cl} columns, so there are ${cl} columns.`, grid: { rows: r, cols: cl } };
                })(),
                { type: 'multiple-choice', question: 'If you are at C3 and move 1 square left, where are you?', options: ['C2', 'C4', 'B3', 'D3'], correctAnswer: 0, explanation: 'Moving left decreases the column number. C3 → C2.', grid: { rows: 6, cols: 6, items: [{ row: 'C', col: 3, label: '📍' }, { row: 'C', col: 2, label: '🏁' }] } },
                { type: 'multiple-choice', question: 'If you are at D5 and move 2 squares down, where are you?', options: ['B5', 'F5', 'D3', 'D7'], correctAnswer: 0, explanation: 'Moving down changes the row letter backwards. D → C → B. So D5 down 2 = B5.', grid: { rows: 6, cols: 6, items: [{ row: 'D', col: 5, label: '📍' }, { row: 'B', col: 5, label: '🏁' }] } },
                { type: 'multiple-choice', question: 'On a grid, what is the address of the bottom-left corner?', options: ['A1', 'Z1', 'A99', '1A'], correctAnswer: 0, explanation: 'The first row (A) and first column (1) = A1.', grid: { rows: 6, cols: 6, highlightCell: 'A1' } },
                { type: 'multiple-choice', question: 'In Battleship, you say "D5". What are you specifying?', options: ['A direction', 'A coordinate on the grid', 'A ship name', 'A score'], correctAnswer: 1, explanation: 'D5 is a grid coordinate — Row D, Column 5.', grid: { rows: 6, cols: 6, highlightCell: 'D5' } },
                { type: 'multiple-choice', question: 'A treasure is at E3. You are at A3. How many squares up do you need to move?', options: ['2', '3', '4', '5'], correctAnswer: 2, explanation: 'A → B → C → D → E = 4 squares up.', grid: { rows: 6, cols: 6, items: [{ row: 'A', col: 3, label: '🚶' }, { row: 'E', col: 3, label: '💎' }] } },
                { type: 'multiple-choice', question: 'Two treasures at B2 and B5. How many columns apart are they?', options: ['2', '3', '4', '7'], correctAnswer: 1, explanation: 'Columns 5 - 2 = 3 columns apart.', grid: { rows: 6, cols: 6, items: [{ row: 'B', col: 2, label: '💎' }, { row: 'B', col: 5, label: '💎' }] } },
                { type: 'multiple-choice', question: 'Can two different squares on a grid have the SAME coordinates?', options: ['Yes, always', 'No, every square has unique coordinates', 'Only in big grids', 'Only diagonals'], correctAnswer: 1, explanation: 'Every square on a grid has a unique row-column address.', grid: { rows: 6, cols: 6 } },
                { type: 'multiple-choice', question: 'A path on a grid goes: A1→A2→A3→B3→C3. How many moves?', options: ['3', '4', '5', '6'], correctAnswer: 1, explanation: 'Count the arrows: A1→A2 (1), A2→A3 (2), A3→B3 (3), B3→C3 (4). Total: 4 moves.', grid: { rows: 6, cols: 6, items: [{ row: 'A', col: 1, label: '📍' }, { row: 'C', col: 3, label: '🏁' }] } },
                { type: 'multiple-choice', question: 'From B4, go right 2 and up 1. Where do you end up?', options: ['C6', 'B6', 'C4', 'A6'], correctAnswer: 0, explanation: 'B4 + right 2 = B6. B6 + up 1 = C6.', grid: { rows: 6, cols: 6, items: [{ row: 'B', col: 4, label: '📍' }, { row: 'C', col: 6, label: '🏁' }] } },
                { type: 'multiple-choice', question: 'A grid has rows A-F and columns 1-8. How many squares total?', options: ['14', '36', '48', '64'], correctAnswer: 2, explanation: '6 rows × 8 columns = 48 squares.', grid: { rows: 6, cols: 8 } },
                { type: 'multiple-choice', question: 'What is the shortest path from A1 to C3? (count minimum moves)', options: ['2', '3', '4', '6'], correctAnswer: 2, explanation: 'Minimum: Right 2 (A1→A2→A3) + Up 2 (A3→B3→C3) = 4 moves.', grid: { rows: 6, cols: 6, items: [{ row: 'A', col: 1, label: '📍' }, { row: 'C', col: 3, label: '🏁' }] } },
                { type: 'multiple-choice', question: 'In a city grid, streets go N-S and avenues go E-W. This is like a...', options: ['Circle', 'Grid of rows and columns', 'Random pattern', 'Spiral'], correctAnswer: 1, explanation: 'City grids with perpendicular streets and avenues form a coordinate grid!', grid: { rows: 6, cols: 6 } },
            ],
            assessment: [
                { type: 'multiple-choice', question: 'Rows on a grid go in which direction?', options: ['Vertical', 'Horizontal', 'Diagonal', 'Circular'], correctAnswer: 1, explanation: 'Rows are horizontal lines going left to right.', grid: { rows: 6, cols: 6 } },
                { type: 'multiple-choice', question: 'What does C4 mean on a grid?', options: ['4 columns', 'Row C, Column 4', 'Corner 4', 'Cell 4'], correctAnswer: 1, explanation: 'C = row letter, 4 = column number.', grid: { rows: 6, cols: 6, highlightCell: 'C4' } },
                { type: 'multiple-choice', question: 'A 3×3 grid has how many squares?', options: ['6', '9', '12', '3'], correctAnswer: 1, explanation: '3 × 3 = 9 squares.', grid: { rows: 3, cols: 3 } },
                { type: 'multiple-choice', question: 'Starting at B2, move right 3. Where are you?', options: ['B5', 'E2', 'B3', 'B1'], correctAnswer: 0, explanation: 'B2 → B3 → B4 → B5. Column changes from 2 to 5.', grid: { rows: 6, cols: 6, items: [{ row: 'B', col: 2, label: '📍' }, { row: 'B', col: 5, label: '🏁' }] } },
                { type: 'multiple-choice', question: 'Starting at D1, move up 2. Where are you?', options: ['F1', 'B1', 'D3', 'D2'], correctAnswer: 0, explanation: 'D → E → F. Movement up changes the row letter forward.', grid: { rows: 6, cols: 6, items: [{ row: 'D', col: 1, label: '📍' }, { row: 'F', col: 1, label: '🏁' }] } },
                { type: 'multiple-choice', question: 'Can a grid have more rows than columns?', options: ['No, they must be equal', 'Yes', 'Only if square', 'Never'], correctAnswer: 1, explanation: 'A grid can be any size — like 6 rows × 4 columns.', grid: { rows: 6, cols: 4 } },
                { type: 'multiple-choice', question: 'What is the distance (in squares) between A1 and A5?', options: ['3', '4', '5', '6'], correctAnswer: 1, explanation: 'A1 → A2 → A3 → A4 → A5 = 4 moves.', grid: { rows: 6, cols: 6, items: [{ row: 'A', col: 1, label: '📍' }, { row: 'A', col: 5, label: '🏁' }] } },
                { type: 'multiple-choice', question: 'Columns on a grid are labeled with...', options: ['Letters', 'Numbers', 'Colors', 'Symbols'], correctAnswer: 1, explanation: 'Typically columns use numbers (1, 2, 3...) and rows use letters.', grid: { rows: 6, cols: 6 } },
                { type: 'multiple-choice', question: 'From E3, go left 2 and down 3. Where are you?', options: ['B1', 'H5', 'E1', 'C1'], correctAnswer: 0, explanation: 'E3 left 2 = E1. E1 down 3 = B1 (E→D→C→B).', grid: { rows: 6, cols: 6, items: [{ row: 'E', col: 3, label: '📍' }, { row: 'B', col: 1, label: '🏁' }] } },
                { type: 'multiple-choice', question: 'A chess board grid is how many squares?', options: ['16', '32', '49', '64'], correctAnswer: 3, explanation: '8 × 8 = 64 squares on a standard chess board.', image: '♟️', grid: { rows: 8, cols: 8 } },
                { type: 'multiple-choice', question: 'You need to go from A1 to E5. What is the minimum number of moves?', options: ['5', '8', '10', '4'], correctAnswer: 1, explanation: 'Right 4 (A1→A5) + up 4 (A5→E5) = 8 moves minimum.', grid: { rows: 6, cols: 6, items: [{ row: 'A', col: 1, label: '📍' }, { row: 'E', col: 5, label: '🏁' }] } },
                { type: 'multiple-choice', question: 'If two squares share the same row letter, they are in the same...', options: ['Column', 'Row', 'Diagonal', 'Grid'], correctAnswer: 1, explanation: 'Same letter = same row (e.g., B2 and B5 are both in row B).', grid: { rows: 6, cols: 6, items: [{ row: 'B', col: 2, label: '⬛' }, { row: 'B', col: 5, label: '⬛' }] } },
                { type: 'multiple-choice', question: 'A treasure map grid has 10 rows and 10 columns. Total squares?', options: ['20', '50', '100', '200'], correctAnswer: 2, explanation: '10 × 10 = 100 squares.', grid: { rows: 10, cols: 10 } },
                { type: 'multiple-choice', question: 'From C3, what is one square diagonally up-right?', options: ['D4', 'B4', 'C4', 'D3'], correctAnswer: 0, explanation: 'Diagonally up-right: row goes up (C→D) and column goes right (3→4) = D4.', grid: { rows: 6, cols: 6, items: [{ row: 'C', col: 3, label: '📍' }, { row: 'D', col: 4, label: '🏁' }] } },
                { type: 'multiple-choice', question: 'You follow the path A1→B1→C1→C2→C3. What shape did you trace?', options: ['Straight line', 'L-shape', 'Circle', 'Zigzag'], correctAnswer: 1, explanation: 'You went up 2, then right 2 — that makes an L-shape!', grid: { rows: 6, cols: 6, items: [{ row: 'A', col: 1, label: '📍' }, { row: 'C', col: 3, label: '🏁' }] } },
                { type: 'multiple-choice', question: 'Which is farther from A1: C1 or A3?', options: ['C1', 'A3', 'Both are the same distance', 'Cannot tell'], correctAnswer: 2, explanation: 'C1 is 2 moves up. A3 is 2 moves right. Same distance! (2 moves each)', grid: { rows: 6, cols: 6, items: [{ row: 'A', col: 1, label: '📍' }, { row: 'C', col: 1, label: '🏁' }, { row: 'A', col: 3, label: '🏁' }] } },
                { type: 'multiple-choice', question: 'A grid is numbered Rows 1-5 and Columns A-E. How is "Row 3, Column B" written?', options: ['3B', 'B3', '3-B', 'B-3'], correctAnswer: 0, explanation: 'When rows use numbers and columns use letters, it\'s written as 3B.', grid: { rows: 5, cols: 5 } },
                { type: 'multiple-choice', question: 'Two friends are at A2 and D2. They are in the same...', options: ['Row', 'Column', 'Diagonal', 'Grid'], correctAnswer: 1, explanation: 'Both have column 2, so they share the same column.', grid: { rows: 6, cols: 6, items: [{ row: 'A', col: 2, label: '🧍' }, { row: 'D', col: 2, label: '🧍' }] } },
                { type: 'multiple-choice', question: 'An L-shaped path on a grid requires at minimum how many direction changes?', options: ['0', '1', '2', '3'], correctAnswer: 1, explanation: 'An L-shape has exactly 1 turn (change of direction).', grid: { rows: 6, cols: 6 } },
                { type: 'multiple-choice', question: 'From B3, instructions say: "Right 1, Up 2, Left 3". Final position?', options: ['D1', 'D4', 'B1', 'A4'], correctAnswer: 0, explanation: 'B3 → right 1 → B4 → up 2 → D4 → left 3 → D1.', grid: { rows: 6, cols: 6, items: [{ row: 'B', col: 3, label: '📍' }, { row: 'D', col: 1, label: '🏁' }] } },
            ]
        },
        {
            id: 'map-reading',
            title: 'Map Reading',
            desc: 'Read maps, find routes, use landmarks and directions.',
            color: '#0284c7',
            icon: '🗺️',
            learnSections: [
                {
                    heading: 'What is a Map?',
                    content: 'A map is a flat drawing that shows places, roads, and landmarks from a bird\'s eye (top) view. Maps help us find places, plan routes, and understand the layout of an area.',
                    example: 'A map of your school might show the playground at the bottom, the main building in the center, and the garden on the right.',
                },
                {
                    heading: 'Using Landmarks and Directions',
                    content: 'Landmarks are well-known places (temple, park, school) that help you navigate. Directions (North, South, East, West) tell you which way to go. "Go North past the temple, then turn East at the park."',
                    example: 'On most maps, North is at the top. Remember: Never Eat Soggy Waffles (N-E-S-W clockwise)!',
                }
            ],
            practice: [
                { type: 'multiple-choice', question: 'Maps show places from which view?', options: ['Side View', 'Front View', 'Top View (Bird\'s Eye)', 'Inside View'], correctAnswer: 2, explanation: 'Maps are always drawn from above, showing the layout of an area.' },
                { type: 'multiple-choice', question: 'On most maps, which direction is at the TOP?', options: ['South', 'East', 'West', 'North'], correctAnswer: 3, explanation: 'By convention, North is at the top of most maps.' },
                { type: 'multiple-choice', question: 'What helps you find your way using well-known places?', options: ['Scale', 'Coordinates', 'Landmarks', 'Colors'], correctAnswer: 2, explanation: 'Landmarks like temples, parks, and schools serve as reference points for navigation.' },
                { type: 'multiple-choice', question: 'If North is at the top of a map, where is South?', options: ['Left', 'Right', 'Top', 'Bottom'], correctAnswer: 3, explanation: 'South is the opposite of North, so it\'s at the bottom of the map.' },
                { type: 'multiple-choice', question: 'If you face North and turn right, you face...', options: ['West', 'East', 'South', 'North'], correctAnswer: 1, explanation: 'Facing North, your right side is East.' },
                { type: 'multiple-choice', question: 'A map shows a temple to the EAST of a school. Which side is the temple?', options: ['Left', 'Right', 'Top', 'Bottom'], correctAnswer: 1, explanation: 'East is on the right side of a standard map.' },
                { type: 'multiple-choice', question: '"NE" on a compass stands for...', options: ['Northeast', 'North-End', 'New East', 'Near Edge'], correctAnswer: 0, explanation: 'NE = Northeast, the direction between North and East.' },
                { type: 'multiple-choice', question: 'Which real-life tool shows you which direction is North?', options: ['Ruler', 'Compass', 'Calculator', 'Thermometer'], correctAnswer: 1, explanation: 'A compass needle always points North!', image: '🧭' },
                { type: 'multiple-choice', question: 'On a map, what connects two places?', options: ['A landmark', 'A route / road', 'A symbol', 'A compass'], correctAnswer: 1, explanation: 'Roads, paths, and routes connect different places on a map.' },
                { type: 'multiple-choice', question: 'If the hospital is West of the school, which direction do you travel FROM the school TO the hospital?', options: ['East', 'North', 'West', 'South'], correctAnswer: 2, explanation: 'If the hospital is West of school, you travel West to get there.' },
                { type: 'multiple-choice', question: 'The mnemonic "Never Eat Soggy Waffles" helps remember...', options: ['Types of food', 'N, E, S, W (directions clockwise)', 'Types of maps', 'Grid coordinates'], correctAnswer: 1, explanation: 'N-E-S-W going clockwise: Never (North), Eat (East), Soggy (South), Waffles (West)!' },
                { type: 'multiple-choice', question: 'Can you use the Sun to find directions?', options: ['No, the Sun moves randomly', 'Yes, it rises in the East', 'Only with a telescope', 'Only at night'], correctAnswer: 1, explanation: 'The Sun rises in the East and sets in the West — a natural compass!', image: '🌅' },
                { type: 'multiple-choice', question: 'A map of your city shows a river running W to E. The river is roughly...', options: ['Vertical on the map', 'Horizontal on the map', 'Diagonal', 'Circular'], correctAnswer: 1, explanation: 'West to East is left to right on a map = horizontal.' },
                { type: 'multiple-choice', question: 'What is a "scale" on a map?', options: ['A weighing scale', 'How much smaller the map is than reality', 'A musical term', 'A type of landmark'], correctAnswer: 1, explanation: 'Map scale tells you the real-world distance represented by a distance on the map.' },
                { type: 'multiple-choice', question: 'If 1 cm on a map = 1 km in reality, and two places are 4 cm apart, the real distance is...', options: ['2 km', '4 km', '8 km', '1 km'], correctAnswer: 1, explanation: '4 cm × 1 km/cm = 4 km.' },
                { type: 'multiple-choice', question: 'Sachin walks North from his house to school, then turns East to the park. What shape path does he make?', options: ['Straight line', 'L-shape', 'U-shape', 'Circle'], correctAnswer: 1, explanation: 'North then East makes a right-angle turn — an L-shape path.' },
                { type: 'multiple-choice', question: 'On a map, a ✈️ symbol usually represents a...', options: ['School', 'Hospital', 'Airport', 'Park'], correctAnswer: 2, explanation: 'Map symbols use a plane icon to show an airport.', image: '✈️' },
                { type: 'multiple-choice', question: 'If the park is SOUTH of the lake and EAST of the library, where is the park relative to both?', options: ['Southeast of both', 'Below the lake and right of the library', 'Northwest corner', 'Center of the map'], correctAnswer: 1, explanation: 'South = below, East = right. So the park is below the lake and to the right of the library.' },
                { type: 'multiple-choice', question: 'A route from Home → Temple → Park → School involves how many turns (at minimum)?', options: ['1', '2', '3', '0'], correctAnswer: 1, explanation: 'Minimum 2 turns: one at the temple and one at the park (assuming they\'re not in a straight line).' },
                { type: 'multiple-choice', question: 'Why do maps have legends/keys?', options: ['To look pretty', 'To explain what symbols on the map mean', 'To show directions', 'To measure distance'], correctAnswer: 1, explanation: 'A map legend explains what each symbol, color, and line on the map represents.' },
            ],
            assessment: [
                { type: 'multiple-choice', question: 'Maps are drawn from a...', options: ['Side view', 'Bird\'s eye (top) view', 'Front view', 'Underwater view'], correctAnswer: 1, explanation: 'Maps show the world from above.' },
                { type: 'multiple-choice', question: 'North is usually at the _____ of a map.', options: ['Bottom', 'Left', 'Right', 'Top'], correctAnswer: 3, explanation: 'By convention, North is at the top.' },
                { type: 'multiple-choice', question: 'The opposite direction of East is...', options: ['North', 'South', 'West', 'Northeast'], correctAnswer: 2, explanation: 'East and West are opposite directions.' },
                { type: 'multiple-choice', question: 'A temple near your school is a _____ on a map.', options: ['Grid', 'Scale', 'Landmark', 'Direction'], correctAnswer: 2, explanation: 'Well-known places used for navigation are landmarks.' },
                { type: 'multiple-choice', question: 'If 1 cm on a map = 2 km, and two cities are 6 cm apart, the real distance is...', options: ['6 km', '8 km', '12 km', '3 km'], correctAnswer: 2, explanation: '6 cm × 2 km/cm = 12 km.' },
                { type: 'multiple-choice', question: 'Facing South, your LEFT side is...', options: ['North', 'East', 'West', 'South'], correctAnswer: 1, explanation: 'Facing South: left = East, right = West.' },
                { type: 'multiple-choice', question: 'The Sun sets in the...', options: ['North', 'East', 'South', 'West'], correctAnswer: 3, explanation: 'The Sun always sets in the West.' },
                { type: 'multiple-choice', question: 'A map legend tells you...', options: ['Directions only', 'What symbols mean', 'The temperature', 'Who made the map'], correctAnswer: 1, explanation: 'The legend explains all the symbols used on the map.' },
                { type: 'multiple-choice', question: 'On a map, which direction is LEFT?', options: ['North', 'South', 'East', 'West'], correctAnswer: 3, explanation: 'West is on the left side of a standard map.' },
                { type: 'multiple-choice', question: 'A compass needle always points to...', options: ['South', 'East', 'North', 'West'], correctAnswer: 2, explanation: 'The compass needle points to magnetic North.' },
                { type: 'multiple-choice', question: '"Walk 500m North, then turn East for 300m." This describes a...', options: ['Scale', 'Symbol', 'Route', 'Landmark'], correctAnswer: 2, explanation: 'Step-by-step directions describe a route.' },
                { type: 'multiple-choice', question: 'If the school is NE of the park, the park is _____ of the school.', options: ['NE', 'NW', 'SW', 'SE'], correctAnswer: 2, explanation: 'Opposite of Northeast is Southwest.' },
                { type: 'multiple-choice', question: 'Why are landmarks useful?', options: ['They look pretty', 'They help you identify where you are', 'They are always on roads', 'They have addresses'], correctAnswer: 1, explanation: 'Landmarks help people orient themselves and give/follow directions.' },
                { type: 'multiple-choice', question: 'A map with 1 cm = 500 m shows a park 3 cm long. Real length?', options: ['500 m', '1000 m', '1500 m', '2000 m'], correctAnswer: 2, explanation: '3 cm × 500 m/cm = 1500 m.' },
                { type: 'multiple-choice', question: 'Facing West, you turn right. You now face...', options: ['East', 'North', 'South', 'West'], correctAnswer: 1, explanation: 'Facing West + turn right = facing North.' },
                { type: 'multiple-choice', question: 'A symbol 🏥 on a map likely represents a...', options: ['School', 'Hospital', 'Park', 'Market'], correctAnswer: 1, explanation: 'The hospital symbol 🏥 represents a medical facility on the map.' },
                { type: 'multiple-choice', question: 'To go from the library (South) to the museum (North), you travel...', options: ['South', 'North', 'East', 'West'], correctAnswer: 1, explanation: 'Moving from South to North means traveling North.' },
                { type: 'multiple-choice', question: 'Rohan walks: East 100m → North 200m → West 100m. He ends up _____ of his start.', options: ['East', 'West', 'North', 'South'], correctAnswer: 2, explanation: 'East 100 then West 100 cancel out. He\'s 200m North of the start.' },
                { type: 'multiple-choice', question: 'Can the same place be "North of place A" AND "South of place B"?', options: ['No, impossible', 'Yes, if it is between them', 'Only on round maps', 'Never'], correctAnswer: 1, explanation: 'A place can be North of one and South of another if it\'s between them.' },
                { type: 'multiple-choice', question: 'Google Maps uses which view primarily?', options: ['Side View', 'Front View', 'Top View (Satellite)', '3D only'], correctAnswer: 2, explanation: 'Google Maps primarily shows a top/satellite view of the world.' },
            ]
        },
        {
            id: 'spatial-puzzles',
            title: 'Spatial Puzzles',
            desc: 'Solve fun spatial reasoning puzzles with grids and views.',
            color: '#dc2626',
            icon: '🧩',
            learnSections: [
                {
                    heading: 'Treasure Hunt on a Grid',
                    content: 'Treasure hunts use grids! You follow clues like "Go 3 squares East and 2 squares North" to find hidden treasure. Each clue brings you closer to the prize!',
                    example: 'Clue: Start at A1. Go right 3, up 2. Treasure is at C4!',
                },
                {
                    heading: 'Mental Rotation',
                    content: 'Can you imagine what an object looks like if you rotate it? A letter "b" turned around becomes "d"! Spatial puzzles challenge your brain to flip, rotate, and transform shapes in your mind.',
                    example: 'If you rotate the letter "p" by 180°, it becomes "d"!',
                }
            ],
            practice: [
                { type: 'multiple-choice', question: 'Clue: Start at A1. Go right 4, up 3. Where is the treasure?', options: ['D5', 'A4', 'C5', 'D4'], correctAnswer: 0, explanation: 'A1 → right 4 → A5. A5 → up 3 → D5. Wait, right 4 from A1 = A5, then up 3 from A5 = D5.', grid: { rows: 6, cols: 6, items: [{ row: 'A', col: 1, label: '📍' }, { row: 'D', col: 5, label: '💎' }] } },
                { type: 'multiple-choice', question: 'You are at B2 facing North. Turn right. Which direction are you now facing?', options: ['South', 'East', 'West', 'North'], correctAnswer: 1, explanation: 'Facing North + turn right = facing East.', grid: { rows: 6, cols: 6, highlightCell: 'B2' } },
                { type: 'multiple-choice', question: 'If you look at the letter "b" in a mirror, you see...', options: ['b', 'd', 'p', 'q'], correctAnswer: 1, explanation: 'A mirror flips left-right, so "b" becomes "d".', image: '🪞' },
                { type: 'multiple-choice', question: 'A square grid has 4 colored squares at A1(Red), A2(Blue), B1(Green), B2(Yellow). If you flip the grid upside-down, what color is now at A1?', options: ['Red', 'Blue', 'Yellow', 'Green'], correctAnswer: 2, explanation: 'Flipping upside-down swaps rows: B2→A1. Yellow was at B2, so now it\'s at A1.', grid: { rows: 4, cols: 4, items: [{ row: 'A', col: 1, label: '🟥' }, { row: 'A', col: 2, label: '🟦' }, { row: 'B', col: 1, label: '🟩' }, { row: 'B', col: 2, label: '🟨' }] } },
                { type: 'multiple-choice', question: 'On a map, the school is 3 blocks East and 2 blocks North of home. What is the shortest walking path?', options: ['3 blocks', '4 blocks', '5 blocks', '6 blocks'], correctAnswer: 2, explanation: 'You must walk 3 East + 2 North = 5 blocks minimum (no diagonal shortcuts on a grid).', grid: { rows: 6, cols: 6 } },
                { type: 'multiple-choice', question: 'How many times do you need to turn right to face the same direction you started?', options: ['2', '3', '4', '1'], correctAnswer: 2, explanation: '4 right turns = 360° = back to starting direction.' },
                { type: 'multiple-choice', question: 'If you rotate a clock 90° clockwise, where does the 12 end up?', options: ['Where 3 was', 'Where 6 was', 'Where 9 was', 'Stays at 12'], correctAnswer: 0, explanation: 'Rotating 90° clockwise moves 12 to the 3 position.', image: '🕐' },
                { type: 'multiple-choice', question: 'A robot starts at C3, goes North 2, East 1, South 1. Where is it?', options: ['D4', 'C4', 'D3', 'B4'], correctAnswer: 0, explanation: 'C3 → North 2 → E3 → East 1 → E4 → South 1 → D4.', grid: { rows: 6, cols: 6, items: [{ row: 'C', col: 3, label: '🤖' }, { row: 'D', col: 4, label: '🏁' }] } },
                { type: 'multiple-choice', question: 'If N is 12 o\'clock, E is 3 o\'clock, S is 6 o\'clock, then W is...', options: ['1 o\'clock', '3 o\'clock', '9 o\'clock', '7 o\'clock'], correctAnswer: 2, explanation: 'West is at the 9 o\'clock position on a compass.' },
                { type: 'multiple-choice', question: 'Two friends start at the same point. One walks North 5 blocks, one walks East 5 blocks. They are now how many "blocks" apart diagonally?', options: ['5', '10', 'More than 5 but less than 10', 'Exactly 5'], correctAnswer: 2, explanation: 'They form a right triangle. The diagonal is √(5²+5²) ≈ 7.07, which is between 5 and 10.', grid: { rows: 6, cols: 6 } },
                { type: 'multiple-choice', question: 'A map puzzle says: "The park is North of the hospital, and the school is East of the park." Where is the school relative to the hospital?', options: ['North', 'East', 'Northeast', 'Northwest'], correctAnswer: 2, explanation: 'Park is North of Hospital. School is East of Park. So School is NE of Hospital.' },
                { type: 'multiple-choice', question: 'If you face South and make a U-turn (180°), you now face...', options: ['East', 'West', 'North', 'South'], correctAnswer: 2, explanation: 'A U-turn reverses your direction. South → 180° → North.' },
                { type: 'multiple-choice', question: 'In a grid puzzle, you need to visit every square exactly once. This is called a...', options: ['Loop', 'Hamiltonian Path', 'Treasure hunt', 'Checkers'], correctAnswer: 1, explanation: 'Visiting every point exactly once is called a Hamiltonian Path!', grid: { rows: 3, cols: 3 } },
                { type: 'multiple-choice', question: 'A treasure map says: "From the oak tree, walk 10 paces East, then 5 paces South." If each pace = 1 grid square, how far from the tree is the treasure?', options: ['15 squares (walking)', '5 squares', '10 squares', '25 squares'], correctAnswer: 0, explanation: 'Walking distance = 10 + 5 = 15 paces/squares.', grid: { rows: 10, cols: 10 } },
                { type: 'multiple-choice', question: 'Looking North on a map, which hand side is West?', options: ['Right', 'Left', 'Top', 'Bottom'], correctAnswer: 1, explanation: 'When facing North: Left = West, Right = East.' },
                { type: 'multiple-choice', question: 'If 3 blocks on a grid map = 600 meters, how long is 1 block?', options: ['100 m', '200 m', '300 m', '600 m'], correctAnswer: 1, explanation: '600 ÷ 3 = 200 meters per block.', grid: { rows: 6, cols: 6 } },
                { type: 'multiple-choice', question: 'A puzzle piece is rotated 90° clockwise. How many 90° rotations bring it back to the original position?', options: ['2', '3', '4', '1'], correctAnswer: 2, explanation: '4 rotations × 90° = 360° = full circle = original position.' },
                { type: 'multiple-choice', question: 'In a maze, "always turn right at every junction" is called the...', options: ['Left-hand rule', 'Right-hand rule', 'North rule', 'Dead-end rule'], correctAnswer: 1, explanation: 'The right-hand rule is a simple maze-solving strategy!' },
                { type: 'multiple-choice', question: 'Rani starts at A1, goes to E5 via the shortest path, then returns to A1 via the shortest path. Total moves?', options: ['8', '12', '16', '20'], correctAnswer: 2, explanation: 'Shortest path A1→E5: right 4 + up 4 = 8 moves. Return = 8 more. Total = 16.', grid: { rows: 6, cols: 6, items: [{ row: 'A', col: 1, label: '📍' }, { row: 'E', col: 5, label: '🏁' }] } },
                { type: 'multiple-choice', question: 'A bird sees the whole city from above. This is the same as reading a...', options: ['Story', 'Map', 'Clock', 'Ruler'], correctAnswer: 1, explanation: 'A map shows the layout of an area from above — same as a bird\'s view!' },
            ],
            assessment: [
                { type: 'multiple-choice', question: 'Start at A1, go right 2, up 3. Where are you?', options: ['D3', 'C2', 'A3', 'C3'], correctAnswer: 0, explanation: 'A1 → right 2 → A3 → up 3 → D3.', grid: { rows: 6, cols: 6, items: [{ row: 'A', col: 1, label: '📍' }, { row: 'D', col: 3, label: '🏁' }] } },
                { type: 'multiple-choice', question: 'Facing East, turn left. You now face...', options: ['West', 'South', 'North', 'East'], correctAnswer: 2, explanation: 'East + left turn = North.' },
                { type: 'multiple-choice', question: '"b" reflected in a mirror becomes...', options: ['b', 'd', 'p', 'q'], correctAnswer: 1, explanation: 'Mirror reflection flips horizontally: b → d.' },
                { type: 'multiple-choice', question: 'To walk 4 blocks East and 3 blocks North on a grid, minimum moves?', options: ['4', '5', '7', '12'], correctAnswer: 2, explanation: '4 + 3 = 7 moves minimum on a grid.', grid: { rows: 6, cols: 6 } },
                { type: 'multiple-choice', question: 'How many right turns to face the opposite direction?', options: ['1', '2', '3', '4'], correctAnswer: 1, explanation: '2 right turns = 180° = opposite direction.' },
                { type: 'multiple-choice', question: 'A clock rotated 180° — where is the 6 now?', options: ['At 12\'s position', 'At 3\'s position', 'At 9\'s position', 'Stays at 6'], correctAnswer: 0, explanation: '180° rotation moves 6 to where 12 was.' },
                { type: 'multiple-choice', question: 'The park is West of the school. You leave the school going to the park. You travel...', options: ['East', 'West', 'North', 'South'], correctAnswer: 1, explanation: 'If the park is West, you travel West to get there.' },
                { type: 'multiple-choice', question: 'A pattern reads: ▲▼▲▼▲. What comes next?', options: ['▲', '▼', '■', '●'], correctAnswer: 1, explanation: 'The pattern alternates ▲▼. Next is ▼.' },
                { type: 'multiple-choice', question: 'Robot path: Start at B2. North 3, East 2, South 1. Final position?', options: ['D4', 'E4', 'C4', 'D2'], correctAnswer: 0, explanation: 'B2 → N3 → E2 → E4 → S1 → D4.', grid: { rows: 6, cols: 6, items: [{ row: 'B', col: 2, label: '🤖' }, { row: 'D', col: 4, label: '🏁' }] } },
                { type: 'multiple-choice', question: 'In a treasure hunt, clue says "Go to the square NE of C3." That is...', options: ['D4', 'B2', 'D2', 'B4'], correctAnswer: 0, explanation: 'NE of C3: North (C→D) + East (3→4) = D4.', grid: { rows: 6, cols: 6, items: [{ row: 'C', col: 3, label: '📍' }, { row: 'D', col: 4, label: '🏁' }] } },
                { type: 'multiple-choice', question: 'A map shows: Home → Temple (2 km E) → Park (3 km N). Park is _____ of Home.', options: ['Northeast', 'Northwest', 'Southeast', 'Southwest'], correctAnswer: 0, explanation: 'East then North from Home = Northeast direction.' },
                { type: 'multiple-choice', question: 'If you fold a square paper in half diagonally, you get a...', options: ['Rectangle', 'Triangle', 'Circle', 'Smaller square'], correctAnswer: 1, explanation: 'Folding a square diagonally produces a triangle.' },
                { type: 'multiple-choice', question: 'Facing North, you turn left twice. You now face...', options: ['North', 'South', 'East', 'West'], correctAnswer: 1, explanation: 'Left once = West. Left again = South.' },
                { type: 'multiple-choice', question: 'A grid puzzle: How many unique shortest paths from A1 to B2?', options: ['1', '2', '3', '4'], correctAnswer: 1, explanation: 'Two options: Right then Up, or Up then Right.', grid: { rows: 3, cols: 3, items: [{ row: 'A', col: 1, label: '📍' }, { row: 'B', col: 2, label: '🏁' }] } },
                { type: 'multiple-choice', question: 'A ball viewed from any angle looks like a circle. This is because a ball is a...', options: ['Cube', 'Cylinder', 'Sphere', 'Pyramid'], correctAnswer: 2, explanation: 'A sphere has the same silhouette (circle) from every direction.' },
                { type: 'multiple-choice', question: 'On a grid, two ants start at A1. Ant 1 goes right 5. Ant 2 goes up 5. They are now...', options: ['At the same place', 'On the same row', 'On the same column', 'Far apart'], correctAnswer: 3, explanation: 'Ant 1 is at A6, Ant 2 is at F1. They are far apart in different positions.', grid: { rows: 6, cols: 6, items: [{ row: 'A', col: 1, label: '🐜' }] } },
                { type: 'multiple-choice', question: 'A compass rose shows 8 directions. The 4 extras (NE, SE, SW, NW) are called...', options: ['Primary directions', 'Ordinal/Inter-cardinal directions', 'Random directions', 'Grid directions'], correctAnswer: 1, explanation: 'The in-between directions are called ordinal or inter-cardinal directions.' },
                { type: 'multiple-choice', question: 'If a building looks like a rectangle from the front AND from the side, it could be a...', options: ['Sphere', 'Cone', 'Rectangular Prism (Box)', 'Pyramid'], correctAnswer: 2, explanation: 'A rectangular prism shows rectangles from both the front and side views.' },
                { type: 'multiple-choice', question: 'A maze always has at least one path from start to...', options: ['Nowhere', 'The center', 'The finish/exit', 'The top'], correctAnswer: 2, explanation: 'A valid maze always has at least one path from start to exit.' },
                { type: 'multiple-choice', question: 'Spatial reasoning helps you in real life by...', options: ['Only playing games', 'Understanding directions, maps, and object layouts', 'Nothing useful', 'Only in math class'], correctAnswer: 1, explanation: 'Spatial reasoning is essential for navigation, design, problem-solving, and everyday life!' },
            ]
        }
    ];
};
