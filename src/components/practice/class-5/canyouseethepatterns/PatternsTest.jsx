import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Timer, ArrowLeft, Trophy, Sparkles } from 'lucide-react';
import styles from './PatternsTest.module.css';
import { SKILLS } from './Topics/Skills/PatternsSkillsData';
import MathRenderer from '../../../MathRenderer';
import PatternsReportModal from './PatternsReportModal';

export default function PatternsTest() {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [qIndex, setQIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timer, setTimer] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    // Initialize mixed pool test
    useEffect(() => {
        const pool = [];
        SKILLS.forEach(skill => {
            const skillQs = typeof skill.assessment === 'function' ? skill.assessment() : skill.assessment;
            pool.push(...skillQs.slice(0, 5)); // Take 5 from each skill
        });

        // Shuffle the final pool
        const shuffled = [...pool].sort(() => Math.random() - 0.5);
        setQuestions(shuffled.slice(0, 15)); // Final test will have 15 questions
    }, []);

    useEffect(() => {
        const footer = document.querySelector(".main-footer");
        if (footer) footer.style.display = "none";
        return () => {
            if (footer) footer.style.display = "block";
        };
    }, []);

    useEffect(() => {
        if (isFinished) return;
        const interval = setInterval(() => setTimer(t => t + 1), 1000);
        return () => clearInterval(interval);
    }, [isFinished]);

    const formatTime = (s) => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${m}:${sec.toString().padStart(2, '0')}`;
    };

    const handleSelect = (idx) => {
        if (isFinished) return;
        setAnswers(prev => ({
            ...prev,
            [qIndex]: { selected: idx, isCorrect: idx === questions[qIndex].correct }
        }));
    };

    const handleNext = () => {
        if (qIndex + 1 < questions.length) {
            setQIndex(qIndex + 1);
        } else {
            setIsFinished(true);
        }
    };

    const q = questions[qIndex];
    if (!q) return null;

    const stats = {
        correctAnswers: Object.values(answers).filter(a => a.isCorrect).length,
        totalQuestions: questions.length,
        timeTaken: formatTime(timer)
    };

    return (
        <div className={styles.pt_test_page}>
            <div className={`${styles.pt_deco} ${styles.pt_deco_a}`} />
            <div className={`${styles.pt_deco} ${styles.pt_deco_b}`} />
            <div className={`${styles.pt_deco} ${styles.pt_deco_c}`} />

            <div className={styles.pt_test_card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                    <button onClick={() => navigate('/middle/grade/5/canyouseethepatterns')} 
                        style={{ background: 'rgba(79,70,229,0.05)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, color: '#4f46e5', fontWeight: 800, padding: '10px 18px', borderRadius: '12px', fontSize: 13 }}>
                        <ArrowLeft size={16} /> Exit Assessment
                    </button>
                    <div style={{ display: 'flex', gap: 16 }}>
                        <div style={{ fontSize: 14, fontWeight: 900, color: '#4f46e5', display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(79,70,229,0.08)', padding: '8px 16px', borderRadius: '12px' }}>
                            <Timer size={18} /> {formatTime(timer)}
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 800, color: '#64748b', display: 'flex', alignItems: 'center', background: '#f8fafc', padding: '8px 16px', borderRadius: '12px' }}>
                            Q {qIndex + 1} / {questions.length}
                        </div>
                    </div>
                </div>

                <div style={{ height: 8, background: '#f1f5f9', borderRadius: 10, overflow: 'hidden', marginBottom: 40 }}>
                    <div style={{ width: `${((qIndex + 1) / questions.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #4f46e5, #818cf8)', transition: 'width 0.4s' }} />
                </div>

                <div style={{ marginBottom: 48 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 900, color: '#4f46e5', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 12 }}>
                        <Trophy size={14} /> Chapter Final Challenge
                    </div>
                    <div style={{ fontSize: 26, fontWeight: 800, color: '#1e293b', lineHeight: 1.4 }}>
                        <MathRenderer text={q.question} />
                    </div>
                </div>

                {q.visualSequence && (
                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 40, background: '#f8fafc', padding: '32px 40px', borderRadius: 24, border: '1px solid rgba(0,0,0,0.03)' }}>
                        {q.visualSequence.map((icon, idx) => (
                            <React.Fragment key={idx}>
                                <div style={{ width: 72, height: 72, background: '#fff', borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5', boxShadow: '0 8px 20px rgba(79,70,229,0.08)', fontSize: 32 }}>
                                    {icon}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', color: '#cbd5e1' }}><ChevronRight size={28} strokeWidth={3} /></div>
                            </React.Fragment>
                        ))}
                        <div style={{ width: 72, height: 72, background: 'rgba(79,70,229,0.05)', borderRadius: 18, border: '2.5px dashed #4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 900, color: '#4f46e5' }}>?</div>
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                    {q.options.map((opt, idx) => {
                        const isSelected = answers[qIndex]?.selected === idx;
                        const isIcon = React.isValidElement(opt);

                        return (
                            <button key={idx} onClick={() => handleSelect(idx)}
                                style={{
                                    padding: '24px', borderRadius: 20, textAlign: 'center',
                                    border: `3px solid ${isSelected ? '#4f46e5' : '#f1f5f9'}`,
                                    background: isSelected ? 'rgba(79,70,229,0.04)' : '#fff',
                                    fontSize: 18, fontWeight: isSelected ? 800 : 600,
                                    color: isSelected ? '#4f46e5' : '#475569', cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}
                                className={styles.pt_option_hover}>
                                {isIcon ? (
                                    <div style={{ fontSize: 32 }}>{opt}</div>
                                ) : (
                                    <MathRenderer text={opt} />
                                )}
                            </button>
                        );
                    })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 48 }}>
                    <button
                        onClick={handleNext}
                        disabled={answers[qIndex] === undefined}
                        style={{
                            padding: '16px 64px', borderRadius: 100, background: answers[qIndex] !== undefined ? 'linear-gradient(45deg, #4f46e5, #7c3aed)' : '#e2e8f0',
                            color: '#fff', border: 'none', fontWeight: 900, fontSize: 16, cursor: 'pointer',
                            boxShadow: answers[qIndex] !== undefined ? '0 12px 30px rgba(79,70,229,0.3)' : 'none',
                            transition: 'all 0.3s ease',
                            display: 'flex', alignItems: 'center', gap: 12
                        }}
                    >
                        {qIndex + 1 === questions.length ? 'Submit Solutions' : 'Next Step'} 
                        <ChevronRight size={20} strokeWidth={3} />
                    </button>
                </div>
            </div>

            <style>{`
                .${styles.pt_option_hover}:hover {
                    border-color: #cbd5e1;
                    transform: translateY(-4px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.04);
                }
            `}</style>

            <PatternsReportModal
                isOpen={isFinished}
                stats={stats}
                onClose={() => navigate('/middle/grade/5/canyouseethepatterns')}
                onRetry={() => window.location.reload()}
            />
        </div>
    );
}
