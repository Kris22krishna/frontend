import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Clock, ChevronLeft, ChevronRight, CheckCircle, AlertTriangle, Menu, X, BookOpen, Grid } from 'lucide-react';
import { api } from '../services/api';

const AssessmentRunner = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { session_id, questions, duration_minutes } = location.state || {};

    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(duration_minutes ? duration_minutes * 60 : 30 * 60);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true); // For responsive or toggle

    useEffect(() => {
        if (!questions || questions.length === 0) {
            navigate('/assessment-student-dashboard');
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [questions, navigate]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleAnswerChange = (val) => {
        setAnswers({
            ...answers,
            [questions[currentIndex].id]: val
        });
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const jumpToQuestion = (index) => {
        setCurrentIndex(index);
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
        // api.submitAssessment(session_id, answers); // Placeholder
        alert("Assessment Submitted! Thank you.");
        navigate('/assessment-student-dashboard');
    };

    if (!questions) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;

    const currentQuestion = questions[currentIndex];
    const isLastQuestion = currentIndex === questions.length - 1;
    const progress = ((Object.keys(answers).length) / questions.length) * 100;

    return (
        <div className="min-h-screen bg-gray-100 font-sans text-gray-800 flex flex-col">
            {/* Top Navigation Bar */}
            <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-8 shadow-sm z-20 sticky top-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 lg:hidden"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                            AI
                        </div>
                        <span className="font-bold text-gray-900 hidden sm:inline">Assessment Runner</span>
                    </div>
                </div>

                <div className={`flex items-center gap-2 font-mono text-lg font-bold px-4 py-1.5 rounded-full border ${timeLeft < 300 ? 'bg-red-50 text-red-600 border-red-100 animate-pulse' : 'bg-indigo-50 text-indigo-700 border-indigo-100'}`}>
                    <Clock className="h-4 w-4" />
                    {formatTime(timeLeft)}
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex flex-col items-end mr-4">
                        <span className="text-xs text-gray-500 font-medium">Progress</span>
                        <div className="w-32 h-2 bg-gray-100 rounded-full mt-1 overflow-hidden">
                            <div className="h-full bg-green-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors"
                    >
                        Submit
                    </button>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Question Palette Sidebar */}
                <aside
                    className={`fixed lg:static inset-y-0 left-0 z-10 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} lg:block overflow-y-auto flex flex-col`}
                    style={{ top: '64px', height: 'calc(100vh - 64px)' }}
                >
                    <div className="p-6 border-b border-gray-100">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <Grid className="h-5 w-5 text-indigo-500" />
                            Question Palette
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">Navigate through questions</p>
                    </div>

                    <div className="p-6 grid grid-cols-5 gap-3 content-start flex-1 overflow-y-auto">
                        {questions.map((q, idx) => {
                            const isAnswered = answers[q.id];
                            const isCurrent = currentIndex === idx;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        jumpToQuestion(idx);
                                        if (window.innerWidth < 1024) setSidebarOpen(false);
                                    }}
                                    className={`
                                        h-10 w-10 flex items-center justify-center rounded-lg text-sm font-bold transition-all
                                        ${isCurrent
                                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 ring-2 ring-offset-2 ring-indigo-600'
                                            : isAnswered
                                                ? 'bg-green-100 text-green-700 hover:bg-green-200 border border-green-200'
                                                : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                                        }
                                    `}
                                >
                                    {idx + 1}
                                </button>
                            );
                        })}
                    </div>

                    <div className="p-4 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-indigo-600"></div> Current
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-green-100 border border-green-200"></div> Answered
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded bg-gray-50 border border-gray-200"></div> Not Visited
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 relative">
                    <div className="max-w-3xl mx-auto">

                        {/* Question Card */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden min-h-[500px] flex flex-col">

                            {/* Card Header: Topic & Difficulty */}
                            <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm">
                                        {currentIndex + 1}
                                    </span>
                                    <div>
                                        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Question {currentIndex + 1}</h2>
                                        {currentQuestion.topic && (
                                            <div className="flex items-center gap-1.5 text-indigo-600 font-bold text-base mt-0.5">
                                                <BookOpen className="h-4 w-4" />
                                                {currentQuestion.topic}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {currentQuestion.difficulty && (
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border
                                        ${currentQuestion.difficulty.toLowerCase().includes('hard') ? 'bg-red-50 text-red-600 border-red-100' :
                                            currentQuestion.difficulty.toLowerCase().includes('medium') ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                'bg-green-50 text-green-600 border-green-100'}`}>
                                        {currentQuestion.difficulty}
                                    </span>
                                )}
                            </div>

                            {/* Card Body: Question Content */}
                            <div className="p-8 md:p-10 flex-1">
                                <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed mb-8">
                                    <div dangerouslySetInnerHTML={{ __html: currentQuestion.question_html }} />
                                </div>

                                <div className="mt-8 pt-8 border-t border-gray-100">
                                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Your Answer</h3>

                                    {currentQuestion.question_type === 'mcq' && currentQuestion.options ? (
                                        <div className="grid grid-cols-1 gap-3">
                                            {JSON.parse(currentQuestion.options).map((opt, idx) => (
                                                <label
                                                    key={idx}
                                                    className={`
                                                        group flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200
                                                        ${answers[currentQuestion.id] === opt
                                                            ? 'border-indigo-500 bg-indigo-50/50 ring-1 ring-indigo-500 shadow-sm'
                                                            : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                                        }
                                                    `}
                                                >
                                                    <div className={`
                                                        w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
                                                        ${answers[currentQuestion.id] === opt ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300 group-hover:border-gray-400'}
                                                    `}>
                                                        {answers[currentQuestion.id] === opt && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                                    </div>
                                                    <input
                                                        type="radio"
                                                        name={`q-${currentQuestion.id}`}
                                                        value={opt}
                                                        checked={answers[currentQuestion.id] === opt}
                                                        onChange={() => handleAnswerChange(opt)}
                                                        className="hidden"
                                                    />
                                                    <span className={`text-base font-medium ${answers[currentQuestion.id] === opt ? 'text-indigo-900' : 'text-gray-700'}`}>{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="relative">
                                            <textarea
                                                className="w-full p-5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent min-h-[160px] text-lg resize-none shadow-sm transition-shadow"
                                                placeholder="Type your answer here..."
                                                value={answers[currentQuestion.id] || ''}
                                                onChange={(e) => handleAnswerChange(e.target.value)}
                                            />
                                            <div className="absolute bottom-4 right-4 text-xs text-gray-400 pointer-events-none">
                                                Markdown supported
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Card Footer: Navigation Buttons */}
                            <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 flex items-center justify-between">
                                <button
                                    onClick={handlePrev}
                                    disabled={currentIndex === 0}
                                    className={`
                                        flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all
                                        ${currentIndex === 0
                                            ? 'text-gray-300 cursor-not-allowed'
                                            : 'text-gray-600 hover:bg-white hover:shadow-sm hover:text-gray-900'
                                        }
                                    `}
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                    Previous
                                </button>

                                {isLastQuestion ? (
                                    <button
                                        onClick={handleSubmit}
                                        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5"
                                    >
                                        <CheckCircle className="h-5 w-5" />
                                        Complete & Submit
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleNext}
                                        className="flex items-center gap-2 px-8 py-3 bg-white border border-gray-300 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-md text-gray-700 rounded-xl font-bold transition-all group"
                                    >
                                        Next Question
                                        <ChevronRight className="h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AssessmentRunner;
