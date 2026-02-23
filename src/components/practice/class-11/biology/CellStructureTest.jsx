import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '../../../../services/api';
import { LatexText } from '../../../LatexText';
import ExplanationModal from '../../../ExplanationModal';
import '../../../../pages/juniors/JuniorPracticeSession.css';

const SKILL_ID = 11101;
const SKILL_NAME = 'Biology — Cell: Structure and Functions';

const CellStructureTest = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [qIndex, setQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [showExplanationModal, setShowExplanationModal] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [sessionId, setSessionId] = useState(null);
    const questionStartTime = useRef(Date.now());
    const accumulatedTime = useRef(0);
    const isTabActive = useRef(true);
    const [answers, setAnswers] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const CORRECT_MSGS = ['✨ Amazing! ✨', '🌟 Brilliant! 🌟', '🎉 Correct! 🎉', '🚀 Super! 🚀', '💎 Spot on! 💎'];

    useEffect(() => {
        const shuffle = arr => { const u = [...new Set(arr)]; let f = 1; while (u.length < 4) { const c = `Option ${String.fromCharCode(64 + f)}`; if (!u.includes(c)) u.push(c); f++; } return u.sort(() => Math.random() - 0.5); };
        const qs = [];

        // SECTION A: CELL THEORY & BASIC ORGANIZATION

        // Q1
        qs.push({
            text: 'Which statement is NOT a part of the modern cell theory?',
            options: shuffle(['All cells have identical structure and function', 'All living organisms are composed of cells', 'Cells arise from pre-existing cells', 'Cells are the basic unit of life']),
            correctAnswer: 'All cells have identical structure and function',
            solution: 'The modern cell theory states that (1) all living organisms are composed of cells, (2) cells arise from pre-existing cells, and (3) cells are the basic unit of life. Cells do NOT all have identical structure and function — they are highly diverse.',
            difficulty_level: 'Easy'
        });

        // Q2
        qs.push({
            text: 'Which discovery directly contradicted the theory of spontaneous generation?',
            options: shuffle(["Virchow's principle", "Hooke's observation of cork cells", "Leeuwenhoek's living cells", "Schleiden's proposal"]),
            correctAnswer: "Virchow's principle",
            solution: 'Rudolf Virchow proposed "Omnis cellula-e cellula" — all cells arise from pre-existing cells. This directly contradicted spontaneous generation, which claimed life could arise from non-living matter.',
            difficulty_level: 'Easy'
        });

        // SECTION B: CELL ENVELOPE & TRANSPORT

        // Q3
        qs.push({
            text: 'The fluid mosaic model of plasma membrane primarily explains:',
            options: shuffle(['Selective permeability', 'Membrane rigidity', 'Active transport only', 'Cell wall formation']),
            correctAnswer: 'Selective permeability',
            solution: 'The fluid mosaic model (Singer & Nicolson, 1972) describes the plasma membrane as a dynamic structure with a lipid bilayer and embedded proteins, explaining its selective permeability.',
            difficulty_level: 'Easy'
        });

        // Q4
        qs.push({
            text: 'Which membrane transport does not require ATP?',
            options: shuffle(['Facilitated diffusion', 'Endocytosis', 'Active transport', 'Ion pumping']),
            correctAnswer: 'Facilitated diffusion',
            solution: 'Facilitated diffusion is a passive transport mechanism where molecules cross the membrane through channel or carrier proteins along the concentration gradient, without requiring ATP.',
            difficulty_level: 'Easy'
        });

        // Q5
        qs.push({
            text: 'The middle lamella of plant cell wall is rich in:',
            options: shuffle(['Pectin', 'Cellulose', 'Hemicellulose', 'Lignin']),
            correctAnswer: 'Pectin',
            solution: 'The middle lamella is a layer rich in calcium pectate (pectin) that cements adjacent plant cells together. Cellulose is found in the primary and secondary walls.',
            difficulty_level: 'Easy'
        });

        // SECTION C: CYTOPLASM & ORGANELLES

        // Q6
        qs.push({
            text: 'Which organelle is correctly matched with its function?',
            options: shuffle(['Golgi apparatus – protein glycosylation', 'Ribosome – lipid synthesis', 'Lysosome – ATP synthesis', 'SER – photosynthesis']),
            correctAnswer: 'Golgi apparatus – protein glycosylation',
            solution: 'The Golgi apparatus modifies proteins by adding sugar moieties (glycosylation), packaging, and sorting them. Ribosomes synthesise proteins (not lipids), lysosomes digest materials, and SER synthesises lipids.',
            difficulty_level: 'Medium'
        });

        // Q7
        qs.push({
            text: 'Which feature is common to mitochondria and chloroplasts?',
            options: shuffle(['Circular DNA', 'Single membrane', 'Presence of centrioles', 'Absence of ribosomes']),
            correctAnswer: 'Circular DNA',
            solution: 'Both mitochondria and chloroplasts are double-membrane organelles with their own circular DNA and 70S ribosomes, supporting the endosymbiotic theory of their origin.',
            difficulty_level: 'Medium'
        });

        // Q8
        qs.push({
            text: 'Cristae in mitochondria increase:',
            options: shuffle(['Surface area for respiration', 'Volume of matrix', 'Number of ribosomes', 'DNA content']),
            correctAnswer: 'Surface area for respiration',
            solution: 'Cristae are folds of the inner mitochondrial membrane that increase the surface area available for oxidative phosphorylation and the electron transport chain.',
            difficulty_level: 'Easy'
        });

        // Q9
        qs.push({
            text: 'Which statement about lysosomes is correct?',
            options: shuffle(['They contain hydrolytic enzymes', 'They arise from SER', 'They are absent in plant cells', 'They synthesize proteins']),
            correctAnswer: 'They contain hydrolytic enzymes',
            solution: 'Lysosomes are membrane-bound organelles containing hydrolytic (digestive) enzymes. They arise from the Golgi apparatus (not SER) and are present in both animal and plant cells.',
            difficulty_level: 'Easy'
        });

        // Q10
        qs.push({
            text: 'Smooth endoplasmic reticulum is directly involved in:',
            options: shuffle(['Lipid synthesis', 'Protein synthesis', 'Ribosome assembly', 'Photosynthesis']),
            correctAnswer: 'Lipid synthesis',
            solution: 'The smooth endoplasmic reticulum (SER) is involved in lipid and steroid synthesis, detoxification, and calcium storage. Protein synthesis occurs on the rough ER.',
            difficulty_level: 'Easy'
        });

        // SECTION D: NUCLEUS & CHROMATIN

        // Q11
        qs.push({
            text: 'The nucleolus is primarily associated with:',
            options: shuffle(['Ribosomal RNA synthesis', 'DNA replication', 'mRNA translation', 'Spindle formation']),
            correctAnswer: 'Ribosomal RNA synthesis',
            solution: 'The nucleolus is a dense, non-membrane-bound structure within the nucleus where ribosomal RNA (rRNA) is synthesised and ribosomal subunits are assembled.',
            difficulty_level: 'Easy'
        });

        // Q12
        qs.push({
            text: 'Euchromatin differs from heterochromatin by being:',
            options: shuffle(['Lightly stained and transcriptionally active', 'More condensed', 'Genetically inactive', 'Located near nuclear membrane']),
            correctAnswer: 'Lightly stained and transcriptionally active',
            solution: 'Euchromatin is loosely packed, lightly stained, and transcriptionally active. Heterochromatin is densely packed, darkly stained, and generally inactive.',
            difficulty_level: 'Medium'
        });

        // SECTION E: CYTOSKELETON & CELL DIVISION

        // Q13
        qs.push({
            text: 'Microtubules are directly involved in:',
            options: shuffle(['Spindle fibre formation', 'Muscle contraction', 'Cell membrane fluidity', 'Glycolysis']),
            correctAnswer: 'Spindle fibre formation',
            solution: 'Microtubules are key components of the cytoskeleton made of tubulin protein. They form the spindle fibres during cell division, which pull chromosomes apart.',
            difficulty_level: 'Medium'
        });

        // Q14
        qs.push({
            text: 'Centrioles are absent in:',
            options: shuffle(['Higher plant cells', 'Animal cells', 'Algal cells', 'Protozoan cells']),
            correctAnswer: 'Higher plant cells',
            solution: 'Centrioles are present in animal cells, most algae, and protozoans. Higher plant cells lack centrioles and use other mechanisms for spindle formation during cell division.',
            difficulty_level: 'Easy'
        });

        // SECTION F: CELL TYPES & SPECIAL FEATURES

        // Q15
        qs.push({
            text: 'Which cell type lacks a well-defined nucleus?',
            options: shuffle(['Bacterial cell', 'Amoeba', 'Euglena', 'Paramecium']),
            correctAnswer: 'Bacterial cell',
            solution: 'Bacterial cells are prokaryotic — they lack a membrane-bound nucleus. Their genetic material (nucleoid) is not enclosed by a nuclear envelope. Amoeba, Euglena, and Paramecium are eukaryotes with well-defined nuclei.',
            difficulty_level: 'Easy'
        });

        // Q16
        qs.push({
            text: 'Mesosomes in prokaryotes are associated with:',
            options: shuffle(['Respiration and DNA replication', 'Photosynthesis', 'Protein synthesis', 'Cell wall secretion']),
            correctAnswer: 'Respiration and DNA replication',
            solution: 'Mesosomes are infoldings of the plasma membrane in prokaryotes. They help in cellular respiration (like mitochondria in eukaryotes), DNA replication, and cell wall formation during division.',
            difficulty_level: 'Medium'
        });

        // SECTION G: FUNCTIONAL INTEGRATION (NEET FAVOURITES)

        // Q17
        qs.push({
            text: 'Protein synthesized on RER is most likely destined for:',
            options: shuffle(['Secretion or membranes', 'Cytosol', 'Nucleus', 'Mitochondrial matrix']),
            correctAnswer: 'Secretion or membranes',
            solution: 'Proteins synthesised on the rough endoplasmic reticulum (RER) are typically destined for secretion outside the cell, insertion into membranes, or packaging into lysosomes. Cytosolic proteins are made on free ribosomes.',
            difficulty_level: 'Medium'
        });

        // Q18
        qs.push({
            text: 'Golgi apparatus is functionally connected to:',
            options: shuffle(['ER and plasma membrane', 'Nucleus only', 'SER only', 'Mitochondria']),
            correctAnswer: 'ER and plasma membrane',
            solution: 'The Golgi apparatus receives vesicles from the ER (cis face), processes and modifies proteins/lipids, and sends them to the plasma membrane or other destinations (trans face). It functions as the cell\'s sorting and dispatching centre.',
            difficulty_level: 'Medium'
        });

        // Q19
        qs.push({
            text: 'Which structure is correctly paired with its chemical nature?',
            options: shuffle(['Plasma membrane – lipid bilayer', 'Cell wall – protein', 'Ribosome – lipid', 'Chromatin – polysaccharide']),
            correctAnswer: 'Plasma membrane – lipid bilayer',
            solution: 'The plasma membrane is composed of a lipid bilayer with embedded proteins (fluid mosaic model). Cell wall is made of cellulose (polysaccharide), ribosomes are made of RNA + protein, and chromatin is DNA + histone proteins.',
            difficulty_level: 'Easy'
        });

        // Q20
        qs.push({
            text: 'Which statement best reflects cellular compartmentalization?',
            options: shuffle(['Organelles isolate incompatible reactions', 'All reactions occur in cytosol', 'Compartmentalization reduces efficiency', 'Only eukaryotes show metabolism']),
            correctAnswer: 'Organelles isolate incompatible reactions',
            solution: 'Cellular compartmentalization means that different organelles create separate environments for specific biochemical reactions. This prevents interference between incompatible reactions and increases overall cellular efficiency.',
            difficulty_level: 'Medium'
        });

        setQuestions(qs);
    }, []);

    useEffect(() => { if (isFinished) return; const uid = sessionStorage.getItem('userId') || localStorage.getItem('userId'); if (uid && !sessionId) api.createPracticeSession(uid, SKILL_ID).then(s => { if (s?.session_id) setSessionId(s.session_id) }).catch(console.error); const t = setInterval(() => setTimeElapsed(p => p + 1), 1000); const v = () => { if (document.hidden) { accumulatedTime.current += Date.now() - questionStartTime.current; isTabActive.current = false } else { questionStartTime.current = Date.now(); isTabActive.current = true } }; document.addEventListener('visibilitychange', v); return () => { clearInterval(t); document.removeEventListener('visibilitychange', v) }; }, [sessionId, isFinished]);
    const formatTime = s => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
    const recordAttempt = async (q, sel, cor) => { const uid = sessionStorage.getItem('userId') || localStorage.getItem('userId'); if (!uid) return; let t = accumulatedTime.current; if (isTabActive.current) t += Date.now() - questionStartTime.current; const sec = Math.max(0, Math.round(t / 1000)); api.recordAttempt({ user_id: parseInt(uid), session_id: sessionId, skill_id: SKILL_ID, template_id: null, difficulty_level: q.difficulty_level || 'Medium', question_text: q.text, correct_answer: q.correctAnswer, student_answer: sel || '', is_correct: cor, solution_text: q.solution || '', time_spent_seconds: sec }).catch(console.error) };
    const handleCheck = () => { if (!selectedOption) return; const q = questions[qIndex]; const r = selectedOption === q.correctAnswer; setIsCorrect(r); setIsSubmitted(true); if (r) setFeedbackMessage(CORRECT_MSGS[Math.floor(Math.random() * CORRECT_MSGS.length)]); else setShowExplanationModal(true); setAnswers(p => ({ ...p, [qIndex]: { selectedOption, isCorrect: r } })); recordAttempt(q, selectedOption, r) };
    const handleNext = async () => { if (qIndex < questions.length - 1) { setQIndex(p => p + 1); accumulatedTime.current = 0; questionStartTime.current = Date.now() } else await handleFinalSubmit() };
    const handlePrev = () => { if (qIndex > 0) setQIndex(p => p - 1) };
    const handleFinalSubmit = async () => { if (sessionId) await api.finishSession(sessionId).catch(console.error); const uid = sessionStorage.getItem('userId') || localStorage.getItem('userId'); if (uid) { const tc = Object.values(answers).filter(v => v.isCorrect).length; await api.createReport({ title: SKILL_NAME, type: 'practice', score: (tc / questions.length) * 100, parameters: { skill_id: SKILL_ID, skill_name: SKILL_NAME, total_questions: questions.length, correct_answers: tc, timestamp: new Date().toISOString(), time_taken_seconds: timeElapsed }, user_id: parseInt(uid) }).catch(console.error) } setIsFinished(true) };
    useEffect(() => { const s = answers[qIndex]; if (s) { setSelectedOption(s.selectedOption); setIsCorrect(s.isCorrect); setIsSubmitted(true) } else { setSelectedOption(null); setIsCorrect(false); setIsSubmitted(false) } }, [qIndex, answers]);
    useEffect(() => { setShowExplanationModal(false) }, [qIndex]);

    if (questions.length === 0) return <div>Loading...</div>;
    if (isFinished) { const correct = Object.values(answers).filter(a => a.isCorrect).length; const wrong = Object.values(answers).filter(a => !a.isCorrect).length; return (<div className="junior-practice-page raksha-theme p-3 sm:p-8 pb-24" style={{ fontFamily: '"Open Sans",sans-serif', backgroundColor: '#F8FAFC', minHeight: '100vh', overflowY: 'auto' }}><div className="max-w-3xl mx-auto w-full"><motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-2xl p-4 sm:p-8 shadow-xl border-2 border-[#4FB7B3]/20 my-4 sm:my-8"><div className="text-center mb-6"><div style={{ fontSize: '3rem', marginBottom: 8 }}>{correct >= 14 ? '🏆' : '📝'}</div><h2 className="text-2xl sm:text-3xl font-bold text-[#31326F] mb-2">{correct >= 14 ? 'Excellent!' : 'Keep Practicing!'}</h2><p className="text-sm text-gray-500">{SKILL_NAME}</p></div><div className="grid grid-cols-3 gap-2 mb-6"><div className="bg-blue-50 p-2 rounded-xl text-center border border-blue-100"><div className="text-blue-500 font-bold text-xs uppercase">Time</div><div className="text-lg font-black text-[#31326F]">{formatTime(timeElapsed)}</div></div><div className="bg-green-50 p-2 rounded-xl text-center border border-green-100"><div className="text-green-500 font-bold text-xs uppercase">Correct</div><div className="text-lg font-black text-[#31326F]">{correct}</div></div><div className="bg-red-50 p-2 rounded-xl text-center border border-red-100"><div className="text-red-500 font-bold text-xs uppercase">Wrong</div><div className="text-lg font-black text-[#31326F]">{wrong}</div></div></div><div className="space-y-4"><h3 className="text-lg font-bold text-[#31326F] border-b pb-2">Detailed Report</h3>{questions.map((q, idx) => { const ans = answers[idx] || { isCorrect: false, selectedOption: 'N/A' }; return (<div key={idx} className="p-4 rounded-xl border-2 border-gray-100 bg-white shadow-sm"><div className="flex justify-between items-center mb-2"><span className="w-7 h-7 rounded-full bg-[#31326F] text-white flex items-center justify-center font-bold text-xs">{idx + 1}</span><span className={`px-2 py-0.5 rounded-full font-bold text-xs uppercase ${ans.isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{ans.isCorrect ? 'Correct' : 'Wrong'}</span></div><div className="text-sm text-[#31326F] mb-2"><LatexText text={q.text} /></div><div className="grid grid-cols-2 gap-2 text-xs mb-2"><div className="p-2 rounded-lg bg-gray-50 border"><span className="text-gray-400 block text-xs">Your Answer:</span><span className={ans.isCorrect ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}><LatexText text={ans.selectedOption} /></span></div><div className="p-2 rounded-lg bg-green-50 border border-green-100"><span className="text-green-400 block text-xs">Correct:</span><span className="text-green-700 font-bold"><LatexText text={q.correctAnswer} /></span></div></div><div className="p-2 rounded-lg bg-amber-50 border border-amber-100 text-xs italic text-[#31326F]"><span className="font-bold not-italic text-amber-700">Explanation: </span><LatexText text={q.solution} /></div></div>) })}</div><div className="mt-8 flex justify-center"><button className="bg-[#31326F] text-white px-12 py-3 rounded-xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl" onClick={() => navigate(-1)}>Done</button></div></motion.div></div></div>) }

    const cq = questions[qIndex];
    return (<div className="junior-practice-page" style={{ fontFamily: '"Open Sans",sans-serif' }}><header className="junior-practice-header" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto minmax(0,1fr)', alignItems: 'center', padding: '0 2rem', gap: '1rem' }}><div style={{ fontSize: '1rem', fontWeight: 'bold', color: '#31326F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{SKILL_NAME}</div><div><div className="bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-6 sm:py-2 rounded-full border-2 border-[#4FB7B3]/30 text-[#31326F] font-black text-sm sm:text-xl shadow-lg whitespace-nowrap">Q {qIndex + 1}/{questions.length}</div></div><div style={{ justifySelf: 'end' }}><div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#4FB7B3]/30 text-[#31326F] font-bold text-lg shadow-md">{formatTime(timeElapsed)}</div></div></header><main className="practice-content-wrapper"><div className="practice-board-container" style={{ gridTemplateColumns: '1fr', maxWidth: 800, margin: '0 auto' }}><div className="practice-left-col" style={{ width: '100%' }}><div className="question-card-modern" style={{ paddingLeft: '2rem' }}><div className="question-header-modern"><h2 className="question-text-modern" style={{ fontSize: 'clamp(1rem,2vw,1.6rem)', maxHeight: 'none', fontWeight: 500, textAlign: 'left', overflow: 'visible', color: '#2D3748' }}><LatexText text={cq.text} /></h2></div><div className="interaction-area-modern"><div className="options-grid-modern">{cq.options.map((o, i) => (<button key={i} className={`option-btn-modern ${selectedOption === o ? 'selected' : ''} ${isSubmitted && o === cq.correctAnswer ? 'correct' : ''} ${isSubmitted && selectedOption === o && !isCorrect ? 'wrong' : ''}`} style={{ fontWeight: 500 }} onClick={() => !isSubmitted && setSelectedOption(o)} disabled={isSubmitted}><LatexText text={o} /></button>))}</div>{isSubmitted && isCorrect && <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '2rem' }}><motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="feedback-mini correct">{feedbackMessage}</motion.div></div>}</div></div></div></div></main><ExplanationModal isOpen={showExplanationModal} isCorrect={isCorrect} correctAnswer={cq.correctAnswer} explanation={cq.solution} onClose={() => setShowExplanationModal(false)} /><footer className="junior-bottom-bar"><div className="desktop-footer-controls"><button className="bg-red-50 text-red-500 px-6 py-2 rounded-xl border-2 border-red-100 font-bold" onClick={() => navigate(-1)}>Exit</button><div className="bottom-center">{isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={20} /> View Explanation</button>}</div><div className="bottom-right" style={{ display: 'flex', gap: 10 }}><button className="nav-pill-next-btn bg-gray-200 text-gray-600" onClick={handlePrev} disabled={qIndex === 0} style={{ opacity: qIndex === 0 ? 0.5 : 1 }}><ChevronLeft size={28} strokeWidth={3} /> Prev</button>{isSubmitted ? <button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < questions.length - 1 ? <>Next <ChevronRight size={28} strokeWidth={3} /></> : <>Done <Check size={28} strokeWidth={3} /></>}</button> : <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit <Check size={28} strokeWidth={3} /></button>}</div></div><div className="mobile-footer-controls"><div className="mobile-footer-right"><button className="nav-pill-next-btn bg-gray-200 text-gray-600 p-2" onClick={handlePrev} disabled={qIndex === 0} style={{ minWidth: 'auto', opacity: qIndex === 0 ? 0.5 : 1 }}><ChevronLeft size={20} /></button>{isSubmitted && <button className="view-explanation-btn" onClick={() => setShowExplanationModal(true)}><Eye size={18} /></button>}{isSubmitted ? <button className="nav-pill-next-btn" onClick={handleNext}>{qIndex < questions.length - 1 ? 'Next' : 'Done'}</button> : <button className="nav-pill-submit-btn" onClick={handleCheck} disabled={!selectedOption}>Submit</button>}</div></div></footer></div>);
};

export default CellStructureTest;
