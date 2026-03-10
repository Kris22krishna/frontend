import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../data-handling.css';

/* ═══════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════ */

const TERMS = [
    {
        name: 'Data', color: '#059669', icon: '📋',
        def: 'Information collected about people, places, or things!',
        scene: { items: '🧒', groups: 8, label: 'children surveyed', visual: 'list' },
        tryIt: { q: 'You asked 15 kids their favourite colour. How many data points?', answer: 15, hint: 'Each kid gives you one piece of data!' },
        funFact: '📋 Every time someone tells you something — their name, age, favourite food — that\'s DATA!',
        character: '🧑‍🏫'
    },
    {
        name: 'Survey', color: '#7c3aed', icon: '📝',
        def: 'Asking people questions to collect data!',
        scene: { items: '✋', groups: 10, label: 'hands raised', visual: 'hands' },
        tryIt: { q: 'You ask 20 students about lunch. How many surveys?', answer: 20, hint: 'One survey per person!' },
        funFact: '📝 The first known survey was done in ancient Egypt to count people for building pyramids!',
        character: '🤖'
    },
    {
        name: 'Tally Marks', color: '#0284c7', icon: '𝍸',
        def: 'Quick lines to count — every 5th line crosses the group!',
        scene: { tallyCount: 13, label: 'tally marks for 13' },
        tryIt: { q: '𝍸𝍸 ||| = how many?', answer: 13, hint: 'Each bundle of 5 + 3 extra!' },
        funFact: '𝍸 The 5th tally mark is drawn diagonally across the first 4. This makes counting by 5s super fast!',
        character: '🧙‍♂️'
    },
    {
        name: 'Frequency', color: '#dc2626', icon: '🔢',
        def: 'How many times something appears in the data!',
        scene: { items: '🍎', groups: 7, label: 'apples counted', visual: 'count' },
        tryIt: { q: 'In a survey, 9 kids chose Mango. Mango\'s frequency?', answer: 9, hint: 'Frequency = how many chose it!' },
        funFact: '🔢 If 10 kids like Cricket, then Cricket has a FREQUENCY of 10. It\'s just a fancy word for "count"!',
        character: '👷'
    },
    {
        name: 'Table', color: '#d97706', icon: '📊',
        def: 'Rows and columns that organize data neatly!',
        scene: { tableData: [['Fruit', 'Count'], ['🍎 Apple', '7'], ['🍌 Banana', '5'], ['🥭 Mango', '10']] },
        tryIt: { q: 'A table has 4 categories. How many rows for data?', answer: 4, hint: 'One row per category!' },
        funFact: '📊 A table is like a cupboard for data — everything has its own shelf and label!',
        character: '👩‍🍳'
    },
    {
        name: 'Pictograph', color: '#be185d', icon: '🖼️',
        def: 'A chart that uses pictures to show data!',
        scene: { pictoData: [{ label: 'Apple', icon: '🍎', count: 3 }, { label: 'Mango', icon: '🥭', count: 5 }, { label: 'Banana', icon: '🍌', count: 2 }], scale: 1 },
        tryIt: { q: 'Each 🍎 = 2 apples. You see 4 icons. Total?', answer: 8, hint: 'Multiply icons × scale!' },
        funFact: '🖼️ Pictographs were used by ancient civilisations thousands of years before bar graphs were invented!',
        character: '🦉'
    },
    {
        name: 'Scale / Key', color: '#0d9488', icon: '🔑',
        def: 'Tells you what each picture in a pictograph stands for!',
        scene: { keyDemo: true, icon: '⭐', value: 5 },
        tryIt: { q: 'Key: 1 ⭐ = 10 books. 3 stars = ?', answer: 30, hint: '3 × 10 = ?' },
        funFact: '🔑 Without a key, a pictograph is like a locked treasure chest — you can\'t read it!',
        character: '🤡'
    },
    {
        name: 'Category', color: '#6366f1', icon: '🗂️',
        def: 'A group or class that data belongs to!',
        scene: { categories: ['Mango', 'Apple', 'Banana', 'Grapes'] },
        tryIt: { q: 'Fruits: Apple, Mango, Banana, Grapes. How many categories?', answer: 4, hint: 'Count the different groups!' },
        funFact: '🗂️ Categories are like folders on a computer — they sort things into groups so you can find them easily!',
        character: '🥷'
    },
    {
        name: 'Title', color: '#ea580c', icon: '📌',
        def: 'The name of a chart or table that tells what it\'s about!',
        scene: { titleDemo: true },
        tryIt: { q: 'A chart shows favourite sports. Good title: "Favourite ___"', answer: 6, hint: 'Sports has 6 letters!' },
        funFact: '📌 Every chart MUST have a title — without one, nobody knows what the data is about!',
        character: '🧑‍🚀'
    },
    {
        name: 'Most / Least Popular', color: '#f59e0b', icon: '🏆',
        def: 'The item with the highest or lowest count!',
        scene: { comparison: [{ label: 'Cricket', count: 15 }, { label: 'Football', count: 8 }, { label: 'Chess', count: 3 }] },
        tryIt: { q: 'Scores: Math 12, Art 18, Science 6. Most popular?', answer: 18, hint: 'Which has the biggest number?' },
        funFact: '🏆 The "most popular" has the HIGHEST frequency. The "least popular" has the LOWEST. Simple!',
        character: '🧙‍♀️'
    },
];

