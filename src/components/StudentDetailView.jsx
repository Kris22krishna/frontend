import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Clock, Target, Award, X, ChevronLeft, CheckCircle2, XCircle } from "lucide-react";
import { api } from "@/services/api";
import { LatexText } from "./LatexText";

export default function StudentDetailView({ student, onClose }) {
    const [recentSessions, setRecentSessions] = useState([]);
    const [progressStats, setProgressStats] = useState({ totalQuestions: 0, totalTime: 0, accuracy: 0 });
    const [loading, setLoading] = useState(true);
    const [selectedSessionResult, setSelectedSessionResult] = useState(null);
    const [loadingSession, setLoadingSession] = useState(false);

    useEffect(() => {
        if (!student) return;

        const fetchData = async () => {
            try {
                // Fetch recent sessions - increased limit to 20
                const sessions = await api.getUserSessions(student.student_id, 20);
                setRecentSessions(sessions || []);

                // Fetch overall progress
                const allProgress = await api.getUserProgress(student.student_id);
                if (allProgress) {
                    const totalQ = allProgress.reduce((acc, curr) => acc + curr.total_questions_attempted, 0);
                    const totalCorrect = allProgress.reduce((acc, curr) => acc + curr.total_correct, 0);
                    const totalTime = allProgress.reduce((acc, curr) => acc + curr.total_time_spent_seconds, 0);
                    const acc = totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0;
                    setProgressStats({ totalQuestions: totalQ, totalTime, accuracy: acc });
                }
            } catch (err) {
                console.error("Student Detail fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [student]);

    const handleSessionClick = async (session) => {
        setLoadingSession(true);
        try {
            const attempts = await api.getSessionAttempts(session.session_id);
            setSelectedSessionResult({ session, attempts });
        } catch (err) {
            console.error("Failed to fetch session attempts:", err);
        } finally {
            setLoadingSession(false);
        }
    };

    if (!student) return null;

    const formatTime = (seconds) => {
        if (seconds < 60) return `${seconds}s`;
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;

        if (h > 0) return `${h}h ${m}m`;
        if (s > 0) return `${m}m ${s}s`;
        return `${m}m`;
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1100] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex items-center justify-between text-white shrink-0">
                    <div className="flex items-center gap-4">
                        {selectedSessionResult && (
                            <button
                                onClick={() => setSelectedSessionResult(null)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </button>
                        )}
                        <div>
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-yellow-300" />
                                {selectedSessionResult ? `Results: ${selectedSessionResult.session.skill_name || 'Practice'}` : student.name}
                            </h2>
                            <p className="text-blue-100 mt-1">
                                {selectedSessionResult ?
                                    `${new Date(selectedSessionResult.session.started_at).toLocaleDateString()} • ${formatTime(selectedSessionResult.session.total_time_seconds)}` :
                                    `Grade: ${student.grade || 'N/A'} • ${student.email}`
                                }
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto bg-slate-50 flex-1">
                    {!selectedSessionResult ? (
                        <>
                            {/* Stats Row */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                                <Card className="bg-white border-none shadow-sm">
                                    <CardContent className="p-4 flex items-center gap-4">
                                        <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                                            <Target className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Questions</p>
                                            <p className="text-2xl font-bold text-slate-800">{progressStats.totalQuestions}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="bg-white border-none shadow-sm">
                                    <CardContent className="p-4 flex items-center gap-4">
                                        <div className="p-3 bg-teal-100 rounded-full text-teal-600">
                                            <Clock className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Time Spent</p>
                                            <p className="text-2xl font-bold text-slate-800">{formatTime(progressStats.totalTime)}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card className="bg-white border-none shadow-sm">
                                    <CardContent className="p-4 flex items-center gap-4">
                                        <div className="p-3 bg-orange-100 rounded-full text-orange-600">
                                            <Award className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Accuracy</p>
                                            <p className="text-2xl font-bold text-slate-800">{progressStats.accuracy}%</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Recent Activity */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-slate-400" /> Recent Sessions
                                </h3>
                                {loading ? (
                                    <div className="text-center py-8 text-slate-500">Loading activity...</div>
                                ) : recentSessions.length === 0 ? (
                                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-200">
                                        <p className="text-slate-400 italic">No recent practice sessions found for this student.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {recentSessions.map((session) => (
                                            <div
                                                key={session.session_id}
                                                onClick={() => handleSessionClick(session)}
                                                className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between cursor-pointer group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                                        {session.total_correct}/{session.total_questions}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
                                                            {session.skill_name ? `${session.skill_name} (#${session.skill_id})` : `Skill ID #${session.skill_id}`}
                                                        </div>
                                                        <div className="text-xs text-slate-500">
                                                            {new Date(session.started_at).toLocaleDateString()} • {new Date(session.started_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-medium text-slate-700">{formatTime(session.total_time_seconds)}</div>
                                                    <div className="text-xs text-green-600 font-medium">
                                                        {session.total_questions > 0 ? Math.round((session.total_correct / session.total_questions) * 100) : 0}% Accuracy
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            {loadingSession ? (
                                <div className="text-center py-20">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                                    <p className="text-slate-500 font-medium">Loading session details...</p>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Score</p>
                                            <p className="text-2xl font-black text-indigo-600">{selectedSessionResult.session.total_correct}/{selectedSessionResult.session.total_questions}</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Accuracy</p>
                                            <p className="text-2xl font-black text-teal-600">
                                                {selectedSessionResult.session.total_questions > 0 ?
                                                    Math.round((selectedSessionResult.session.total_correct / selectedSessionResult.session.total_questions) * 100) : 0}%
                                            </p>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Total Time</p>
                                            <p className="text-2xl font-black text-slate-700">{formatTime(selectedSessionResult.session.total_time_seconds)}</p>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm text-center">
                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Status</p>
                                            <p className={`text-2xl font-black ${selectedSessionResult.session.ended_at ? 'text-green-600' : 'text-orange-500'}`}>
                                                {selectedSessionResult.session.ended_at ? 'Finished' : 'In Progress'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4">
                                        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 px-2">
                                            <Clock className="h-5 w-5 text-slate-400" /> Attempt Log
                                        </h3>
                                        {selectedSessionResult.attempts.map((attempt, idx) => (
                                            <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                                <div className={`p-4 flex items-start gap-4 ${attempt.is_correct ? 'bg-green-50/30' : 'bg-red-50/30'}`}>
                                                    <div className={`mt-1 shrink-0`}>
                                                        {attempt.is_correct ?
                                                            <CheckCircle2 className="h-6 w-6 text-green-500" /> :
                                                            <XCircle className="h-6 w-6 text-red-500" />
                                                        }
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Question {idx + 1}</span>
                                                            <span className="text-xs font-medium text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-100">
                                                                {formatTime(attempt.time_spent_seconds)}
                                                            </span>
                                                        </div>
                                                        <div className="text-slate-800 font-medium mb-3 leading-relaxed">
                                                            <LatexText text={attempt.question_text} />
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                            <div className="bg-white p-3 rounded-xl border border-slate-100">
                                                                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Student Answer</p>
                                                                <p className={`font-bold ${attempt.is_correct ? 'text-green-600' : 'text-red-500'}`}>
                                                                    {attempt.student_answer || "(No answer)"}
                                                                </p>
                                                            </div>
                                                            <div className="bg-white p-3 rounded-xl border border-slate-100">
                                                                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Correct Answer</p>
                                                                <p className="font-bold text-slate-800">{attempt.correct_answer}</p>
                                                            </div>
                                                        </div>
                                                        {attempt.solution_text && (
                                                            <div className="mt-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100/50">
                                                                <p className="text-[10px] text-blue-400 font-bold uppercase mb-1">Explanation</p>
                                                                <div className="text-sm text-slate-600 leading-relaxed italic">
                                                                    <LatexText text={attempt.solution_text} />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
                {/* Footer only on list view */}
                {!selectedSessionResult && (
                    <div className="p-4 border-t border-slate-100 bg-white text-center">
                        <p className="text-xs text-slate-400">Showing up to 20 most recent practice sessions.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
