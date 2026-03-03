import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import('../../graphs.css');

// Chart components
import { PatientTemperatureChart, TrendLinesChart, LinearGraphChart, CoordinateGridChart, OriginHighlightChart, OrderedPairHighlightChart, XAxisHighlightChart } from '../components/DynamicCharts';
// ─── SHARED QUIZ ENGINE ─────────────────────────────────────────────────────
function QuizEngine({ questions, title, onBack, color }) {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const q = questions[current];
    const progress = ((current + (finished ? 1 : 0)) / questions.length) * 100;

    const handleSelect = (idx) => {
        if (answered) return;
        setSelected(idx);
        setAnswered(true);
        if (idx === q.correct) setScore(s => s + 1);
    };

    const handleNext = () => {
        if (current + 1 >= questions.length) setFinished(true);
        else { setCurrent(c => c + 1); setSelected(null); setAnswered(false); }
    };

    if (finished) {
        const pct = Math.round((score / questions.length) * 100);
        const msg = pct >= 90 ? '🏆 Mastered!' : pct >= 75 ? '🌟 Great Job!' : pct >= 50 ? '👍 Keep it up!' : '💪 Keep Learning!';
        const msgSub = pct >= 90 ? 'You have excellent understanding of graphs!' : 'Review the concepts and try again for 100%.';
        return (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ width: 140, height: 140, borderRadius: '50%', background: `conic-gradient(${color} ${pct * 3.6}deg, #f1f5f9 0deg)`, margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '8px solid #fff' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: 40, fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{score}</div>
                        <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>out of {questions.length}</div>
                    </div>
                </div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 28, fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>{msg}</h2>
                <p style={{ color: '#64748b', fontSize: 15, margin: '0 0 32px' }}>{msgSub}</p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                    <button className="grph-btn-primary" onClick={() => { setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setFinished(false); }} style={{ background: color }}>Try Again</button>
                    <button className="grph-btn-secondary" onClick={onBack}>Return to Skills</button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <div style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 12 }}>
                    <div>
                        <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>Skill Verification</div>
                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800, color: '#0f172a', margin: 0 }}>{title}</h3>
                    </div>
                    <div style={{ fontSize: 13, color: '#64748b', fontWeight: 700 }}>Q <span style={{ color }}>{current + 1}</span> / {questions.length}</div>
                </div>
                <div style={{ background: '#f1f5f9', borderRadius: 10, height: 6, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${progress}%`, background: color, borderRadius: 10, transition: 'width 0.4s ease' }} />
                </div>
            </div>

            <div style={{ background: '#fff', borderRadius: 20, padding: '32px 36px', marginBottom: 20, boxShadow: '0 12px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: `${color}15`, padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 800, color, marginBottom: 16 }}>QUESTION {current + 1}</div>
                <div className="grph-quiz-q-text" style={{ fontSize: 18, fontWeight: 600, color: '#0f172a', lineHeight: 1.6, marginBottom: 24 }}>{q.question}</div>

                {/* Visual Aid for Questions */}
                {q.chart && (
                    <div style={{ marginBottom: 24, padding: '16px 20px', background: '#f8fafc', borderRadius: 16, border: '1px solid rgba(0,0,0,0.03)' }}>
                        {React.createElement(q.chart, { height: 180 })}
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
                    {q.options.map((opt, oi) => {
                        let borderColor = 'rgba(0,0,0,0.04)', bgColor = '#fff', textColor = '#0f172a', dotColor = '#f1f5f9';
                        if (answered) {
                            if (oi === q.correct) { borderColor = '#059669'; bgColor = 'rgba(5,150,105,0.05)'; textColor = '#059669'; dotColor = '#059669'; }
                            else if (oi === selected) { borderColor = '#ef4444'; bgColor = 'rgba(239,68,68,0.05)'; textColor = '#ef4444'; dotColor = '#ef4444'; }
                        } else if (selected === oi) { borderColor = color; bgColor = `${color}05`; dotColor = color; }
                        return (
                            <button key={oi} onClick={() => handleSelect(oi)} disabled={answered}
                                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12, border: `2.5px solid ${borderColor}`, background: bgColor, cursor: answered ? 'default' : 'pointer', fontSize: 15, color: textColor, textAlign: 'left', transition: 'all 0.2s', fontWeight: selected === oi ? 700 : 500 }}>
                                <div style={{ width: 10, height: 10, borderRadius: '50%', background: dotColor, flexShrink: 0 }} />
                                {opt}
                            </button>
                        );
                    })}
                </div>
                {answered && (
                    <div style={{ marginTop: 24, padding: '16px 20px', borderRadius: 12, background: 'rgba(5,150,105,0.05)', border: '1px solid rgba(5,150,105,0.1)', color: '#475569', fontSize: 13.5, lineHeight: 1.6 }}>
                        <strong style={{ color }}>💡 Explanation: </strong>{q.explanation}
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={handleNext} disabled={!answered} className="grph-btn-primary"
                    style={{ padding: '12px 40px', background: answered ? color : '#f1f5f9', color: answered ? '#fff' : '#94a3b8', cursor: answered ? 'pointer' : 'not-allowed', border: 'none', borderRadius: 100, fontSize: 15, fontWeight: 800, boxShadow: answered ? `0 8px 20px ${color}30` : 'none' }}>
                    {current + 1 >= questions.length ? 'See Final Score' : 'Next Question'}
                </button>
            </div>
        </div>
    );
}

// ─── PRACTICE QUESTIONS ─────────────────────────────────────────────────────
const lineGraphPractice = [
    { question: 'A line graph is best used when data changes _____ over time.', options: ['Randomly', 'Continuously', 'Only once', 'Does not change'], correct: 1, explanation: 'Line graphs are perfect for continuously changing data, like temperature over hours or plant height over weeks.' },
    { question: 'On a line graph, the X-axis usually represents:', options: ['The dependent variable', 'The quantity being measured', 'Time or the independent variable', 'The scale of the graph'], correct: 2, explanation: 'The X-axis (horizontal) typically shows time or the independent variable — the thing we control or observe at fixed intervals.' },
    { question: 'A rising line on a line graph from left to right means:', options: ['The value is decreasing', 'The value is constant', 'The value is increasing', 'The graph has an error'], correct: 2, explanation: 'A line going upward from left to right shows an increase in the quantity over time.', chart: TrendLinesChart },
    { question: 'What does a FLAT horizontal line indicate on a line graph?', options: ['Rapid increase', 'No change / constant value', 'Data is missing', 'Sudden decrease'], correct: 1, explanation: 'A flat horizontal line means the quantity is NOT changing — it remains constant over that period of time.', chart: TrendLinesChart },
    { question: 'A patient\'s temperature was 37°C at 8 AM and 40°C at 12 PM. What does the line between these two points show?', options: ['Constant temperature', 'Decreasing temperature', 'Increasing temperature', 'No relationship'], correct: 2, explanation: 'The temperature rose from 37°C to 40°C — the connecting line shows an upward (increasing) trend.', chart: PatientTemperatureChart },
    { question: 'To read the value at a specific time from a line graph, you should:', options: ['Estimate without looking at the graph', 'Find the time on X-axis, go up to the line, then read Y-axis', 'Find the value on Y-axis first, always', 'Skip to the highest point only'], correct: 1, explanation: 'To find a Y-value at a given time: locate the time on the X-axis, move straight up until you hit the line, then read across to the Y-axis.' },
    { question: 'The scale on both axes of a line graph must be:', options: ['Random for visual appeal', 'Uniform — equal spacing throughout', 'Different on X and Y always', 'Starting from 100'], correct: 1, explanation: 'A uniform scale (equal spacing between marked values) is essential for an accurate and readable line graph.' },
    { question: 'Which of the following CANNOT be shown effectively with a line graph?', options: ['Temperature over 24 hours', 'Plant height over 6 weeks', 'Favourite colours of 30 students', 'Company profits over 5 years'], correct: 2, explanation: 'Favourite colours is categorical data (not continuous over time) — a bar graph is better suited. Line graphs show continuous change over time.' },
    { question: 'A graph shows a student\'s marks: Term 1: 60, Term 2: 72, Term 3: 68, Term 4: 80. What is the overall trend?', options: ['Steadily decreasing', 'No pattern', 'Generally increasing with a small dip', 'Constant'], correct: 2, explanation: 'Marks went 60 → 72 → 68 → 80. There is a general upward trend with a slight dip in Term 3.' },
    { question: 'When drawing a line graph, after plotting all points, you should:', options: ['Leave the points as dots only', 'Join consecutive points with straight line segments', 'Draw a smooth curve through all points', 'Connect first and last point only'], correct: 1, explanation: 'Connect each point to the NEXT consecutive point with a straight line segment. This creates the characteristic "line" of a line graph.' },
];

const lineGraphAssessment = [
    { question: 'A line graph shows height of water in a tank. The line falls steeply at 2 PM. What does this mean?', options: ['Water is being added slowly', 'Water level is increasing rapidly', 'Water is draining out quickly', 'No change at 2 PM'], correct: 2, explanation: 'A steeply falling line means the quantity is DECREASING RAPIDLY. The steeper the fall, the faster the decrease.', chart: TrendLinesChart },
    { question: 'On a line graph of temperature, the highest point represents:', options: ['The coldest time', 'The time with most rainfall', 'The maximum temperature recorded', 'The end of the day'], correct: 2, explanation: 'The highest point on a temperature line graph represents the maximum (peak) temperature recorded.', chart: PatientTemperatureChart },
    { question: 'Two students A and B both show rising lines on marks-vs-term graphs. A\'s line is steeper. What does this mean?', options: ['A started with higher marks', 'A is improving at a faster rate than B', 'B is improving faster than A', 'They have the same improvement rate'], correct: 1, explanation: 'A steeper slope means faster change. Student A\'s marks are improving at a FASTER RATE per term than Student B.' },
    { question: 'A line graph shows profits of a company: 2020: ₹50L, 2021: ₹80L, 2022: ₹60L, 2023: ₹90L. In which period did profits FALL?', options: ['2020–2021', '2021–2022', '2022–2023', 'Profits never fell'], correct: 1, explanation: 'Profits fell from ₹80L in 2021 to ₹60L in 2022. The line between 2021 and 2022 is the one that goes downward.' },
    { question: 'To plot the point representing "3 hours, 150 km" on a distance-time graph:', options: ['Find 150 on X-axis, go up to 3', 'Find 3 on X-axis, go up to 150 on Y-axis', 'Find 150 on Y-axis, go left to 3', 'Plot at the middle of the graph'], correct: 1, explanation: 'Time (independent variable) goes on the X-axis. Find 3 on X-axis, move up to 150 on the Y-axis — that is the point (3, 150).' },
    { question: 'A graph shows a patient\'s temperature falling below 37°C at 6 PM. What does this suggest?', options: ['The patient is getting worse', 'The patient is recovering (temperature normalising)', 'The graph has an error', 'Temperature is still very high'], correct: 1, explanation: 'Normal body temperature is ~37°C. A temperature falling back towards 37°C suggests the patient\'s fever is reducing — they are recovering.' },
    { question: 'Between which intervals is the line graph "constant" if values are: Monday 30, Tuesday 30, Wednesday 35?', options: ['Mon–Tue and Tue–Wed', 'Only Mon–Tue', 'Only Tue–Wed', 'No constant interval'], correct: 1, explanation: 'Monday and Tuesday both have the same value (30), so the line between those two points is horizontal — constant.' },
    { question: 'Why is a line graph MORE useful than a table of numbers for showing trends?', options: ['Tables have errors; graphs do not', 'Graphs are always more accurate', 'Graphs provide instant visual insight into trends, rises, and falls', 'Tables take more time to draw'], correct: 2, explanation: 'A line graph gives an instant visual picture of the trend — our brains understand rising and falling lines much faster than scanning a column of numbers.' },
    { question: 'A graph shows daily rainfall in mm for a week. Which feature would help you find the TOTAL rainfall?', options: ['The highest point only', 'The slope of the line', 'Reading Y-values for each day and adding them up', 'Drawing a second line'], correct: 2, explanation: 'To find total rainfall, read the Y-axis (mm) value for each day and add all values together.' },
    { question: 'Which of the following correctly describes how to DRAW a line graph, in order?', options: ['Plot points → Label axes → Draw axes → Choose scale → Join points', 'Draw axes → Choose scale → Label axes → Plot points → Join points', 'Join points → Plot points → Draw axes → Label axes → Choose scale', 'Choose scale → Join points → Draw axes → Plot points → Label axes'], correct: 1, explanation: 'Correct order: Draw axes → Choose a uniform scale → Label both axes → Plot each (x,y) point → Join consecutive points with line segments.' },
];

const linearGraphPractice = [
    { question: 'What is the y-value when x = 3 in the equation y = 2x?', options: ['2', '5', '6', '9'], correct: 2, explanation: 'Substitute x = 3: y = 2 × 3 = 6. The ordered pair is (3, 6).', chart: LinearGraphChart },
    { question: 'The graph of y = x is a straight line that passes through:', options: ['(1, 0) and (0, 1)', 'Origin (0,0) and (2, 2)', '(1, 2) and (2, 1)', '(0, 1) and (1, 0)'], correct: 1, explanation: 'y = x means every y-value equals x. So (0,0), (1,1), (2,2) all lie on this line. It passes through the origin.', chart: OriginHighlightChart },
    { question: 'For the equation y = 3x, what is the value of y when x = 0?', options: ['3', '1', '0', 'Undefined'], correct: 2, explanation: 'When x = 0: y = 3 × 0 = 0. The line passes through the origin (0, 0).', chart: OriginHighlightChart },
    { question: 'A car travels at 50 km/h. Which equation links distance (d) and time (t)?', options: ['d = t + 50', 'd = t/50', 'd = 50t', 'd = 50 + t'], correct: 2, explanation: 'Distance = Speed × Time, so d = 50t. This is a linear equation — its graph is a straight line.', chart: LinearGraphChart },
    { question: 'Using d = 50t, what is the distance covered in 3 hours?', options: ['53 km', '150 km', '100 km', '17 km'], correct: 1, explanation: 'd = 50 × 3 = 150 km. Substituting t = 3 into the equation gives 150.', chart: LinearGraphChart },
    { question: 'For the perimeter of a square P = 4s, what is P when s = 5 cm?', options: ['9 cm', '16 cm', '20 cm', '25 cm'], correct: 2, explanation: 'P = 4 × 5 = 20 cm. P = 4s is a linear equation — its graph is a straight line through the origin.', chart: LinearGraphChart },
    { question: 'The graph of y = 2x is steeper than the graph of y = x. Why?', options: ['y = 2x has a higher starting value', 'y = x passes through a different origin', 'y = 2x increases at twice the rate — the slope is 2 vs 1', 'y = 2x is not a straight line'], correct: 2, explanation: 'The coefficient of x is the slope. y = 2x has slope 2, y = x has slope 1. Higher slope = steeper line.', chart: LinearGraphChart },
    { question: 'To plot y = x + 2, which three points can you use?', options: ['(0,0), (1,1), (2,2)', '(0,2), (1,3), (2,4)', '(0,1), (1,2), (2,3)', '(2,0), (3,1), (4,2)'], correct: 1, explanation: 'For y = x + 2: x=0 → y=2, x=1 → y=3, x=2 → y=4. Points: (0,2), (1,3), (2,4).', chart: OrderedPairHighlightChart },
    { question: 'In a distance-time linear graph, what does a steeper slope indicate?', options: ['Slower speed', 'Object is moving backwards', 'Faster speed', 'Object has stopped'], correct: 2, explanation: 'Slope in a distance-time graph = Speed. A steeper line means more distance per unit time — faster speed.', chart: LinearGraphChart },
    { question: 'A linear graph of P = 4s (perimeter of square vs side) shows a straight line. What happens to P when s doubles?', options: ['P doubles', 'P is halved', 'P increases by 4', 'P stays the same'], correct: 0, explanation: 'Since P = 4s, if s doubles (say s → 2s), then P → 4(2s) = 2×4s = 2P. P also doubles. This is the nature of direct proportion.' },
];

const linearGraphAssessment = [
    { question: 'Which equation produces a LINEAR graph (straight line)?', options: ['y = x²', 'y = 1/x', 'y = 4x + 1', 'y = x³'], correct: 2, explanation: 'y = 4x + 1 is a linear equation (highest power of x is 1). Its graph is a straight line.' },
    { question: 'A graph of y = 5x passes through the point (2, ?). Find the missing value.', options: ['7', '10', '25', '3'], correct: 1, explanation: 'y = 5 × 2 = 10. The point is (2, 10).' },
    { question: 'Using d = 60t (speed 60 km/h), how long does it take to travel 180 km?', options: ['2 hours', '3 hours', '4 hours', '120 hours'], correct: 1, explanation: '180 = 60t → t = 180 ÷ 60 = 3 hours.' },
    { question: 'On a linear graph of P = 4s, what is the gradient (slope) of the line?', options: ['1', '2', '4', 's'], correct: 2, explanation: 'P = 4s is in the form y = mx. Here m = 4, so the slope (gradient) of the line is 4.' },
    { question: 'Two quantities x and y are in direct proportion if their graph:', options: ['Is a curve', 'Passes through (1,1)', 'Is a straight line through the origin', 'Is a horizontal line'], correct: 2, explanation: 'Direct proportion means y = kx. Its graph is ALWAYS a straight line passing through the origin (0,0).' },
    { question: 'For y = x + 5, when x = 0, what is y?', options: ['0', 'x', '5', '1'], correct: 2, explanation: 'y = 0 + 5 = 5. The line crosses the Y-axis at y = 5 — this is called the y-intercept.' },
    { question: 'Compare y = x and y = 5x on the same graph. Which one has a steeper rise?', options: ['y = x', 'y = 5x', 'Both are equally steep', 'Cannot compare'], correct: 1, explanation: 'y = 5x has 5 times larger slope than y = x. It rises 5 units for every 1 unit increase in x — much steeper.' },
    { question: 'A water tank fills at 10 litres per minute. The linear equation is V = 10t. After 6 minutes, what is V?', options: ['16 litres', '60 litres', '1.67 litres', '10 litres'], correct: 1, explanation: 'V = 10 × 6 = 60 litres.' },
    { question: 'If the graph of y = kx passes through (4, 12), what is k?', options: ['3', '4', '48', '8'], correct: 0, explanation: '12 = k × 4 → k = 12 ÷ 4 = 3. So the equation is y = 3x.' },
    { question: 'A perimeter-side graph for equilateral triangles has equation P = 3s. For the graph of P = 4s (squares), what changes?', options: ['The line starts at a different point', 'The slope increases from 3 to 4 — the line is steeper', 'The line becomes curved', 'P decreases for same value of s'], correct: 1, explanation: 'P = 3s has slope 3; P = 4s has slope 4. The line for squares is STEEPER — it rises faster for the same increase in side length.' },
];

// ─── SKILLS DATA ─────────────────────────────────────────────────────────────
const SKILLS = [
    {
        id: 'linegraph',
        title: 'Line Graphs',
        subtitle: 'Skill 1 · Reading & Drawing',
        icon: '📈',
        color: '#059669',
        desc: 'Read trends, rising/falling lines, and accurately interpret data from line graphs.',
        practice: lineGraphPractice,
        assessment: lineGraphAssessment,
        learn: {
            concept: 'A line graph is the go-to tool for showing how a quantity changes over time. Mastering how to read and draw them is a fundamental data skill you will use throughout school and life.',
            rules: [
                { title: 'Reading a Value', f: 'X-axis → Up → Y-axis', chart: PatientTemperatureChart, imgCaption: 'Patient Temperature Over Time — reading the Y value at a given hour.', d: 'To find the Y-value at a given time: locate the time on the X-axis, move straight UP until you hit the line, then read ACROSS to the Y-axis.', ex: 'Temperature at 3 PM: Find 3 PM on X-axis → go up to line → read temperature (say 38°C) on Y-axis.', tip: 'Always start from the axis label — never guess by eye from the middle of the graph.' },
                { title: 'Rising Line = Increase', f: 'Line ↗ = Increasing value', chart: TrendLinesChart, imgCaption: 'Rising, Falling and Flat trend lines — recognise each at a glance.', d: 'A line that goes UP from left to right shows the quantity is INCREASING over that time period.', ex: 'If a plant height graph rises from 5 cm to 20 cm over 4 weeks, the line goes upward.', tip: 'Steeper rise = faster increase. Gentle rise = slow increase.' },
                { title: 'Falling Line = Decrease', f: 'Line ↘ = Decreasing value', chart: TrendLinesChart, imgCaption: 'A falling line means the quantity is reducing over time.', d: 'A line that goes DOWN from left to right shows the quantity is DECREASING over that time period.', ex: 'If a patient\'s fever drops from 40°C to 37°C overnight, the line falls.', tip: 'Steeper fall = faster decrease. A very steep fall means a rapid drop.' },
                { title: 'Flat Line = No Change', f: 'Horizontal line → = Constant', chart: TrendLinesChart, imgCaption: 'A flat horizontal line means zero change over that time period.', d: 'A perfectly flat horizontal line means the quantity is STAYING THE SAME — no increase or decrease.', ex: 'If a car\'s speed is 60 km/h for 3 hours, the speed-time graph is a horizontal line at 60.', tip: 'Look for flat sections — they represent periods with zero change.' },
                { title: 'Choosing the Scale', f: 'Data range ÷ Number of intervals', d: 'When drawing, choose a scale that fits ALL your data on the grid without crowding. Divide the range of values by the number of available grid lines.', ex: 'Data ranges from 20°C to 44°C (range = 24). With 6 grid lines, use scale of 4°C per division.', tip: 'Always use a uniform scale — each grid box must represent the same amount.' },
            ],
        },
    },
    {
        id: 'lineargraph',
        title: 'Application of Line Graphs',
        subtitle: 'Skill 2 · Linear Graphs & Coordinates',
        icon: '📐',
        color: '#4f46e5',
        desc: 'Plot straight-line graphs from equations. Explore distance-time and perimeter-side relationships.',
        practice: linearGraphPractice,
        assessment: linearGraphAssessment,
        learn: {
            concept: 'A linear graph is a straight-line graph produced by a linear equation like y = 2x or d = 50t. These graphs directly connect algebra to geometry — and are the foundation of coordinate mathematics in Class 9 and 10.',
            rules: [
                { title: 'What Makes a Linear Graph?', f: 'y = mx → Straight line', chart: LinearGraphChart, imgCaption: 'Graph of y = 2x — a straight line through the origin.', d: 'Any equation where y is directly proportional to x (y = mx, or y = mx + c) produces a STRAIGHT LINE graph. The graph never curves.', ex: 'y = 2x gives: (0,0), (1,2), (2,4), (3,6) — plot and join for a straight line through origin.', tip: 'If the highest power of x in the equation is 1, the graph will always be a straight line.' },
                { title: 'Making a Table of Values', f: 'Choose x → Calculate y → Plot', chart: CoordinateGridChart, imgCaption: 'Plotting ordered pair (3, 30) on a coordinate grid.', d: 'To draw the graph of an equation: choose simple values for x (like 0, 1, 2, 3), substitute into the equation to find y, then plot each (x, y) point.', ex: 'y = 3x: x=0 → y=0, x=1 → y=3, x=2 → y=6, x=3 → y=9.', tip: 'Always use at least 3 points to confirm the line is truly straight.' },
                { title: 'Distance-Time Linear Graph', f: 'd = speed × time', chart: LinearGraphChart, imgCaption: 'Distance vs. Time at constant speed — a straight-line graph.', d: 'When speed is constant, distance and time are directly proportional. The graph of distance vs. time is a straight line through the origin. The slope of the line equals the speed.', ex: 'Car at 60 km/h: t=1→d=60, t=2→d=120, t=3→d=180. Straight line, slope = 60.', tip: 'A steeper slope = faster speed. A horizontal line = the object has stopped.' },
                { title: 'Perimeter-of-Square Graph', f: 'P = 4 × side', d: 'The perimeter of a square is 4 × side length. This linear relationship produces a straight-line graph. Doubling the side doubles the perimeter.', ex: 'side=1→P=4, side=2→P=8, side=3→P=12, side=4→P=16. Slope of line = 4.', tip: 'The slope of the line EQUALS the multiplying factor in the equation.' },
                { title: 'Comparing Slopes', f: 'Steeper line = Faster rate of change', d: 'If you plot two linear graphs on the same axes, the steeper one has a larger slope — meaning the quantity changes faster per unit on the X-axis.', ex: 'y = 4x is steeper than y = 2x. For every 1 unit increase in x, y = 4x goes up by 4 while y = 2x goes up by only 2.', tip: 'Comparing slopes visually is quick — always note which line climbs faster when comparing two relationships.' },
            ],
        },
    },
];

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function GraphsSkills() {
    const navigate = useNavigate();
    const [view, setView] = useState('list'); // 'list' | 'practice' | 'assessment' | 'learn'
    const [activeSkill, setActiveSkill] = useState(null);
    const [selectedLearnIdx, setSelectedLearnIdx] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const skill = activeSkill !== null ? SKILLS[activeSkill] : null;

    // ── SKILL DETAIL VIEW ────────────────────────────────────────────────────
    if (view !== 'list' && skill) {
        return (
            <div className="skills-page" style={{ background: '#f8fafc', minHeight: '100vh', padding: '100px 0 60px' }}>
                <nav className="intro-nav">
                    <button className="intro-nav-back" onClick={() => { setView('list'); setSelectedLearnIdx(0); }}>
                        ← Back to Skills
                    </button>
                    <div className="intro-nav-links">
                        <button className="intro-nav-link" onClick={() => navigate('/senior/grade/8/introduction-to-graphs/introduction')}>🌟 Intro</button>
                        <button className="intro-nav-link" onClick={() => navigate('/senior/grade/8/introduction-to-graphs/terminology')}>📖 Terminology</button>
                        <button className="intro-nav-link intro-nav-link--active">🎯 Skills</button>
                    </div>
                </nav>

                <div style={{ padding: '0 24px' }}>
                    {view === 'learn' ? (
                        <div className="grph-lexicon-container" style={{ maxWidth: 1100, margin: '0 auto' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, justifyContent: 'center' }}>
                                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{skill.icon}</div>
                                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.2rem', fontWeight: 900, color: '#0f172a', margin: 0 }}>Learn: {skill.title}</h1>
                            </div>

                            <div className="grph-learn-grid">
                                {/* Sidebar */}
                                <aside className="grph-learn-sidebar">
                                    {skill.learn.rules.map((rule, ri) => (
                                        <button key={ri} onClick={() => setSelectedLearnIdx(ri)}
                                            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12, border: '1px solid', borderColor: selectedLearnIdx === ri ? skill.color : 'rgba(0,0,0,0.05)', background: selectedLearnIdx === ri ? skill.color : '#fff', color: selectedLearnIdx === ri ? '#fff' : '#0f172a', transition: 'all 0.2s', cursor: 'pointer', textAlign: 'left' }}>
                                            <div style={{ width: 24, height: 24, borderRadius: 6, background: selectedLearnIdx === ri ? 'rgba(255,255,255,0.2)' : `${skill.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900, flexShrink: 0 }}>{ri + 1}</div>
                                            <span style={{ fontWeight: 700, fontSize: 14 }}>{rule.title}</span>
                                        </button>
                                    ))}
                                </aside>

                                {/* Detail Window */}
                                <main key={selectedLearnIdx} className="grph-details-window details-window-anim" style={{ border: `2px solid ${skill.color}15` }}>
                                    <div className="grph-learn-header-row">
                                        <div>
                                            <h3 style={{ margin: '0 0 4px', fontSize: 28, fontWeight: 900, color: skill.color }}>{skill.learn.rules[selectedLearnIdx].title}</h3>
                                            <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>RULE {selectedLearnIdx + 1} OF {skill.learn.rules.length}</div>
                                        </div>
                                        <div style={{ fontSize: 32 }}>{skill.icon}</div>
                                    </div>

                                    {/* Formula box */}
                                    <div style={{ background: `${skill.color}05`, padding: 20, borderRadius: 20, border: `2px solid ${skill.color}15`, marginBottom: 20, textAlign: 'center' }}>
                                        <div style={{ fontSize: 30, fontWeight: 800, color: skill.color }}>{skill.learn.rules[selectedLearnIdx].f}</div>
                                    </div>

                                    {/* Chart (if rule has one) */}
                                    {skill.learn.rules[selectedLearnIdx].chart && (
                                        <div style={{ marginBottom: 24 }}>
                                            {React.createElement(skill.learn.rules[selectedLearnIdx].chart)}
                                            {skill.learn.rules[selectedLearnIdx].imgCaption && (
                                                <p style={{ textAlign: 'center', fontSize: 12, color: '#94a3b8', margin: '14px 0 0', fontStyle: 'italic' }}>
                                                    {skill.learn.rules[selectedLearnIdx].imgCaption}
                                                </p>
                                            )}
                                        </div>
                                    )}

                                    <div className="grph-rule-split">
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: '#64748b', marginBottom: 10 }}>Explanation</h4>
                                            <p style={{ fontSize: 16, lineHeight: 1.7, margin: 0, color: '#0f172a' }}>{skill.learn.rules[selectedLearnIdx].d}</p>
                                            <div style={{ marginTop: 24, background: 'rgba(5,150,105,0.05)', padding: 16, borderRadius: 16, border: '1px solid rgba(5,150,105,0.1)' }}>
                                                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#475569' }}>
                                                    <span style={{ fontWeight: 800, color: '#059669' }}>🛡️ Key Tip: </span>
                                                    {skill.learn.rules[selectedLearnIdx].tip}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 style={{ textTransform: 'uppercase', fontSize: 12, letterSpacing: 1, color: skill.color, marginBottom: 10 }}>Practical Example</h4>
                                            <div style={{ background: '#f8fafc', padding: 24, borderRadius: 20, border: '1px solid rgba(0,0,0,0.03)' }}>
                                                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: '#0f172a' }}>{skill.learn.rules[selectedLearnIdx].ex}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grph-learn-footer">
                                        <button className="grph-btn-primary" onClick={() => setView('practice')} style={{ background: skill.color }}>
                                            Ready? Try Practice →
                                        </button>
                                        <button className="grph-btn-secondary" onClick={() => setSelectedLearnIdx((selectedLearnIdx + 1) % skill.learn.rules.length)}>
                                            Next: {skill.learn.rules[(selectedLearnIdx + 1) % skill.learn.rules.length].title}
                                        </button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    ) : (
                        <QuizEngine
                            questions={view === 'practice' ? skill.practice : skill.assessment}
                            title={`${view === 'practice' ? 'Practice' : 'Assessment'}: ${skill.title}`}
                            onBack={() => setView('list')}
                            color={skill.color}
                        />
                    )}
                </div>
            </div>
        );
    }

    // ── SKILLS LIST ──────────────────────────────────────────────────────────
    return (
        <div className="skills-page">
            <nav className="intro-nav">
                <button className="intro-nav-back" onClick={() => navigate('/senior/grade/8/introduction-to-graphs')}>
                    ← Back to Graphs
                </button>
                <div className="intro-nav-links">
                    <button className="intro-nav-link" onClick={() => navigate('/senior/grade/8/introduction-to-graphs/introduction')}>🌟 Introduction</button>
                    <button className="intro-nav-link" onClick={() => navigate('/senior/grade/8/introduction-to-graphs/terminology')}>📖 Terminology</button>
                    <button className="intro-nav-link intro-nav-link--active">🎯 Skills</button>
                </div>
            </nav>

            <div className="grph-lexicon-container" style={{ maxWidth: 1100, margin: '80px auto 40px', padding: '0 24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 32 }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '2.1rem', fontWeight: 900, color: '#0f172a', margin: '0 0 6px' }}>
                        Line Graphs{' '}
                        <span style={{ background: 'linear-gradient(135deg, #059669, #0891b2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Skills</span>
                    </h1>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b', letterSpacing: 0.5 }}>
                        Learn, practice, and master the 2 key skills of NCERT Grade 8 Graphs.
                    </div>
                </div>

                <div className="grph-skills-list">
                    {SKILLS.map((skill, idx) => (
                        <div key={skill.id} className="grph-skill-card">
                            <div className="grph-skill-info">
                                <div className="grph-skill-icon" style={{ background: `${skill.color}15` }}>{skill.icon}</div>
                                <div>
                                    <div style={{ fontSize: 10, fontWeight: 800, color: skill.color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>{skill.subtitle}</div>
                                    <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: '#0f172a' }}>{skill.title}</h3>
                                    <p style={{ margin: 0, fontSize: 12, color: '#64748b' }}>{skill.desc}</p>
                                </div>
                            </div>

                            <div className="grph-skill-actions">
                                <button onClick={() => { setActiveSkill(idx); setView('learn'); }} className="grph-btn-secondary"
                                    style={{ padding: '8px 16px', fontSize: 12, fontWeight: 800, whiteSpace: 'nowrap', border: '1.5px solid rgba(0,0,0,0.1)' }}>
                                    Learn
                                </button>
                                <button onClick={() => { setActiveSkill(idx); setView('practice'); }} className="grph-btn-secondary"
                                    style={{ padding: '8px 16px', fontSize: 12, fontWeight: 800, whiteSpace: 'nowrap' }}>
                                    Practice
                                </button>
                                <button onClick={() => { setActiveSkill(idx); setView('assessment'); }} className="grph-btn-primary"
                                    style={{ padding: '8px 16px', fontSize: 12, fontWeight: 800, whiteSpace: 'nowrap', background: skill.color }}>
                                    Assess
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: 40, textAlign: 'center' }}>
                    <p style={{ fontSize: 13, color: '#64748b', fontWeight: 600 }}>
                        Completed both skills? You're officially a{' '}
                        <span style={{ color: '#059669' }}>Line Graph Pro!</span> 📊
                    </p>
                </div>
            </div>
        </div>
    );
}
