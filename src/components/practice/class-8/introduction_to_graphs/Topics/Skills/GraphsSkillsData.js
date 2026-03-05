// ─── GraphsSkillsData.js ─────────────────────────────────────────────────────
// All question pools for the Introduction to Graphs skills section.
// Questions with dynamic numbers are generated fresh each call via generator functions.
// Use shuffle(pool, n) to randomly sample n questions from a pool.

// ─── HELPER ─────────────────────────────────────────────────────────────────
export function shuffle(arr, n) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
}

// Random integer between min and max (inclusive)
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ─── DYNAMIC QUESTION GENERATORS ─────────────────────────────────────────────
// Each function returns a fresh question object with randomized numbers.

function genReadValue() {
    const time = rand(1, 10);
    const temp = rand(30, 42);
    return {
        question: `On a line graph, a patient's temperature at ${time} PM is ${temp}°C. What is the Y-axis value at that time?`,
        options: [`${temp - 2}°C`, `${temp}°C`, `${temp + 2}°C`, `${temp + 5}°C`],
        correct: 1,
        explanation: `The Y-axis value at ${time} PM directly reads off the plotted point — it is ${temp}°C.`
    };
}

function genRisingLine() {
    const a = rand(20, 40);
    const b = rand(42, 60);
    return {
        question: `A plant grew from ${a} cm to ${b} cm over a week. What does the segment of the line graph between these points show?`,
        options: ['A decrease', 'No change', 'An increase', 'A flat line'],
        correct: 2,
        explanation: `The height increased from ${a} cm to ${b} cm — the line rises from left to right, showing an INCREASE.`
    };
}

function genFallingLine() {
    const high = rand(38, 41);
    const low = high - rand(2, 4);
    return {
        question: `A patient's fever dropped from ${high}°C to ${low}°C overnight. The line graph segment between these two points is:`,
        options: ['Rising', 'Flat', 'Falling', 'Curved'],
        correct: 2,
        explanation: `Temperature decreased from ${high}°C to ${low}°C — this is represented by a falling (downward) line on the graph.`
    };
}

function genFlatLine() {
    const val = rand(35, 45);
    const h1 = rand(8, 10);
    const h2 = h1 + rand(2, 4);
    return {
        question: `A graph shows temperature constant at ${val}°C from ${h1}:00 AM to ${h2}:00 AM. The line between those two points is:`,
        options: ['Rising', 'Falling', 'A horizontal flat line', 'A vertical line'],
        correct: 2,
        explanation: `Constant value = horizontal (flat) line. Temperature stayed at ${val}°C — no change = flat segment.`
    };
}

function genScale() {
    const range = rand(20, 50);
    const intervals = rand(4, 6);
    const scale = range / intervals;
    return {
        question: `A line graph needs to show data ranging from 0 to ${range} in ${intervals} equal intervals. What should the scale be per division?`,
        options: [`${scale - 1}`, `${scale}`, `${scale + 1}`, `${scale * 2}`],
        correct: 1,
        explanation: `Scale = Range ÷ Intervals = ${range} ÷ ${intervals} = ${scale} per division.`
    };
}

function genSteepSlope() {
    const speedA = rand(40, 60);
    const speedB = speedA + rand(10, 30);
    return {
        question: `On a distance-time graph, Car A travels at ${speedA} km/h and Car B at ${speedB} km/h. Which car's line is steeper?`,
        options: ['Car A', 'Car B', 'Both are equally steep', "Neither — they're the same"],
        correct: 1,
        explanation: `Steeper slope = faster speed. Car B (${speedB} km/h) covers more distance per hour — its line is steeper.`
    };
}

