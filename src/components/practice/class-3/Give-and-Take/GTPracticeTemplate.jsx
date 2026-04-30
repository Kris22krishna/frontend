import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer, Star, ChevronLeft, ChevronRight, Check, RefreshCw, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSessionLogger } from '@/hooks/useSessionLogger';
import { NODE_IDS } from '@/lib/curriculumIds';
import Navbar from '../../../Navbar';
import ExplanationModal from '../../../ExplanationModal';
import StickerExit from '../../../StickerExit';
import avatarImg from '../../../../assets/avatar.png';
import '../../../../pages/juniors/class-1/Grade1Practice.css';
import '../../../../pages/juniors/grade3/time-goes-ontest.css';
import './give-and-take.css';

const SKILL_ID_MAP = {
  'GT-01': NODE_IDS.g3MathGTAdditionHTO,
  'GT-02': NODE_IDS.g3MathGTSubtractionBorrowing,
  'GT-03': NODE_IDS.g3MathGTNumberLine,
  'GT-04': NODE_IDS.g3MathGTWordProblems,
  'GT-05': NODE_IDS.g3MathGTMoneyExchange,
  'GT-06': NODE_IDS.g3MathGTMakingAmounts,
  'GT-07': NODE_IDS.g3MathGTNumberPatterns,
  'GT-08': NODE_IDS.g3MathGTMentalMath,
};

const TOTAL_QUESTIONS = 5;
const TOPIC_URL = encodeURIComponent('Give and Take');

const GTPracticeTemplate = ({ skillId, skillName, questions, questionMeta, logicProps }) => {
  const navigate = useNavigate();
  const { startSession, logAnswer, finishSession } = useSessionLogger();
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showExplanationModal, setShowExplanationModal] = useState(false);
  const [answersMap, setAnswersMap] = useState({});

  const {
    isAnswered, setIsAnswered,
    selectedOption, setSelectedOption,
    lastIsCorrect, lastExplanation, lastCorrectLabel,
    checkCurrentAnswer, isReadyToSubmit, resetState,
  } = logicProps;

  useEffect(() => {
    const nodeId = SKILL_ID_MAP[skillId] || NODE_IDS.g3MathGiveAndTake;
    startSession({ nodeId, sessionType: 'practice' });
  }, [skillId, startSession]);

  useEffect(() => {
    let interval;
    if (!showResults) interval = setInterval(() => setTimer(v => v + 1), 1000);
    return () => clearInterval(interval);
  }, [showResults]);

  const handleSubmit = () => {
    if (isAnswered) return;
    const meta = questionMeta ? questionMeta[qIndex] : null;
    const isCorrect = checkCurrentAnswer(qIndex, meta);
    setIsAnswered(true);
    if (isCorrect) setScore(s => s + 1);
    const answerData = { selected: selectedOption, correct: meta?.correctLabel || meta?.correct, isCorrect };
    setAnswersMap(prev => ({ ...prev, [qIndex]: answerData }));
    logAnswer({ question_index: qIndex, answer_json: answerData, is_correct: isCorrect ? 1 : 0 });
    setShowExplanationModal(true);
  };

  const handleNext = () => {
    if (qIndex < TOTAL_QUESTIONS - 1) {
      setQIndex(v => v + 1);
      setIsAnswered(false);
      setSelectedOption(null);
      if (resetState) resetState();
      setShowExplanationModal(false);
    } else {
      finishSession({ totalQuestions: TOTAL_QUESTIONS, questionsAnswered: Object.keys(answersMap).length, answersPayload: answersMap });
      setShowResults(true);
      setShowExplanationModal(false);
    }
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  if (showResults) {
    const percentage = Math.round((score / TOTAL_QUESTIONS) * 100);
    return (
      <div className="grade1-practice-page results-view overflow-y-auto">
        <Navbar />
        <header className="results-header">
          <h1 className="results-title">Adventure Report</h1>
          <div className="exit-container">
            <StickerExit onClick={() => navigate(`/junior/grade/3/topic/${TOPIC_URL}`)} />
          </div>
        </header>
        <main className="results-content">
          <div className="results-hero-section">
            <img src={avatarImg} alt="Mascot" style={{ width: '120px', height: '120px', margin: '0 auto 20px' }} />
            <h2 style={{ fontSize: '2.5rem', color: '#14532d', fontFamily: 'Nunito, sans-serif' }}>Quest Complete! 🎉</h2>
            <div className="stars-container">
              {[1,2,3].map(i => (
                <Star key={i} size={60} fill={percentage >= (i * 33) ? '#FFD700' : '#EDF2F7'} color={percentage >= (i * 33) ? '#F6AD55' : '#CBD5E0'} />
              ))}
            </div>
            <div className="results-stats-grid">
              <div className="stat-card"><span className="stat-label">Correct</span><span className="stat-value-large">{score}/{TOTAL_QUESTIONS}</span></div>
              <div className="stat-card"><span className="stat-label">Time</span><span className="stat-value-large">{formatTime(timer)}</span></div>
              <div className="stat-card"><span className="stat-label">Accuracy</span><span className="stat-value-large">{percentage}%</span></div>
            </div>
          </div>
          <div className="results-actions">
            <button className="action-btn-large retake-skill-btn" onClick={() => window.location.reload()}><RefreshCw size={24} /> Retake</button>
            <button className="action-btn-large back-topics-btn" onClick={() => navigate(`/junior/grade/3/topic/${TOPIC_URL}`)}><FileText size={24} /> Back to Skills</button>
          </div>
        </main>
      </div>
    );
  }

  const ready = isReadyToSubmit(qIndex);

  return (
    <div className="grade1-practice-page">
      <div className="g1-bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      <div className="g1-practice-container">
        <div className="g1-header-nav">
          <div className="g1-timer-badge"><Timer size={18} /> {formatTime(timer)}</div>
          <div className="g1-progress-container">
            <div className="g1-progress-fill" style={{ width: `${((qIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}></div>
          </div>
          <div className="exit-practice-sticker">
            <StickerExit onClick={() => navigate(`/junior/grade/3/topic/${TOPIC_URL}`)} />
          </div>
        </div>
        <div className="g1-topic-header-compact" style={{ textAlign: 'center', margin: '10px 0', fontSize: '0.9rem', color: '#64748B', textTransform: 'uppercase', letterSpacing: '2px' }}>
          {skillName}
        </div>
        <motion.div key={qIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="g1-question-card">
          <div className="custom-html-question-content">
            {questions[qIndex]}
          </div>
          <div className="g1-navigation-footer" style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
            <button className="g1-nav-btn prev-btn" onClick={() => qIndex > 0 && setQIndex(qIndex - 1)} disabled={qIndex === 0 || isAnswered}>
              <ChevronLeft size={24} /> Prev
            </button>
            <div>
              {!isAnswered ? (
                <button className="g1-nav-btn submit-btn" onClick={handleSubmit} disabled={!ready}>
                  Submit <Check size={24} />
                </button>
              ) : (
                <button className="g1-nav-btn next-btn" onClick={handleNext}>
                  {qIndex === TOTAL_QUESTIONS - 1 ? 'Finish' : 'Next'} <ChevronRight size={24} />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
      <ExplanationModal
        isOpen={showExplanationModal}
        isCorrect={lastIsCorrect}
        correctAnswer={lastCorrectLabel}
        explanation={lastExplanation}
        onClose={() => setShowExplanationModal(false)}
        onNext={handleNext}
      />
    </div>
  );
};

export default GTPracticeTemplate;
