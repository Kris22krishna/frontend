import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import { SpeedTestQuestionCard } from "./SpeedTestQuestionCard";
import { SpeedTestLeaderboard } from "./SpeedTestLeaderboard";
import { Button } from "../ui/button";
import { Play, Timer as TimerIcon, BarChart2, StopCircle, Trophy, Loader2, Sparkles, BookOpen, Zap, CheckCircle2, XCircle, RotateCcw, Home } from "lucide-react";

export function SpeedTestGame() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [activeChild, setActiveChild] = useState(null);
    const [activeChildLoading, setActiveChildLoading] = useState(true);

    const { isAuthenticated, user: authUser } = useAuth();

    useEffect(() => {
        if (isAuthenticated && authUser) {
            const userType = authUser.role;
            const firstName = authUser.first_name || authUser.name;
            const studentName = localStorage.getItem('studentName'); // Assuming studentName logic is separate or needs migration

            setUser({ type: userType, firstName });

            if (userType === 'student' || studentName) {
                setActiveChild({ name: studentName || firstName });
            }
        }
        setActiveChildLoading(false);
    }, [isAuthenticated, authUser]);
    const [gameState, setGameState] = useState("intro");
    const [selectedDifficulty, setSelectedDifficulty] = useState("standard");
    const [questionCount, setQuestionCount] = useState(10);
    // Slider state for visual alignment
    const [sliderValue, setSliderValue] = useState(10);

    // Sync sliderValue with questionCount
    useEffect(() => {
        setQuestionCount(sliderValue);
    }, [sliderValue]);

    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [questionStartTime, setQuestionStartTime] = useState(0);
    const [stats, setStats] = useState({
        totalQuestions: 0,
        totalTime: 0,
        avgTime: 0,
        correctAnswers: 0,
        skips: 0,
        results: [] // Array of { id, question, correctAnswer, userAnswer, isCorrect, timeTaken }
    });
    const [rankFeedback, setRankFeedback] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [lastLeaderboardUpdate, setLastLeaderboardUpdate] = useState(0);

    const generateQuestion = useCallback(() => {
        const ops = ["+", "-", "*", "/"];
        const operation = ops[Math.floor(Math.random() * ops.length)];

        let num1 = 0, num2 = 0, correctAnswer = 0;

        // Difficulty Settings
        const config = {
            easy: { min: 0, max: 99, maxMult: 12, maxDiv: 100 },
            standard: { min: 10, max: 999, maxMult: 20, maxDiv: 250 },
            medium: { min: 100, max: 999, maxMult: 25, maxDiv: 500 },
            hard: { min: 100, max: 9999, maxMult: 50, maxDiv: 1000 }
        };

        const settings = config[selectedDifficulty] || config.standard;

        if (operation === "+") {
            num1 = Math.floor(Math.random() * (settings.max - settings.min + 1)) + settings.min;
            num2 = Math.floor(Math.random() * (settings.max - settings.min + 1)) + settings.min;
            correctAnswer = num1 + num2;
        } else if (operation === "-") {
            num1 = Math.floor(Math.random() * (settings.max - settings.min + 1)) + settings.min;
            num2 = Math.floor(Math.random() * (settings.max - settings.min + 1)) + settings.min;
            if (num1 < num2) [num1, num2] = [num2, num1];
            correctAnswer = num1 - num2;
        } else if (operation === "*") {
            const validRange = Array.from({ length: settings.maxMult - 1 }, (_, i) => i + 2);
            num1 = validRange[Math.floor(Math.random() * validRange.length)];
            num2 = validRange[Math.floor(Math.random() * validRange.length)];
            correctAnswer = num1 * num2;
        } else if (operation === "/") {
            let d, q;
            do {
                d = Math.floor(Math.random() * (settings.maxMult - 1)) + 2;
                const maxQ = Math.floor(settings.maxDiv / d);
                q = Math.floor(Math.random() * maxQ) + 1;
            } while (d === q || q === 1);

            num2 = d;
            num1 = q * d;
            correctAnswer = q;
        }

        return {
            id: Date.now(),
            question: `${num1} ${operation} ${num2}`,
            correctAnswer: correctAnswer,
            operation: operation,
            num1: num1,
            num2: num2
        };
    }, [selectedDifficulty]);

    const startGame = () => {
        setStats({
            totalQuestions: 0,
            totalTime: 0,
            avgTime: 0,
            correctAnswers: 0,
            skips: 0,
            results: []
        });
        setCurrentQuestion(generateQuestion());
        setQuestionStartTime(Date.now());
        setGameState("playing");
    };

    const handleAnswerObject = (answer) => {
        const endTime = Date.now();
        const timeTaken = (endTime - questionStartTime) / 1000;
        const isCorrect = answer === currentQuestion.correctAnswer;

        const newStats = {
            totalQuestions: stats.totalQuestions + 1,
            totalTime: stats.totalTime + timeTaken,
            avgTime: (stats.totalTime + timeTaken) / (stats.totalQuestions + 1),
            correctAnswers: stats.correctAnswers + (isCorrect ? 1 : 0),
            skips: stats.skips,
            results: [...stats.results, {
                ...currentQuestion,
                userAnswer: answer,
                isCorrect,
                timeTaken
            }]
        };

        setStats(newStats);

        if (newStats.totalQuestions >= questionCount) {
            finishGame();
        } else {
            setCurrentQuestion(generateQuestion());
            setQuestionStartTime(Date.now());
        }
    };

    const [saveStatus, setSaveStatus] = useState("idle");

    const saveScore = async (currentUser) => {
        setSaveStatus("saved (mock)");
        setRankFeedback("Leaderboard temporarily disabled during migration.");
    };

    const finishGame = useCallback(async () => {
        setGameState("summary");
        if (user) {
            await saveScore(user);
        } else {
            setRankFeedback("Log in to save your score on the leaderboard!");
        }
    }, [user, saveScore]);

    const handleLoginAndSave = async () => {
        setRankFeedback("Login temporarily disabled during migration. Use the main login button.");
    };

    if (activeChildLoading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-4">
                <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                <p className="mt-4 text-slate-600 dark:text-slate-400 font-medium">Loading profile...</p>
            </div>
        );
    }

    if (gameState === "intro") {
        const difficulties = [
            { id: 'easy', title: 'Easy', subtitle: 'Foundations', icon: <Sparkles className="w-6 h-6 text-green-500" />, theme: 'green', range: '1-2 digits' },
            { id: 'standard', title: 'Standard', subtitle: 'Standard Mix', icon: <BookOpen className="w-6 h-6 text-blue-500" />, theme: 'blue', range: '2-3 digits' },
            { id: 'medium', title: 'Medium', subtitle: 'Brain Teaser', icon: <Zap className="w-6 h-6 text-orange-500" />, theme: 'orange', range: '3 digits' },
            { id: 'hard', title: 'Hard', subtitle: 'Expert Mode', icon: <Zap className="w-6 h-6 text-red-500" />, theme: 'red', range: '3-4 digits' },
        ];

        const activeDiff = difficulties.find(d => d.id === selectedDifficulty) || difficulties[1];

        const getThemeClasses = (theme, isActive) => {
            const themes = {
                green: isActive ? 'border-green-500 bg-green-50/50 dark:bg-green-900/20' : 'border-slate-100 dark:border-slate-700 hover:border-green-200 dark:hover:border-green-800',
                blue: isActive ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20' : 'border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800',
                orange: isActive ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-900/20' : 'border-slate-100 dark:border-slate-700 hover:border-orange-200 dark:hover:border-orange-800',
                red: isActive ? 'border-red-500 bg-red-50/50 dark:bg-red-900/20' : 'border-slate-100 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-800',
            };
            return themes[theme];
        };

        const getDotColor = (theme) => {
            const colors = { green: 'bg-green-500', blue: 'bg-blue-500', orange: 'bg-orange-500', red: 'bg-red-500' };
            return colors[theme];
        };

        return (
            <div className="flex-1 flex flex-col items-center justify-center p-4 py-8 bg-slate-50 dark:bg-slate-900">
                <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left side: Info */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-6xl font-black tracking-tight text-slate-900 dark:text-white">
                                Math <span className="text-blue-600">Mastery</span>
                            </h1>
                            <div className="flex gap-4">
                                <Button
                                    onClick={() => navigate('/')}
                                    variant="outline"
                                    className="rounded-xl px-4 py-2 border-slate-200 text-slate-600 hover:bg-slate-50 font-bold flex items-center gap-2"
                                >
                                    <Home className="w-4 h-4" /> Back to Home
                                </Button>
                            </div>
                            <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                                Sharpen your arithmetic skills with rapid-fire quizzes. Challenge yourself and track your progress.
                            </p>
                        </div>

                        <div className="flex gap-6">
                            <div className="flex items-center gap-2 text-slate-500">
                                <Trophy className="w-5 h-5" />
                                <span className="font-medium">Track Progress</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500">
                                <Zap className="w-5 h-5" />
                                <span className="font-medium">Boost Mental Math</span>
                            </div>
                        </div>
                    </div>

                    {/* Right side: Selection Card */}
                    <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-2xl shadow-blue-500/10 border border-slate-100 dark:border-slate-700 space-y-8">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Select Difficulty</h3>
                                <span className={`text-xs font-bold px-2 py-1 rounded-md transition-colors ${activeDiff.theme === 'green' ? 'bg-green-100 text-green-600' :
                                    activeDiff.theme === 'blue' ? 'bg-blue-100 text-blue-600' :
                                        activeDiff.theme === 'orange' ? 'bg-orange-100 text-orange-600' :
                                            'bg-red-100 text-red-600'
                                    }`}>
                                    {activeDiff.range}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {difficulties.map((diff) => (
                                    <button
                                        key={diff.id}
                                        onClick={() => setSelectedDifficulty(diff.id)}
                                        className={`p-6 rounded-2xl border-2 transition-all text-left relative overflow-hidden group ${getThemeClasses(diff.theme, selectedDifficulty === diff.id)
                                            }`}
                                    >
                                        {selectedDifficulty === diff.id && (
                                            <div className={`absolute top-3 right-3 w-2 h-2 rounded-full ${getDotColor(diff.theme)}`} />
                                        )}
                                        <div className="space-y-3">
                                            <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm w-fit">
                                                {diff.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 dark:text-white">{diff.title}</h4>
                                                <p className="text-xs text-slate-500">{diff.subtitle}</p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Questions</h3>
                                <span className="text-3xl font-black text-blue-600">{questionCount}</span>
                            </div>
                            <div className="relative pt-6 pb-2">
                                <input
                                    type="range"
                                    min="5"
                                    max="50"
                                    step="5"
                                    value={sliderValue}
                                    onChange={(e) => setSliderValue(parseInt(e.target.value))}
                                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                    style={{
                                        background: `linear-gradient(to right, #2563ea ${((sliderValue - 5) / 45) * 100}%, #e2e8f0 ${((sliderValue - 5) / 45) * 100}%)`
                                    }}
                                />
                                <div className="absolute top-0 w-full flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider select-none pointer-events-none">
                                    <span>5</span>
                                    {/* Position 25 approximately where it falls on the linear scale (20/45 ≈ 44.4%) */}
                                    <span style={{ position: 'absolute', left: '44.4%', transform: 'translateX(-50%)' }}>25</span>
                                    <span>50</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Button
                                onClick={startGame}
                                className="w-full py-8 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-lg shadow-blue-500/25 transition-transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Start Practice
                            </Button>
                            <Button
                                onClick={() => {
                                    setQuestionCount(10);
                                    setSelectedDifficulty('standard');
                                    startGame();
                                }}
                                variant="outline"
                                className="w-full py-8 rounded-2xl border-orange-200 text-orange-600 hover:bg-orange-50 font-bold text-lg flex items-center justify-center gap-2"
                            >
                                <Zap className="w-5 h-5" /> Speed Test Challenge
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (gameState === "summary") {
        const accuracy = Math.round((stats.correctAnswers / stats.totalQuestions) * 100) || 0;
        const totalSeconds = Math.round(stats.totalTime);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const durationStr = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

        const getSummaryHeader = () => {
            if (accuracy === 100) return { title: "Outstanding!", color: "text-slate-900" };
            if (accuracy >= 80) return { title: "Great Job!", color: "text-slate-900" };
            if (accuracy >= 50) return { title: "Good Effort!", color: "text-slate-900" };
            return { title: "Keep Practicing!", color: "text-slate-900" };
        };

        const header = getSummaryHeader();

        return (
            <div className="flex-1 flex flex-col items-center bg-slate-50 dark:bg-slate-900 min-h-screen pb-24">
                <div className="w-full max-w-5xl px-4 py-12 space-y-12">
                    {/* Top Header */}
                    <div className="flex flex-col items-center text-center space-y-6">
                        <div className="w-20 h-20 bg-orange-400 rounded-full flex items-center justify-center shadow-lg shadow-orange-200">
                            <Trophy className="w-10 h-10 text-white" />
                        </div>
                        <div className="space-y-2">
                            <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                                {header.title}
                            </h1>
                            <p className="text-lg text-slate-500 font-medium">
                                You scored <span className="text-slate-900 dark:text-white font-bold">{accuracy}%</span> accuracy in {durationStr}.
                            </p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-green-50/50 dark:bg-green-900/10 border border-green-100 dark:border-green-800/30 p-8 rounded-[2rem] flex flex-col items-center justify-center text-center space-y-3">
                            <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm text-green-500">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                                <span className="text-4xl font-black text-green-600 leading-none">{stats.correctAnswers}</span>
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Correct Answers</h4>
                                <p className="text-[10px] text-slate-400 font-medium">out of {stats.totalQuestions}</p>
                            </div>
                        </div>

                        <div className="bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-800/30 p-8 rounded-[2rem] flex flex-col items-center justify-center text-center space-y-3">
                            <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm text-red-500">
                                <XCircle className="w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                                <span className="text-4xl font-black text-red-600 leading-none">{stats.skips}</span>
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Skips</h4>
                                <p className="text-[10px] text-slate-400 font-medium">Review them below</p>
                            </div>
                        </div>

                        <div className="bg-orange-50/50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-800/30 p-8 rounded-[2rem] flex flex-col items-center justify-center text-center space-y-3">
                            <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm text-orange-500">
                                <Zap className="w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                                <span className="text-4xl font-black text-orange-600 leading-none">{stats.avgTime.toFixed(1)}s</span>
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg. Time</h4>
                                <p className="text-[10px] text-slate-400 font-medium">per question</p>
                            </div>
                        </div>

                        <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/30 p-8 rounded-[2rem] flex flex-col items-center justify-center text-center space-y-3">
                            <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm text-blue-500">
                                <TimerIcon className="w-6 h-6" />
                            </div>
                            <div className="space-y-1">
                                <span className="text-4xl font-black text-blue-600 leading-none">{durationStr}</span>
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Time</h4>
                                <p className="text-[10px] text-slate-400 font-medium">Duration</p>
                            </div>
                        </div>
                    </div>

                    {/* Breakdown Header */}
                    <div className="flex justify-between items-end border-b border-slate-200 dark:border-slate-800 pb-4">
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Question Breakdown</h2>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Showing all {stats.totalQuestions} results</span>
                    </div>

                    {/* Breakdown List/Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {stats.results.map((result, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Question {idx + 1}</span>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 ${result.isCorrect
                                        ? 'bg-green-100 text-green-600'
                                        : 'bg-red-100 text-red-600'
                                        }`}>
                                        {result.isCorrect ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                        {result.isCorrect ? 'Correct' : 'Incorrect'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
                                        {result.question.replace('*', '×').replace('/', '÷')}
                                    </div>
                                    <div className="text-2xl font-black text-green-500">
                                        {result.correctAnswer}
                                    </div>
                                </div>
                                <div className="flex gap-4 text-xs font-bold text-slate-400">
                                    <div className="flex items-center gap-1">
                                        <TimerIcon className="w-3 h-3" /> {result.timeTaken.toFixed(1)}s
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Floating Action Bar */}
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-2 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex gap-2">
                    <Button
                        onClick={() => navigate('/')}
                        variant="ghost"
                        className="rounded-xl px-6 py-6 font-bold flex items-center gap-2 text-slate-600 dark:text-slate-300"
                    >
                        <Home className="w-5 h-5" /> Home
                    </Button>
                    <Button
                        onClick={() => {
                            setGameState("intro");
                            setStats({
                                totalQuestions: 0,
                                totalTime: 0,
                                avgTime: 0,
                                correctAnswers: 0,
                                skips: 0,
                                results: []
                            });
                        }}
                        className="rounded-xl px-12 py-6 bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-2"
                    >
                        <RotateCcw className="w-5 h-5" /> New Test
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-slate-50 dark:bg-slate-900">
            <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-500 font-bold uppercase">Avg Time</span>
                            <span className="text-2xl font-mono font-bold text-slate-800 dark:text-slate-200">
                                {stats.avgTime.toFixed(1)}s
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-500 font-bold uppercase">Solved</span>
                            <span className="text-2xl font-mono font-bold text-blue-600">
                                {stats.totalQuestions}
                            </span>
                        </div>
                    </div>

                    <Button
                        onClick={finishGame}
                        variant="ghost"
                        className="text-red-500"
                    >
                        <StopCircle className="mr-2" size={20} /> Finish
                    </Button>
                </div>
            </div>

            <div className="flex-1 flex items-center justify-center p-4">
                {currentQuestion && (
                    <SpeedTestQuestionCard
                        key={currentQuestion.id}
                        question={currentQuestion}
                        onSubmit={handleAnswerObject}
                        questionNumber={stats.totalQuestions + 1}
                    />
                )}
            </div>
        </div>
    );
}