function genPlotPoint() {
    const x = rand(2, 8);
    const y = rand(30, 80);
    return {
        question: `To plot the ordered pair (${x}, ${y}) on a line graph, you should:`,
        options: [
            `Find ${y} on X-axis, go up to ${x}`,
            `Find ${x} on X-axis, move up to ${y} on Y-axis`,
            `Find ${x} on Y-axis, move right to ${y}`,
            `Plot at the intersection of ${x + y} on both axes`
        ],
        correct: 1,
        explanation: `X-axis = first coordinate (${x}), Y-axis = second coordinate (${y}). Find ${x} on horizontal axis, move up to ${y}.`
    };
}

function genBarVsLine() {
    const citiesCount = rand(4, 8);
    return {
        question: `A survey collects favourite sports of ${citiesCount * 10} students. Is a line graph appropriate here?`,
        options: ['Yes, for any data', 'No, because this is categorical data, not continuous change over time', 'Yes, only if plotted carefully', 'Yes, always use line graphs for surveys'],
        correct: 1,
        explanation: `Line graphs show continuous change over time. Favourite sports is categorical — a bar chart is the right choice.`
    };
}

function genCompareSlopes() {
    const m1 = rand(2, 4);
    const m2 = m1 + rand(1, 3);
    return {
        question: `Graph A has the equation y = ${m1}x and Graph B has y = ${m2}x. Which graph rises faster?`,
        options: [`y = ${m1}x (Graph A)`, `y = ${m2}x (Graph B)`, 'Both rise at the same rate', 'Cannot compare'],
        correct: 1,
        explanation: `The coefficient (slope) of x determines steepness. ${m2} > ${m1}, so Graph B (y = ${m2}x) rises faster.`
    };
}

function genTotalFromGraph() {
    const days = rand(5, 7);
    const vals = Array.from({ length: days }, () => rand(5, 20));
    const total = vals.reduce((a, b) => a + b, 0);
    const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].slice(0, days);
    const listStr = dayLabels.map((d, i) => `${d}: ${vals[i]}`).join(', ');
    return {
        question: `A line graph shows daily rainfall (mm): ${listStr}. What is the total rainfall for the period?`,
        options: [`${total - 5} mm`, `${total} mm`, `${total + 5} mm`, `${vals[0] + vals[days - 1]} mm`],
        correct: 1,
        explanation: `Total = ${vals.join(' + ')} = ${total} mm. Read all Y-values and add them together.`
    };
}

/* ─── LINEAR GRAPH DYNAMIC GENERATORS ──────────────────────────────────────── */

function genLinearYValue() {
    const m = rand(2, 6);
    const x = rand(2, 8);
    const y = m * x;
    return {
        question: `What is the y-value when x = ${x} in the equation y = ${m}x?`,
        options: [`${y - m}`, `${y}`, `${y + m}`, `${x + m}`],
        correct: 1,
        explanation: `Substitute x = ${x}: y = ${m} × ${x} = ${y}. The ordered pair is (${x}, ${y}).`
    };
}

function genDistanceTime() {
    const speed = rand(30, 80);
    const time = rand(2, 7);
    const distance = speed * time;
    return {
        question: `A car travels at ${speed} km/h. Using d = ${speed}t, what is the distance after ${time} hours?`,
        options: [`${distance - speed} km`, `${distance} km`, `${distance + speed} km`, `${speed + time} km`],
        correct: 1,
        explanation: `d = ${speed} × ${time} = ${distance} km. Substitute t = ${time} into the equation.`
    };
}

function genPerimeterSquare() {
    const side = rand(3, 12);
    const perimeter = 4 * side;
    return {
        question: `Using P = 4s, find the perimeter of a square with side ${side} cm.`,
        options: [`${perimeter - 4} cm`, `${perimeter} cm`, `${perimeter + 4} cm`, `${side * side} cm`],
        correct: 1,
        explanation: `P = 4 × ${side} = ${perimeter} cm. P = 4s is linear — its graph is a straight line through the origin.`
    };
}