const FIVE_RULES = [
    {
        num: 1, title: 'Tally in Groups of 5', emoji: '𝍸', color: '#059669',
        rule: 'Draw 4 lines, then cross them with the 5th!',
        steps: [
            { text: 'Draw your first 4 tallies', example: '| | | |' },
            { text: 'The 5th crosses diagonally', example: '|||| → 𝍸' },
            { text: 'Now count by 5s — super fast!', example: '𝍸𝍸 || = 12 ✅' },
        ],
        tryIt: { q: '𝍸𝍸𝍸 |||| = ?', answer: 19 },
    },
    {
        num: 2, title: 'Every Pictograph Needs a Key', emoji: '🔑', color: '#7c3aed',
        rule: 'Always tell what one picture stands for!',
        steps: [
            { text: 'Choose a symbol for your data', example: '🍎 for apples' },
            { text: 'Decide the scale', example: '1 🍎 = 5 apples' },
            { text: 'Write it clearly as a KEY', example: 'Key: 🍎 = 5 apples ✅' },
        ],
        tryIt: { q: 'Key: 1 🚗 = 10 cars. 4 icons = ?', answer: 40 },
    },
    {
        num: 3, title: 'Title Every Chart', emoji: '📌', color: '#0284c7',
        rule: 'No title = no one knows what the chart is about!',
        steps: [
            { text: 'Look at what data you collected', example: 'Favourite fruits of Class 4' },
            { text: 'Write a clear, short title', example: '"Favourite Fruits"' },
            { text: 'Place it at the top!', example: 'FAVOURITE FRUITS ✅' },
        ],
        tryIt: { q: 'A chart shows pets. How many words in "Our Class Pets"?', answer: 3 },
    },
    {
        num: 4, title: 'Categories Must Not Overlap', emoji: '🗂️', color: '#d97706',
        rule: 'Each item should fit in exactly ONE category!',
        steps: [
            { text: 'List clear, separate groups', example: 'Red, Blue, Green, Yellow' },
            { text: 'No item should belong to two groups', example: '❌ "Red-Blue" is not a good category' },
            { text: 'Keep categories simple!', example: '✅ Red | Blue | Green | Yellow' },
        ],
        tryIt: { q: 'Fruits: Apple, Mango, Apple. How many unique categories?', answer: 2 },
    },
    {
        num: 5, title: 'Totals Must Match', emoji: '✅', color: '#059669',
        rule: 'Add up all category counts — it should match total items!',
        steps: [
            { text: 'Count each category', example: 'Mango: 5, Apple: 3, Banana: 2' },
            { text: 'Add them all up', example: '5 + 3 + 2 = 10' },
            { text: 'Check: Does 10 = total surveyed?', example: 'Total students: 10 ✅ Match!' },
        ],
        tryIt: { q: 'Categories: 8 + 6 + 4 + 2 = total?', answer: 20 },
    },
];

const VOCAB_QUIZ = [
    { question: "What do we call information collected about things?", options: ["Answer", "Data", "Question", "Story"], correct: 1, explanation: "Data is information collected about people, places or things!" },
    { question: "What is a pictograph?", options: ["A written story", "A chart using pictures", "A type of math problem", "A multiplication table"], correct: 1, explanation: "A pictograph uses pictures or symbols to represent data!" },
    { question: "𝍸𝍸 || = ?", options: ["7", "10", "12", "22"], correct: 2, explanation: "Each 𝍸 = 5. So 5 + 5 + 2 = 12!" },
    { question: "What does the 'key' in a pictograph tell you?", options: ["The answer to a question", "What each picture means", "The title of the chart", "How to draw pictures"], correct: 1, explanation: "The key (scale) tells what each symbol represents!" },
    { question: "If 12 kids like Mango, what is Mango's frequency?", options: ["1", "6", "12", "24"], correct: 2, explanation: "Frequency = how many times something appears. 12 kids = frequency of 12!" },
    { question: "What should every chart have at the top?", options: ["A picture", "A title", "A sum", "Nothing"], correct: 1, explanation: "Every chart needs a title so people know what the data is about!" },
    { question: "Key: 1 ⭐ = 5 books. 4 stars = ?", options: ["4", "9", "20", "54"], correct: 2, explanation: "4 × 5 = 20 books! Always multiply icons by scale." },
    { question: "Collecting info by asking people questions is called a...", options: ["Quiz", "Survey", "Game", "Tally"], correct: 1, explanation: "A survey is when you ask people questions to collect data!" },
    { question: "Can a remainder be a category in a data table?", options: ["Yes", "No", "Sometimes", "Only in math"], correct: 1, explanation: "Any group can be a category — as long as items fit in exactly one!" },
    { question: "Mango: 15, Apple: 8, Banana: 3. Most popular?", options: ["Banana", "Apple", "Mango", "All equal"], correct: 2, explanation: "Mango has the highest count (15), so it's the most popular!" },
];

