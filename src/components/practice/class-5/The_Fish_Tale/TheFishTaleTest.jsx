import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TheFishTaleTest.module.css';
import { LatexText } from '@/components/LatexText';
import TheFishTaleReportModal from './TheFishTaleReportModal';
import { Clock, CheckCircle2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const TheFishTaleTest = () => {
    const navigate = useNavigate();
    const [current, setCurrent] = useState(0);
    const [showReport, setShowReport] = useState(false);
    const [timeLeft, setTimeLeft] = useState(1500); // 25 minutes for 25 questions
    const [startTime] = useState(Date.now());
    const [isPaletteOpen, setIsPaletteOpen] = useState(true);

    // Helper for Indian Number System Formatting
    const inFormat = (n) => n.toLocaleString('en-IN');

    const generateQuestions = () => {
        const generated = [];
        const TOTAL_QUESTIONS = 25;

        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            const skillType = i % 8; // Cycle through all 8 skills
            let qText, correctAns, opts, sol;

            if (skillType === 0) {
                // 1. Place Value
                let num = Math.floor(Math.random() * 900000) + 100000;
                let digits = num.toString().split('');
                let pos = Math.floor(Math.random() * 6);
                let digit = digits[pos];

                // Ensure the chosen digit is unique in the number
                while (num.toString().indexOf(digit) !== num.toString().lastIndexOf(digit)) {
                    num = Math.floor(Math.random() * 900000) + 100000;
                    digits = num.toString().split('');
                    pos = Math.floor(Math.random() * 6);
                    digit = digits[pos];
                }

                const places = ['Lakhs', 'Ten Thousands', 'Thousands', 'Hundreds', 'Tens', 'Ones'];
                const value = parseInt(digit) * Math.pow(10, 5 - pos);

                qText = `What is the place value of the digit $${digit}$ in $${inFormat(num)}$?`;
                correctAns = `$${inFormat(value)}$`;
                sol = `In $${inFormat(num)}$, the digit $${digit}$ is in the ${places[pos]} place. 
Value = $${digit} \\times ${inFormat(Math.pow(10, 5 - pos))} = ${inFormat(value)}$.`;
                opts = [correctAns, `$${inFormat(value * 10)}$`, `$${inFormat(value / 10)}$`, `$${digit}$`].filter(o => o);
            } else if (skillType === 1) {
                // 2. Estimation (Rounding)
                const num = Math.floor(Math.random() * 9000) + 1000;
                const roundTo = 1000;
                const rounded = Math.round(num / roundTo) * roundTo;

                qText = `Round $${inFormat(num)}$ to the nearest Thousand.`;
                correctAns = `$${inFormat(rounded)}$`;
                sol = `To round to the nearest thousand, look at the hundreds digit. 
If it's 5 or more, round up. Since $${num}$ has $${Math.floor((num % 1000) / 100)}$ in the hundreds place, we round to $${inFormat(rounded)}$.`;
                opts = [correctAns, `$${inFormat(rounded + 1000)}$`, `$${inFormat(rounded - 1000)}$`, `$${inFormat(num - (num % 100))}$`].filter(o => o);
            } else if (skillType === 2) {
                // 3. Reading & Writing
                const num = (Math.floor(Math.random() * 9) + 1) * 100000;
                qText = `How do you write $${inFormat(num)}$ in words according to the Indian system?`;
                const lakh = num / 100000;
                correctAns = `${lakh} Lakh`;
                sol = `In the Indian system, $1,00,000$ is called 1 Lakh. 
So $${inFormat(num)}$ is $${lakh}$ Lakh.`;
                opts = [correctAns, `${lakh} Ten Thousand`, `${lakh} Million`, `${lakh * 10} Thousand`].filter(o => o);
            } else if (skillType === 3) {
                // 4. Comparison
                const n1 = Math.floor(Math.random() * 900000) + 100000;
                const n2 = Math.floor(Math.random() * 900000) + 100000;
                qText = `Compare the numbers: $${inFormat(n1)}$ ____ $${inFormat(n2)}$`;
                correctAns = n1 > n2 ? '$>$' : (n1 < n2 ? '$<$' : '$=$');
                sol = `Comparing the digits from left to right: $${inFormat(n1)}$ is ${n1 > n2 ? 'greater than' : (n1 < n2 ? 'less than' : 'equal to')} $${inFormat(n2)}$.`;
                opts = ['$>$', '$<$', '$=$'];
            } else if (skillType === 4) {
                // 5. Number Sense (Mental Math)
                const base = Math.floor(Math.random() * 80) + 20;
                const multiplier = Math.pow(10, Math.floor(Math.random() * 2) + 2);
                qText = `What is $${base} \\times ${inFormat(multiplier)}$?`;
                const ans = base * multiplier;
                correctAns = `$${inFormat(ans)}$`;
                sol = `When multiplying by $${inFormat(multiplier)}$, simply add $${Math.log10(multiplier)}$ zeros to $${base}$. 
$${base} \\times ${inFormat(multiplier)} = ${inFormat(ans)}$.`;
                opts = [correctAns, `$${inFormat(ans * 10)}$`, `$${inFormat(ans / 10)}$`, `$${inFormat(ans + 100)}$`].filter(o => o);
            } else if (skillType === 5) {
                // 6. Logistics (Speed/Distance)
                const speed = (Math.floor(Math.random() * 6) + 4) * 5; // 20, 25, 30...
                const time = Math.floor(Math.random() * 3) + 2;
                const distance = speed * time;
                qText = `A boat travels at a speed of $${speed}$ km/h. How far will it travel in $${time}$ hours?`;
                correctAns = `$${distance}$ km`;
                sol = `Distance = Speed $\\times$ Time. 
Distance = $${speed} \\times ${time} = ${distance}$ km.`;
                opts = [correctAns, `$${distance + speed}$ km`, `$${distance - speed}$ km`, `$${speed + time}$ km`].filter(o => o);
            } else if (skillType === 6) {
                // 7. Real Life Data (Profit)
                const cp = Math.floor(Math.random() * 100) + 100;
                const sp = cp + Math.floor(Math.random() * 50) + 20;
                const kg = Math.floor(Math.random() * 5) + 5;
                const profit = (sp - cp) * kg;
                qText = `Gracy buys fish for Rs $${cp}$ per kg and sells them for Rs $${sp}$ per kg. How much profit does she earn by selling $${kg}$ kg of fish?`;
                correctAns = `Rs $${inFormat(profit)}$`;
                sol = `Profit per kg = $${sp} - ${cp} = ${sp - cp}$. 
Total Profit = Profit per kg $\\times$ Quantity = $${sp - cp} \\times ${kg} = ${profit}$.`;
                opts = [correctAns, `Rs $${inFormat(profit + 100)}$`, `Rs $${inFormat(profit - 50)}$`, `Rs $${inFormat(sp * kg)}$`].filter(o => o);
            } else {
                // 8. Large Numbers
                qText = `How many zeros are there in $1$ Crore?`;
                correctAns = `$7$`;
                sol = `$1$ Crore is written as $1,00,00,000$. It has $7$ zeros.`;
                opts = [`$7$`, `$6$`, `$8$`, `$5$`];
            }

            opts = [...new Set(opts)];

            // Pad to 4 options unless it's a Comparison question (which has exactly 3: >, <, =)
            if (skillType !== 3) {
                while (opts.length < 4) {
                    opts.push(`$${inFormat(Math.floor(Math.random() * 90000) + 1000)}$`);
                    opts = [...new Set(opts)];
                }
            }

            opts.sort(() => Math.random() - 0.5);

            generated.push({
                question: qText,
                options: opts,
                correct: opts.indexOf(correctAns),
                explanation: sol
            });
        }
        return generated;
    };

    const questions = useMemo(() => generateQuestions(), []);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));

    useEffect(() => {
        if (timeLeft <= 0) { handleSubmit(); return; }
        const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const handleSelect = (qIdx, oIdx) => {
        const newAns = [...answers];
        newAns[qIdx] = oIdx;
        setAnswers(newAns);
    };

    const handleSubmit = () => {
        setShowReport(true);
    };

    const score = answers.reduce((acc, ans, i) => acc + (ans === questions[i].correct ? 1 : 0), 0);
    const completed = answers.filter(a => a !== null).length;

    const q = questions[current];

    return (
        <div className={styles.ft_test_page}>
            <nav className={styles.ft_test_nav}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button onClick={() => navigate('/the-fish-tale')} className={styles.ft_exit_btn}>← Exit</button>
                    <h1 className={styles.ft_test_title}>Chapter Test: The Fish Tale</h1>
                </div>
                <div className={styles.ft_test_timer}>
                    <Clock size={16} /> {formatTime(timeLeft)}
                </div>
            </nav>

            <div className={styles.ft_test_layout}>
                <div className={styles.ft_test_main}>
                    <div className={styles.ft_test_card}>
                        <div className={styles.ft_test_q_header}>
                            <span className={styles.ft_test_q_num}>Question {current + 1} of {questions.length}</span>
                            {answers[current] !== null ? <CheckCircle2 size={18} color="#10b981" /> : <AlertCircle size={18} color="#94a3b8" />}
                        </div>
                        <div className={styles.ft_test_q_text}>
                            <LatexText text={q.question} />
                        </div>
                        <div className={styles.ft_test_options}>
                            {q.options.map((opt, oi) => (
                                <button key={oi} onClick={() => handleSelect(current, oi)}
                                    className={`${styles.ft_test_opt_btn} ${answers[current] === oi ? styles.ft_test_opt_btn_active : ''}`}>
                                    <span className={styles.ft_test_opt_label}>{String.fromCharCode(65 + oi)}</span>
                                    <LatexText text={opt} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
                        <button className={styles.ft_exit_btn}
                            onClick={() => setCurrent(c => Math.max(0, c - 1))}
                            disabled={current === 0}
                            style={{ opacity: current === 0 ? 0.5 : 1 }}>
                            <ChevronLeft size={18} /> Previous
                        </button>
                        {current < questions.length - 1 ? (
                            <button className={styles.ft_submit_btn}
                                style={{ width: 'auto', padding: '12px 32px', background: '#0369a1' }}
                                onClick={() => setCurrent(c => c + 1)}>
                                Next <ChevronRight size={18} />
                            </button>
                        ) : (
                            <button className={styles.ft_submit_btn}
                                style={{ width: 'auto', padding: '12px 32px' }}
                                onClick={handleSubmit}>
                                Submit Test
                            </button>
                        )}
                    </div>
                </div>

                <div className={`${styles.ft_test_sidebar} ${!isPaletteOpen ? styles.ft_sidebar_minimized : ''}`}>
                    <div className={styles.ft_test_summary_card}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <h3 className={styles.ft_summary_title} style={{ margin: 0 }}>Test Progress</h3>
                            <button
                                onClick={() => setIsPaletteOpen(!isPaletteOpen)}
                                className={styles.ft_palette_toggle}
                            >
                                {isPaletteOpen ? 'Hide' : 'Show'} Navigator
                            </button>
                        </div>

                        <div className={styles.ft_palette_content} style={{ display: isPaletteOpen ? 'block' : 'none' }}>
                            <div className={styles.ft_summary_stats}>
                                <div className={styles.ft_stat_box}>
                                    <span className={styles.ft_stat_val}>{questions.length}</span>
                                    <span className={styles.ft_stat_lbl}>Total</span>
                                </div>
                                <div className={styles.ft_stat_box}>
                                    <span className={styles.ft_stat_val} style={{ color: '#0369a1' }}>{completed}</span>
                                    <span className={styles.ft_stat_lbl}>Answered</span>
                                </div>
                            </div>

                            <div className={styles.ft_palette_title}>Question Navigator</div>
                            <div className={styles.ft_q_nav_grid}>
                                {questions.map((_, i) => (
                                    <button key={i} onClick={() => setCurrent(i)}
                                        className={`${styles.ft_q_nav_btn} ${answers[i] !== null ? styles.ft_q_nav_btn_answered : ''}`}
                                        style={{
                                            borderColor: current === i ? '#0369a1' : '#e2e8f0',
                                            borderWidth: current === i ? '2px' : '1px'
                                        }}>
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button className={styles.ft_submit_btn} onClick={handleSubmit}>Finish & Submit</button>
                        </div>
                    </div>
                </div>
            </div>

            {showReport && (
                <TheFishTaleReportModal
                    isOpen={showReport}
                    stats={{
                        correctAnswers: score,
                        totalQuestions: questions.length,
                        timeTaken: formatTime(Math.floor((Date.now() - startTime) / 1000))
                    }}
                    onClose={() => navigate('/the-fish-tale')}
                    onRetry={() => window.location.reload()}
                />
            )}
        </div>
    );
};

export default TheFishTaleTest;