function genFindK() {
    const k = rand(2, 8);
    const px = rand(2, 6);
    const py = k * px;
    return {
        question: `The graph of y = kx passes through (${px}, ${py}). What is k?`,
        options: [`${k - 1}`, `${k}`, `${k + 1}`, `${py}`],
        correct: 1,
        explanation: `${py} = k × ${px} → k = ${py} ÷ ${px} = ${k}. So the equation is y = ${k}x.`
    };
}

function genSlopeCompare() {
    const m1 = rand(1, 3);
    const m2 = m1 + rand(2, 4);
    return {
        question: `Two linear graphs: y = ${m1}x and y = ${m2}x. On the SAME axes, which is steeper?`,
        options: [`y = ${m1}x`, `y = ${m2}x`, 'They are equally steep', 'Cannot tell without a table'],
        correct: 1,
        explanation: `Higher coefficient = steeper line. ${m2} > ${m1}, so y = ${m2}x is steeper.`
    };
}

function genDirectProportion() {
    const m = rand(2, 6);
    const factor = rand(2, 4);
    const newY = m * factor;
    return {
        question: `In y = ${m}x (direct proportion), if x is multiplied by ${factor}, what happens to y?`,
        options: [`y stays the same`, `y is divided by ${factor}`, `y is also multiplied by ${factor}`, `y increases by ${factor}`],
        correct: 2,
        explanation: `In direct proportion y = ${m}x, doubling x doubles y. Multiplying x by ${factor} multiplies y by the same factor.`
    };
}

function genWaterTank() {
    const rate = rand(8, 20);
    const time = rand(3, 8);
    const volume = rate * time;
    return {
        question: `A water tank fills at ${rate} litres per minute. The equation is V = ${rate}t. After ${time} minutes, what is V?`,
        options: [`${volume - rate} L`, `${volume} L`, `${volume + rate} L`, `${rate + time} L`],
        correct: 1,
        explanation: `V = ${rate} × ${time} = ${volume} litres. Substitute t = ${time} into V = ${rate}t.`
    };
}

function genXIntercept() {
    const m = rand(2, 5);
    const c = rand(2, 8);
    return {
        question: `For y = ${m}x + ${c}, what is the y-intercept (value of y when x = 0)?`,
        options: [`${m}`, `0`, `${c}`, `${m + c}`],
        correct: 2,
        explanation: `When x = 0: y = ${m}×0 + ${c} = ${c}. The y-intercept is ${c} — the line crosses the Y-axis here.`
    };
}

// ─── STATIC QUESTION BANKS ────────────────────────────────────────────────────
// Fixed conceptual questions that don't need dynamic numbers

const lineGraphStaticPractice = [
    { question: 'A line graph is best used when data changes _____ over time.', options: ['Randomly', 'Continuously', 'Only once', 'Does not change'], correct: 1, explanation: 'Line graphs are perfect for continuously changing data, like temperature over hours or plant height over weeks.' },
    { question: 'On a line graph, the X-axis usually represents:', options: ['The dependent variable', 'The quantity being measured', 'Time or the independent variable', 'The scale of the graph'], correct: 2, explanation: 'The X-axis (horizontal) typically shows time or the independent variable.' },
    { question: 'The scale on both axes of a line graph must be:', options: ['Random for visual appeal', 'Uniform — equal spacing throughout', 'Different on X and Y always', 'Starting from 100'], correct: 1, explanation: 'A uniform scale (equal spacing between marked values) is essential for an accurate and readable line graph.' },
    { question: 'Which of the following CANNOT be shown effectively with a line graph?', options: ['Temperature over 24 hours', 'Plant height over 6 weeks', 'Favourite colours of 30 students', 'Company profits over 5 years'], correct: 2, explanation: 'Favourite colours is categorical data — a bar graph is better suited.' },
    { question: 'After plotting all points on a line graph, you should:', options: ['Leave the points as dots only', 'Join consecutive points with straight line segments', 'Draw a smooth curve through all points', 'Connect first and last point only'], correct: 1, explanation: 'Connect each point to the NEXT consecutive point with a straight line segment.' },
    { question: 'A line graph shows a student\'s marks going 60 → 72 → 68 → 80 over 4 terms. The overall trend is:', options: ['Steadily decreasing', 'No pattern', 'Generally increasing with a small dip', 'Constant'], correct: 2, explanation: 'There is a general upward trend with a slight dip in Term 3.' },
    { question: 'Why is a line graph more useful than a table for showing trends?', options: ['Tables have errors; graphs do not', 'Graphs are always more accurate', 'Graphs provide instant visual insight into trends, rises, and falls', 'Tables take more time to draw'], correct: 2, explanation: 'A line graph gives an instant visual picture of trends — our brains process the visual faster than a column of numbers.' },
];