/* ═══════════════════════════════════════════════════════════════
   VISUAL SCENE COMPONENTS
   ═══════════════════════════════════════════════════════════════ */

function TermScene({ term }) {
    const [showResult, setShowResult] = useState(false);
    useEffect(() => { setShowResult(false); const t = setTimeout(() => setShowResult(true), 800); return () => clearTimeout(t); }, [term]);
    const scene = term.scene;

    if (scene.tallyCount !== undefined) {
        const bundles = Math.floor(scene.tallyCount / 5);
        const singles = scene.tallyCount % 5;
        return (
            <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 12, flexWrap: 'wrap' }}>
                    {Array.from({ length: bundles }).map((_, i) => (
                        <div key={i} style={{ fontSize: 32, fontWeight: 900, color: term.color, animation: `dhBounceIn 0.4s ${i * 0.15}s both` }}>𝍸</div>
                    ))}
                    {Array.from({ length: singles }).map((_, i) => (
                        <div key={'s' + i} style={{ fontSize: 32, fontWeight: 900, color: term.color + '90', animation: `dhBounceIn 0.4s ${(bundles + i) * 0.15}s both` }}>|</div>
                    ))}
                </div>
                <div style={{ fontSize: 24, fontWeight: 900, color: term.color, fontFamily: 'Outfit, sans-serif', opacity: showResult ? 1 : 0, transition: 'opacity 0.5s' }}>
                    = {scene.tallyCount} {showResult && '✅'}
                </div>
            </div>
        );
    }

    if (scene.tableData) {
        return (
            <div style={{ textAlign: 'center' }}>
                <table style={{ margin: '0 auto', borderCollapse: 'collapse', fontSize: 15, fontWeight: 600 }}>
                    {scene.tableData.map((row, ri) => (
                        <tr key={ri}>
                            {row.map((cell, ci) => (
                                <td key={ci} style={{ padding: '8px 20px', border: `2px solid ${term.color}30`, background: ri === 0 ? `${term.color}15` : '#fff', fontWeight: ri === 0 ? 800 : 600, color: ri === 0 ? term.color : '#334155', animation: `dhBounceIn 0.3s ${(ri * row.length + ci) * 0.08}s both` }}>
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </table>
            </div>
        );
    }

    if (scene.pictoData) {
        return (
            <div style={{ textAlign: 'center' }}>
                {scene.pictoData.map((row, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center', marginBottom: 8, animation: `dhBounceIn 0.4s ${i * 0.15}s both` }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#64748b', width: 60, textAlign: 'right' }}>{row.label}</span>
                        <div style={{ display: 'flex', gap: 4 }}>
                            {Array.from({ length: row.count }).map((_, j) => (
                                <span key={j} style={{ fontSize: 22 }}>{row.icon}</span>
                            ))}
                        </div>
                    </div>
                ))}
                <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 8, fontWeight: 600 }}>Key: 1 icon = {scene.scale} item</div>
            </div>
        );
    }

    if (scene.keyDemo) {
        return (
            <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: 36, animation: 'dhPulse 1.5s infinite' }}>{scene.icon}</span>
                    <span style={{ fontSize: 22, fontWeight: 900, color: term.color }}>=</span>
                    <span style={{ fontSize: 28, fontWeight: 900, color: term.color, fontFamily: 'Outfit, sans-serif' }}>{scene.value}</span>
                </div>
                <div style={{ fontSize: 14, color: '#64748b', fontWeight: 600 }}>This is the KEY or SCALE!</div>
            </div>
        );
    }

    if (scene.categories) {
        return (
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
                {scene.categories.map((cat, i) => (
                    <div key={i} style={{ padding: '10px 20px', background: `${term.color}12`, borderRadius: 14, border: `2px solid ${term.color}30`, fontWeight: 700, fontSize: 15, color: term.color, animation: `dhBounceIn 0.4s ${i * 0.1}s both` }}>
                        {cat}
                    </div>
                ))}
            </div>
        );
    }

    if (scene.titleDemo) {
        return (
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>Without title:</div>
                <div style={{ background: '#fee2e2', padding: 12, borderRadius: 12, marginBottom: 12, border: '2px solid #fca5a5', fontSize: 14, color: '#991b1b' }}>❌ No one knows what this chart shows!</div>
                <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}>With title:</div>
                <div style={{ background: '#dcfce7', padding: 12, borderRadius: 12, border: '2px solid #86efac', fontSize: 16, fontWeight: 800, color: '#166534' }}>✅ "Favourite Fruits of Class 4B"</div>
            </div>
        );
    }

    if (scene.comparison) {
        return (
            <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    {scene.comparison.map((item, i) => {
                        const isMax = item.count === Math.max(...scene.comparison.map(c => c.count));
                        const isMin = item.count === Math.min(...scene.comparison.map(c => c.count));
                        return (
                            <div key={i} style={{ padding: '12px 20px', background: isMax ? '#dcfce7' : isMin ? '#fee2e2' : '#f8fafc', borderRadius: 16, border: `2px solid ${isMax ? '#10b981' : isMin ? '#ef4444' : '#e2e8f0'}`, animation: `dhBounceIn 0.4s ${i * 0.15}s both`, textAlign: 'center' }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>{item.label}</div>
                                <div style={{ fontSize: 28, fontWeight: 900, color: isMax ? '#059669' : isMin ? '#ef4444' : '#475569', fontFamily: 'Outfit, sans-serif' }}>{item.count}</div>
                                {isMax && <div style={{ fontSize: 11, fontWeight: 800, color: '#059669' }}>🏆 MOST</div>}
                                {isMin && <div style={{ fontSize: 11, fontWeight: 800, color: '#ef4444' }}>📉 LEAST</div>}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // Default visual: emoji groups
    const rows = [];
    for (let i = 0; i < Math.min(scene.groups, 12); i++) {
        rows.push(
            <span key={i} style={{ fontSize: 26, animation: `dhBounceIn 0.3s ${i * 0.08}s both` }}>{scene.items}</span>
        );
    }
    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginBottom: 12 }}>{rows}</div>
            <div style={{ fontSize: 14, color: '#64748b' }}>{scene.groups} {scene.label}</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: term.color, fontFamily: 'Outfit, sans-serif', opacity: showResult ? 1 : 0, transition: 'opacity 0.5s' }}>
                = {scene.groups} {showResult && '✅'}
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   TRY-IT INTERACTIVE MINI ACTIVITY
   ═══════════════════════════════════════════════════════════════ */

function TryItActivity({ tryIt, color }) {
    const [userAnswer, setUserAnswer] = useState('');
    const [result, setResult] = useState(null);

    useEffect(() => { setUserAnswer(''); setResult(null); }, [tryIt]);

    const check = () => {
        if (parseInt(userAnswer) === tryIt.answer) setResult('correct');
        else setResult('wrong');
    };

    return (
        <div style={{
            background: `linear-gradient(135deg, ${color}08, ${color}03)`,
            borderRadius: 20, padding: '20px 24px', border: `2px dashed ${color}30`,
            position: 'relative', overflow: 'hidden'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <span style={{ fontSize: 20 }}>🎮</span>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 16, color }}>Try It!</span>
            </div>
            <p style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', margin: '0 0 14px', lineHeight: 1.5 }}>{tryIt.q}</p>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                <input
                    type="number"
                    value={userAnswer}
                    onChange={e => { setUserAnswer(e.target.value); setResult(null); }}
                    onKeyDown={e => e.key === 'Enter' && check()}
                    placeholder="Type answer..."
                    style={{
                        width: 140, padding: '10px 16px', borderRadius: 14, fontSize: 18, fontWeight: 700,
                        border: `2px solid ${result === 'correct' ? '#10b981' : result === 'wrong' ? '#ef4444' : color + '40'}`,
                        background: result === 'correct' ? '#f0fdf4' : result === 'wrong' ? '#fef2f2' : '#fff',
                        outline: 'none', fontFamily: 'Outfit, sans-serif', color: '#0f172a', transition: 'all 0.2s'
                    }}
                />
                <button onClick={check} disabled={!userAnswer}
                    style={{
                        padding: '10px 22px', borderRadius: 14, border: 'none',
                        background: userAnswer ? color : '#e2e8f0', color: userAnswer ? '#fff' : '#94a3b8',
                        fontWeight: 800, fontSize: 15, cursor: userAnswer ? 'pointer' : 'default',
                        fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s',
                    }}
                >Check ✓</button>
                {result === 'correct' && <span style={{ fontSize: 28, animation: 'dhBounceIn 0.4s both' }}>🎉</span>}
                {result === 'wrong' && <span style={{ fontSize: 28, animation: 'dhShake 0.5s' }}>🤔</span>}
            </div>
            {result === 'wrong' && (
                <div style={{ marginTop: 10, fontSize: 14, color: '#f59e0b', fontWeight: 600, animation: 'dhBounceIn 0.3s both' }}>
                    💡 Hint: {tryIt.hint}
                </div>
            )}
            {result === 'correct' && (
                <div style={{ marginTop: 10, fontSize: 15, color: '#059669', fontWeight: 700, animation: 'dhBounceIn 0.3s both' }}>
                    ✅ Awesome! The answer is {tryIt.answer}!
                </div>
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   RULE STEP-BY-STEP VISUAL
   ═══════════════════════════════════════════════════════════════ */

function RuleSteps({ rule }) {
    const [activeStep, setActiveStep] = useState(0);
    const [ruleAnswer, setRuleAnswer] = useState('');
    const [ruleResult, setRuleResult] = useState(null);

    useEffect(() => { setActiveStep(0); setRuleAnswer(''); setRuleResult(null); }, [rule]);

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                {rule.steps.map((s, i) => (
                    <div key={i} onClick={() => setActiveStep(i)}
                        style={{
                            display: 'flex', gap: 14, alignItems: 'center', padding: '14px 18px',
                            borderRadius: 16, cursor: 'pointer', transition: 'all 0.3s',
                            background: activeStep === i ? `${rule.color}10` : '#f8fafc',
                            border: `2px solid ${activeStep === i ? rule.color : 'transparent'}`,
                            transform: activeStep === i ? 'scale(1.02)' : 'scale(1)',
                            animation: `dhBounceIn 0.4s ${i * 0.15}s both`
                        }}
                    >
                        <div style={{
                            width: 36, height: 36, borderRadius: 10,
                            background: activeStep >= i ? rule.color : '#e2e8f0',
                            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 16, fontWeight: 900, flexShrink: 0, transition: 'all 0.3s'
                        }}>
                            {activeStep > i ? '✓' : i + 1}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 2 }}>{s.text}</div>
                            <div style={{
                                fontSize: 20, fontWeight: 900, fontFamily: 'JetBrains Mono, monospace',
                                color: activeStep === i ? rule.color : '#94a3b8', transition: 'color 0.3s'
                            }}>
                                {s.example}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{
                background: `linear-gradient(135deg, ${rule.color}08, ${rule.color}03)`,
                borderRadius: 16, padding: '16px 20px', border: `2px dashed ${rule.color}30`
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                    <span style={{ fontSize: 18 }}>🧪</span>
                    <span style={{ fontWeight: 800, fontSize: 14, color: rule.color }}>Quick Check!</span>
                </div>
                <p style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', margin: '0 0 10px' }}>{rule.tryIt.q}</p>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input type="number" value={ruleAnswer}
                        onChange={e => { setRuleAnswer(e.target.value); setRuleResult(null); }}
                        onKeyDown={e => e.key === 'Enter' && setRuleResult(parseInt(ruleAnswer) === rule.tryIt.answer ? 'correct' : 'wrong')}
                        placeholder="?" style={{
                            width: 100, padding: '8px 14px', borderRadius: 12, fontSize: 18, fontWeight: 700,
                            border: `2px solid ${ruleResult === 'correct' ? '#10b981' : ruleResult === 'wrong' ? '#ef4444' : '#e2e8f0'}`,
                            background: ruleResult === 'correct' ? '#f0fdf4' : '#fff',
                            outline: 'none', fontFamily: 'Outfit, sans-serif'
                        }}
                    />
                    <button onClick={() => setRuleResult(parseInt(ruleAnswer) === rule.tryIt.answer ? 'correct' : 'wrong')}
                        style={{
                            padding: '8px 18px', borderRadius: 12, border: 'none',
                            background: ruleAnswer ? rule.color : '#e2e8f0', color: ruleAnswer ? '#fff' : '#94a3b8',
                            fontWeight: 800, cursor: ruleAnswer ? 'pointer' : 'default', fontSize: 14
                        }}
                    >Go!</button>
                    {ruleResult === 'correct' && <span style={{ fontSize: 24, animation: 'dhBounceIn 0.3s both' }}>🎉</span>}
                    {ruleResult === 'wrong' && <span style={{ fontSize: 24, animation: 'dhShake 0.5s' }}>❌</span>}
                </div>
            </div>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export default function DataHandlingTerminologyClass4() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('terms');
    const [selectedIdx, setSelectedIdx] = useState(0);
    const [selectedRuleIdx, setSelectedRuleIdx] = useState(0);

    // Quiz state
    const [quizIdx, setQuizIdx] = useState(0);
    const [quizSelected, setQuizSelected] = useState(null);
    const [quizAnswered, setQuizAnswered] = useState(false);
    const [quizTotalScore, setQuizTotalScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [streak, setStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);

    const activeTerm = TERMS[selectedIdx];
    const activeRule = FIVE_RULES[selectedRuleIdx];
    const activeQuiz = VOCAB_QUIZ[quizIdx];

    const resetQuiz = () => {
        setQuizIdx(0); setQuizSelected(null); setQuizAnswered(false);
        setQuizTotalScore(0); setQuizFinished(false); setStreak(0); setBestStreak(0);
    };

    const handleQuizSelect = (optIdx) => {
        if (quizAnswered) return;
        setQuizSelected(optIdx);
        setQuizAnswered(true);
        const isCorrect = optIdx === activeQuiz.correct;
        if (isCorrect) {
            setQuizTotalScore(s => s + 1);
            setStreak(s => { const newS = s + 1; if (newS > bestStreak) setBestStreak(newS); return newS; });
        } else {
            setStreak(0);
        }
    };

    const nextQuiz = () => {
        if (quizIdx + 1 < VOCAB_QUIZ.length) {
            setQuizIdx(i => i + 1); setQuizSelected(null); setQuizAnswered(false);
        } else {
            setQuizFinished(true);
        }
    };

    return (
        <div className="dh-terminology-page">
            <style>{`
                @keyframes dhBounceIn { from { opacity: 0; transform: translateY(16px) scale(0.96); } to { opacity: 1; transform: translateY(0) scale(1); } }
                @keyframes dhFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
                @keyframes dhPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.15); } }
                @keyframes dhShake { 0%,100% { transform: translateX(0); } 20%,60% { transform: translateX(-6px); } 40%,80% { transform: translateX(6px); } }

                .dh-tab-pill { padding: 12px 24px; border-radius: 50px; border: 2px solid #f1f5f9; background: #fff; color: #64748b;
                    font-weight: 700; cursor: pointer; transition: all 0.25s; font-family: 'Outfit', sans-serif; font-size: 15px;
                    display: flex; align-items: center; gap: 8px; }
                .dh-tab-pill:hover { border-color: #059669; color: #059669; transform: translateY(-2px); }
                .dh-tab-pill.active { background: linear-gradient(135deg, #059669, #0d9488); color: white; border-color: transparent;
                    box-shadow: 0 4px 14px rgba(5, 150, 105, 0.35); transform: translateY(-2px); }

                .dh-term-btn2 { display: flex; align-items: center; gap: 12px; padding: 10px 14px; border-radius: 14px;
                    border: 2px solid transparent; cursor: pointer; transition: all 0.25s; text-align: left;
                    font-family: 'Outfit', sans-serif; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.03); }
                .dh-term-btn2:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.08); }

                @media (max-width: 900px) { .dh-lex-grid { grid-template-columns: 1fr !important; } .dh-sidebar { max-width: 600px; margin: 0 auto 16px; } }
            `}</style>

            <nav className="dh-nav">
                <button className="dh-nav-back" onClick={() => navigate('/junior/grade/4/data-handling')}>← Back to Data Handling</button>
                <div className="dh-nav-links">
                    <button className="dh-nav-link" onClick={() => navigate('/data-handling/introduction')}>🌟 Introduction</button>
                    <button className="dh-nav-link dh-nav-link--active">📖 Terminology</button>
                    <button className="dh-nav-link" onClick={() => navigate('/data-handling/skills')}>🎯 Skills</button>
                </div>
            </nav>

            <div style={{ maxWidth: 1100, margin: '20px auto', padding: '0 24px' }}>
                {/* Tab switcher */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
                    <button className={`dh-tab-pill ${activeTab === 'terms' ? 'active' : ''}`} onClick={() => setActiveTab('terms')}>📚 Terminology</button>
                    <button className={`dh-tab-pill ${activeTab === 'rules' ? 'active' : ''}`} onClick={() => setActiveTab('rules')}>📏 5 Golden Rules</button>
                    <button className={`dh-tab-pill ${activeTab === 'quiz' ? 'active' : ''}`} onClick={() => setActiveTab('quiz')}>🧪 Quiz Battle</button>
                </div>

                {/* ────── TERMS TAB ────── */}
                {activeTab === 'terms' && (
                    <div className="dh-lex-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) 1fr', gap: 16, alignItems: 'start' }}>
                        <aside className="dh-sidebar" style={{ background: '#fff', padding: 14, borderRadius: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                            {TERMS.map((term, i) => {
                                const isActive = selectedIdx === i;
                                return (
                                    <button key={i} className="dh-term-btn2" onClick={() => setSelectedIdx(i)}
                                        style={{
                                            background: isActive ? `linear-gradient(135deg, ${term.color}, ${term.color}cc)` : `${term.color}06`,
                                            borderColor: isActive ? term.color : `${term.color}20`,
                                            color: isActive ? '#fff' : '#0f172a',
                                            transform: isActive ? 'scale(1.03)' : undefined,
                                            boxShadow: isActive ? `0 6px 20px ${term.color}30` : undefined,
                                        }}
                                    >
                                        <span style={{ fontSize: 22, filter: isActive ? 'brightness(1.3)' : 'none' }}>{term.icon}</span>
                                        <span style={{ fontWeight: 800, fontSize: 13, lineHeight: 1.2 }}>{term.name}</span>
                                    </button>
                                );
                            })}
                        </aside>

                        <main className="dh-detail-anim" key={selectedIdx} style={{ background: '#fff', borderRadius: 24, padding: 28, boxShadow: '0 8px 30px rgba(0,0,0,0.04)', minHeight: 500, animation: 'dhBounceIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
                                <div style={{ width: 56, height: 56, borderRadius: 16, background: `${activeTerm.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>{activeTerm.icon}</div>
                                <div>
                                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, color: activeTerm.color, margin: 0 }}>{activeTerm.name}</h2>
                                    <p style={{ margin: 0, fontSize: 16, color: '#475569', fontWeight: 600 }}>{activeTerm.def}</p>
                                </div>
                            </div>

                            <div style={{ background: '#fafafa', borderRadius: 20, padding: '20px 16px', margin: '16px 0', border: '1px solid #f1f5f9' }}>
                                <div style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1.5, color: activeTerm.color, marginBottom: 12, textAlign: 'center' }}>
                                    👀 Watch It Happen!
                                </div>
                                <TermScene term={activeTerm} />
                            </div>

                            <div style={{ margin: '16px 0' }}>
                                <TryItActivity tryIt={activeTerm.tryIt} color={activeTerm.color} />
                            </div>

                            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', margin: '16px 0' }}>
                                <div style={{ fontSize: 40, flexShrink: 0, animation: 'dhFloat 3s infinite ease-in-out' }}>{activeTerm.character}</div>
                                <div style={{
                                    background: '#f0fdf4', padding: '14px 20px', borderRadius: '4px 18px 18px 18px',
                                    border: '1px solid #dcfce7', flex: 1
                                }}>
                                    <div style={{ fontSize: 15, color: '#065f46', fontWeight: 700, lineHeight: 1.6 }}>
                                        {activeTerm.funFact}
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                )}

                {/* ────── RULES TAB ────── */}
                {activeTab === 'rules' && (
                    <div className="dh-lex-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 340px) 1fr', gap: 16, alignItems: 'start' }}>
                        <aside className="dh-sidebar" style={{ background: '#fff', padding: 14, borderRadius: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {FIVE_RULES.map((rule, i) => {
                                const isActive = selectedRuleIdx === i;
                                return (
                                    <button key={i} className="dh-term-btn2" onClick={() => setSelectedRuleIdx(i)}
                                        style={{
                                            background: isActive ? `linear-gradient(135deg, ${rule.color}, ${rule.color}cc)` : `${rule.color}06`,
                                            borderColor: isActive ? rule.color : `${rule.color}15`,
                                            color: isActive ? '#fff' : '#0f172a', padding: '14px 18px',
                                        }}
                                    >
                                        <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? 'rgba(255,255,255,0.25)' : `${rule.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 900, color: isActive ? '#fff' : rule.color }}>{rule.emoji}</div>
                                        <div>
                                            <div style={{ fontWeight: 800, fontSize: 15, lineHeight: 1 }}>Rule {rule.num}</div>
                                            <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.8, marginTop: 3 }}>{rule.title}</div>
                                        </div>
                                    </button>
                                );
                            })}
                        </aside>

                        <main key={selectedRuleIdx} style={{ background: '#fff', borderRadius: 24, padding: 28, boxShadow: '0 8px 30px rgba(0,0,0,0.04)', minHeight: 400, animation: 'dhBounceIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                <div style={{ fontSize: 36 }}>{activeRule.emoji}</div>
                                <div>
                                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 26, fontWeight: 900, color: activeRule.color, margin: 0 }}>Rule {activeRule.num}: {activeRule.title}</h2>
                                    <p style={{ margin: '4px 0 0', fontSize: 17, fontWeight: 700, color: '#475569' }}>{activeRule.rule}</p>
                                </div>
                            </div>
                            <RuleSteps rule={activeRule} />
                        </main>
                    </div>
                )}

                {/* ────── QUIZ TAB ────── */}
                {activeTab === 'quiz' && (
                    <div style={{ maxWidth: 700, margin: '0 auto', background: '#fff', padding: 32, borderRadius: 24, boxShadow: '0 8px 30px rgba(0,0,0,0.04)', animation: 'dhBounceIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
                        {!quizFinished ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                                    <div>
                                        <div style={{ fontSize: 12, fontWeight: 800, color: '#059669', textTransform: 'uppercase', letterSpacing: 1 }}>Question {quizIdx + 1} of 10</div>
                                        <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 22, fontWeight: 800, color: '#0f172a', margin: 0 }}>Quiz Battle ⚔️</h3>
                                    </div>
                                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                                        {streak >= 2 && (
                                            <div style={{ background: '#dcfce7', padding: '6px 14px', borderRadius: 50, fontSize: 14, fontWeight: 800, color: '#065f46', animation: 'dhBounceIn 0.3s both' }}>
                                                🔥 {streak} streak!
                                            </div>
                                        )}
                                        <div style={{ width: 56, height: 56, borderRadius: '50%', border: '4px solid #f1f5f9', borderTopColor: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 900, color: '#059669' }}>
                                            {quizIdx + 1}<span style={{ fontSize: 11, color: '#94a3b8' }}>/10</span>
                                        </div>
                                    </div>
                                </div>

                                <div style={{ height: 8, background: '#f1f5f9', borderRadius: 50, marginBottom: 24, overflow: 'hidden' }}>
                                    <div style={{ height: '100%', width: `${((quizIdx + 1) / 10) * 100}%`, background: 'linear-gradient(90deg, #059669, #0d9488)', borderRadius: 50, transition: 'width 0.4s ease' }} />
                                </div>

                                <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', lineHeight: 1.5, marginBottom: 24 }}>{activeQuiz.question}</div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
                                    {activeQuiz.options.map((opt, oi) => {
                                        let bg = '#fff', bdr = '#e2e8f0', txt = '#0f172a';
                                        if (quizAnswered) {
                                            if (oi === activeQuiz.correct) { bg = '#f0fdf4'; bdr = '#10b981'; txt = '#059669'; }
                                            else if (oi === quizSelected) { bg = '#fef2f2'; bdr = '#ef4444'; txt = '#dc2626'; }
                                        }
                                        return (
                                            <button key={oi} onClick={() => handleQuizSelect(oi)} disabled={quizAnswered}
                                                style={{
                                                    padding: '14px 20px', borderRadius: 16, border: `3px solid ${bdr}`, background: bg,
                                                    color: txt, fontWeight: 700, fontSize: 16, cursor: quizAnswered ? 'default' : 'pointer',
                                                    transition: 'all 0.2s', textAlign: 'left', position: 'relative'
                                                }}
                                            >
                                                {opt}
                                                {quizAnswered && oi === activeQuiz.correct && <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 20 }}>✅</span>}
                                                {quizAnswered && oi === quizSelected && oi !== activeQuiz.correct && <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 20 }}>❌</span>}
                                            </button>
                                        );
                                    })}
                                </div>
                                {quizAnswered && (
                                    <div style={{
                                        background: quizSelected === activeQuiz.correct ? 'rgba(5,150,105,0.08)' : 'rgba(239,68,68,0.06)',
                                        padding: 16, borderRadius: 16, marginBottom: 20,
                                        border: `1px solid ${quizSelected === activeQuiz.correct ? '#bbf7d0' : '#fecaca'}`,
                                        animation: 'dhBounceIn 0.3s both'
                                    }}>
                                        <div style={{ fontSize: 22, marginBottom: 6 }}>
                                            {quizSelected === activeQuiz.correct ? '🎉 Correct!' : '💡 Let\'s learn!'}
                                        </div>
                                        <p style={{ margin: 0, fontSize: 14, color: '#475569', lineHeight: 1.6 }}>{activeQuiz.explanation}</p>
                                    </div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <button onClick={nextQuiz} disabled={!quizAnswered}
                                        style={{
                                            padding: '12px 36px', borderRadius: 100, border: 'none',
                                            background: quizAnswered ? 'linear-gradient(135deg, #059669, #0d9488)' : '#f1f5f9',
                                            color: quizAnswered ? '#fff' : '#94a3b8', fontWeight: 800, fontSize: 16,
                                            cursor: quizAnswered ? 'pointer' : 'default', fontFamily: 'Outfit, sans-serif',
                                            boxShadow: quizAnswered ? '0 4px 14px rgba(5,150,105,0.4)' : 'none',
                                            transition: 'all 0.2s'
                                        }}
                                    >{quizIdx + 1 === 10 ? '🏆 Finish!' : 'Next →'}</button>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                <div style={{ fontSize: 72, marginBottom: 12, animation: 'dhBounceIn 0.5s both' }}>
                                    {quizTotalScore >= 9 ? '🏆' : quizTotalScore >= 7 ? '🌟' : quizTotalScore >= 5 ? '👏' : '💪'}
                                </div>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontSize: 32, fontWeight: 900, margin: '0 0 8px' }}>Quiz Complete!</h2>
                                <p style={{ color: '#64748b', fontSize: 18, margin: '0 0 8px' }}>Score: <span style={{ color: '#059669', fontWeight: 900 }}>{quizTotalScore}/10</span></p>
                                {bestStreak >= 2 && <p style={{ color: '#f59e0b', fontWeight: 800, margin: '0 0 24px' }}>🔥 Best streak: {bestStreak} in a row!</p>}
                                <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                                    <button onClick={resetQuiz} style={{ padding: '12px 28px', background: 'linear-gradient(135deg, #059669, #0d9488)', color: '#fff', borderRadius: 100, border: 'none', fontWeight: 800, cursor: 'pointer', fontSize: 15, fontFamily: 'Outfit, sans-serif' }}>Play Again 🔄</button>
                                    <button onClick={() => navigate('/data-handling/skills')} style={{ padding: '12px 28px', background: '#f1f5f9', color: '#475569', borderRadius: 100, border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>Skills 🎯</button>
                                </div>

                                <div style={{ marginTop: 24 }}>
                                    <button onClick={() => navigate('/data-handling/skills')} style={{ padding: '16px 40px', fontSize: 18, background: 'linear-gradient(135deg, #059669, #0d9488)', color: '#fff', boxShadow: '0 4px 14px rgba(5,150,105,0.4)', borderRadius: 50, border: 'none', fontWeight: 800, cursor: 'pointer', fontFamily: 'Outfit, sans-serif', transition: 'all 0.2s' }}>
                                        Continue to Skills →
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
