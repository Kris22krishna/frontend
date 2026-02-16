import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Clock, Target, Award, X } from "lucide-react";
import { api } from "@/services/api";

export default function StudentDetailView({ student, onClose }) {
    const [recentSessions, setRecentSessions] = useState([]);
    const [progressStats, setProgressStats] = useState({ totalQuestions: 0, totalTime: 0, accuracy: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!student) return;

        const fetchData = async () => {
            try {
                // Fetch recent sessions
                // Using student_id from the student object passed (which comes from MentorDashboard > getMentorStudents)
                // In MentorStudentSummary, student_id is the user_id of the student.
                const sessions = await api.getUserSessions(student.student_id, 5);
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

    if (!student) return null;

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        if (h > 0) return `${h}h ${m}m`;
        return `${m}m`;
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 flex items-center justify-between text-white shrink-0">
                    <div>
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-yellow-300" />
                            {student.name}
                        </h2>
                        <p className="text-blue-100 mt-1">
                            Grade: {student.grade || 'N/A'} • {student.email}
                        </p>
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
                    {/* Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
                                    <div key={session.session_id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                                                {session.total_correct}/{session.total_questions}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-slate-800">
                                                    {session.skill_name || `Skill ID #${session.skill_id}`}
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
                </div>
            </div>
        </div>
    );
}