const lineGraphStaticAssessment = [
    { question: 'Two students A and B both show rising marks over terms. A\'s slope is steeper. What does this mean?', options: ['A started with higher marks', 'A is improving at a faster rate than B', 'B is improving faster than A', 'They have the same improvement rate'], correct: 1, explanation: 'A steeper slope means faster change. Student A\'s marks improve at a FASTER RATE per term.' },
    { question: 'A line graph shows profits: 2020: ₹50L, 2021: ₹80L, 2022: ₹60L, 2023: ₹90L. In which period did profits FALL?', options: ['2020–2021', '2021–2022', '2022–2023', 'Profits never fell'], correct: 1, explanation: 'Profits fell from ₹80L in 2021 to ₹60L in 2022.' },
    { question: 'On a temperature line graph, the highest point represents:', options: ['The coldest time', 'The time with most rainfall', 'The maximum temperature recorded', 'The end of the day'], correct: 2, explanation: 'The highest point on a temperature line graph represents the maximum (peak) temperature recorded.' },
    { question: 'A graph shows "constant" values for Monday and Tuesday (both 30), and 35 on Wednesday. The flat segment is between:', options: ['Tue–Wed', 'Mon–Tue and Tue–Wed', 'Only Mon–Tue', 'No flat segment'], correct: 2, explanation: 'Monday and Tuesday both have value 30 — the line between them is horizontal (flat).' },
    { question: 'Which correctly describes HOW to draw a line graph, in order?', options: ['Plot points → Label → Draw → Scale → Join', 'Draw axes → Choose scale → Label → Plot points → Join', 'Join → Plot → Draw → Label → Scale', 'Scale → Join → Draw → Plot → Label'], correct: 1, explanation: 'Correct order: Draw axes → Choose uniform scale → Label both axes → Plot points → Join consecutive points.' },
];

const linearGraphStaticPractice = [
    { question: 'The graph of y = x is a straight line that passes through:', options: ['(1,0) and (0,1)', 'Origin (0,0) and (2,2)', '(1,2) and (2,1)', '(0,1) and (1,0)'], correct: 1, explanation: 'y = x means every y-value equals x. (0,0), (1,1), (2,2) all lie on this line.' },
    { question: 'A car travels at constant speed. Its distance-time graph is:', options: ['A curve', 'A horizontal line', 'A straight line through the origin', 'A vertical line'], correct: 2, explanation: 'Constant speed means d = speed × t — a linear equation. Its graph is a straight line through the origin.' },
    { question: 'Why does a steeper line on a distance-time graph indicate faster speed?', options: ['Steeper means more distance per unit of time', 'Steeper means the car started earlier', 'Steeper means the car is slowing down', 'Steeper means fewer stops'], correct: 0, explanation: 'Slope = distance ÷ time = speed. A steeper slope = more distance per time = faster speed.' },
    { question: 'Two quantities are in direct proportion if their graph is:', options: ['A curve through origin', 'A straight line through the origin', 'Any straight line', 'A horizontal line'], correct: 1, explanation: 'Direct proportion means y = kx. This always gives a straight line through the origin (0,0).' },
    { question: 'For the perimeter graph P = 4s, what is the gradient (slope) of the line?', options: ['1', '2', '4', 's'], correct: 2, explanation: 'P = 4s is in the form y = mx where m = 4. The slope is 4.' },
    { question: 'To plot y = x + 2, which THREE points would you use?', options: ['(0,0), (1,1), (2,2)', '(0,2), (1,3), (2,4)', '(0,1), (1,2), (2,3)', '(2,0), (3,1), (4,2)'], correct: 1, explanation: 'y = x + 2: x=0→y=2, x=1→y=3, x=2→y=4. Points: (0,2), (1,3), (2,4).' },
    { question: 'Which equation produces a LINEAR graph (straight line)?', options: ['y = x²', 'y = 1/x', 'y = 4x + 1', 'y = x³'], correct: 2, explanation: 'y = 4x + 1 is linear (highest power of x is 1). Its graph is a straight line.' },
];

