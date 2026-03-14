import React, { useEffect, useState, memo } from "react";
import { useAuth } from '../../contexts/AuthContext';
import { api } from "../../services/api";
import { Trophy, History, Zap, Timer, CheckCircle2, Loader2 } from "lucide-react";

export const SpeedTestLeaderboard = memo(function SpeedTestLeaderboard({
    lastUpdated = 0
}) {
    const { user: authUser, isAuthenticated } = useAuth();
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState("best"); // "best" or "recent"

    useEffect(() => {
        const fetchScores = async () => {
            if (!isAuthenticated) {
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const data = view === "best"
                    ? await api.getMyBestRapidMathScores()
                    : await api.getMyRapidMathScores();
                setScores(data);
            } catch (error) {
                console.error("Failed to fetch rapid math scores:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchScores();
    }, [view, lastUpdated, isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <div className="w-full bg-white dark:bg-slate-800 rounded-2xl p-8 text-center border border-slate-200 dark:border-slate-700">
                <p className="text-slate-500">Log in to track your progress and see your leaderboard!</p>
            </div>
        );
    }

    return (
        <div className="w-full bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
            <div className="p-6 border-b border-slate-50 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600">
                        {view === "best" ? <Trophy size={20} /> : <History size={20} />}
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">Your Performance</h3>
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Rapid Math Challenge</p>
                    </div>
                </div>

                <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl">
                    <button
                        onClick={() => setView("best")}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${view === "best" ? 'bg-white dark:bg-slate-800 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Best Rankings
                    </button>
                    <button
                        onClick={() => setView("recent")}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${view === "recent" ? 'bg-white dark:bg-slate-800 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Recent Attempts
                    </button>
                </div>
            </div>

            <div className="p-2 sm:p-4 min-h-[300px]">
                {loading ? (
                    <div className="flex flex-col items-center justify-center p-12">
                        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                        <p className="mt-4 text-sm text-slate-500">Fetching your records...</p>
                    </div>
                ) : scores.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center">
                        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900/50 rounded-full flex items-center justify-center mb-4">
                            <Zap className="text-slate-300" size={32} />
                        </div>
                        <p className="text-slate-500 font-medium italic">No attempts yet. Time to set some records!</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {scores.map((score, idx) => (
                            <div key={score.id} className="group relative bg-slate-50/50 dark:bg-slate-900/20 hover:bg-white dark:hover:bg-slate-800 p-4 rounded-2xl border border-transparent hover:border-blue-100 dark:hover:border-blue-900/30 transition-all">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${idx === 0 && view === "best" ? "bg-yellow-100 text-yellow-600" :
                                                idx === 1 && view === "best" ? "bg-slate-200 text-slate-600" :
                                                    idx === 2 && view === "best" ? "bg-orange-100 text-orange-600" :
                                                        "bg-white dark:bg-slate-800 text-slate-400"
                                            } shadow-sm border border-slate-100 dark:border-slate-700`}>
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-slate-900 dark:text-white capitalize">{score.difficulty}</span>
                                                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                                <span className="text-xs font-bold text-blue-600">{score.accuracy}% Accuracy</span>
                                            </div>
                                            <p className="text-[10px] text-slate-400 font-medium">
                                                {new Date(score.created_at).toLocaleDateString()} at {new Date(score.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="hidden sm:flex flex-col items-end">
                                            <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300 font-bold text-sm">
                                                <Timer size={14} className="text-blue-500" />
                                                {score.avg_time.toFixed(1)}s
                                            </div>
                                            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Avg Time</span>
                                        </div>
                                        {/* <div className="flex flex-col items-end min-w-[60px]">
                                            <div className="flex items-center gap-1 text-green-600 font-black text-lg leading-none">
                                                {score.correct_answers}/<span className="text-sm opacity-60 font-bold">{score.question_count}</span>
                                            </div>
                                            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Score</span>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-50 dark:border-slate-800">
                <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest leading-relaxed">
                    Track your mental math evolution through consistent practice
                </p>
            </div>
        </div>
    );
});