const linearGraphStaticAssessment = [
    { question: 'The perimeter-side graph for equilateral triangles is P = 3s. For squares it is P = 4s. What changes?', options: ['The line starts at a different point', 'The slope increases from 3 to 4 — the square line is steeper', 'The line becomes curved', 'P decreases for same s'], correct: 1, explanation: 'P = 3s has slope 3; P = 4s has slope 4. The square line is steeper.' },
    { question: 'A horizontal line on a distance-time graph means:', options: ['Fast constant speed', 'Object is moving backwards', 'Object has stopped (distance not changing)', 'Object is accelerating'], correct: 2, explanation: 'Horizontal line = zero slope = zero speed. The object is stationary.' },
    { question: 'If y = kx passes through the origin, what must always be true?', options: ['k must equal 1', 'The graph is a straight line through (0,0)', 'y always equals x', 'k must be positive'], correct: 1, explanation: 'Any equation y = kx produces a straight line through the origin, regardless of the value of k.' },
];

// ─── BUILD FULL QUESTION POOLS ────────────────────────────────────────────────
// Each time the pool is "built", it calls the generators fresh to get new random numbers.

export function buildLineGraphPracticePool() {
    return [
        ...lineGraphStaticPractice,
        genReadValue(), genReadValue(),
        genRisingLine(), genRisingLine(),
        genFallingLine(), genFallingLine(),
        genFlatLine(), genFlatLine(),
        genScale(), genScale(),
        genSteepSlope(),
        genPlotPoint(), genPlotPoint(),
        genBarVsLine(),
        genTotalFromGraph(), genTotalFromGraph(),
        genCompareSlopes(),
        genTotalFromGraph(),
    ];
}

export function buildLineGraphAssessmentPool() {
    return [
        ...lineGraphStaticAssessment,
        genReadValue(), genReadValue(),
        genRisingLine(),
        genFallingLine(),
        genFlatLine(),
        genScale(),
        genSteepSlope(),
        genPlotPoint(),
        genBarVsLine(),
        genTotalFromGraph(),
    ];
}

export function buildLinearGraphPracticePool() {
    return [
        ...linearGraphStaticPractice,
        genLinearYValue(), genLinearYValue(), genLinearYValue(),
        genDistanceTime(), genDistanceTime(), genDistanceTime(),
        genPerimeterSquare(), genPerimeterSquare(),
        genFindK(), genFindK(),
        genSlopeCompare(), genSlopeCompare(),
        genDirectProportion(),
        genWaterTank(), genWaterTank(),
        genXIntercept(), genXIntercept(),
    ];
}

export function buildLinearGraphAssessmentPool() {
    return [
        ...linearGraphStaticAssessment,
        genLinearYValue(), genLinearYValue(),
        genDistanceTime(), genDistanceTime(),
        genPerimeterSquare(),
        genFindK(), genFindK(),
        genSlopeCompare(),
        genWaterTank(),
        genXIntercept(),
        genDirectProportion(),
    ];
}
