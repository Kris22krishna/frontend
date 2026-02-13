import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Clock, Target, Award } from "lucide-react";
import { api } from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

export default function ParentDashboard() {
    const { user } = useAuth();
    const context = useOutletContext();
    const selectedChild = context?.selectedChild;
    const [recentSessions, setRecentSessions] = useState([]);
    const [progressStats, setProgressStats] = useState({ totalQuestions: 0, totalTime: 0, accuracy: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!selectedChild) return;

        const fetchData = async () => {
            try {
                // Fetch recent sessions
                const sessions = await api.getUserSessions(selectedChild.student_id, 5);
                setRecentSessions(sessions || []);

                // Fetch overall progress to aggregate
                const allProgress = await api.getUserProgress(selectedChild.student_id);
                if (allProgress) {
                    const totalQ = allProgress.reduce((acc, curr) => acc + curr.total_questions_attempted, 0);
                    const totalCorrect = allProgress.reduce((acc, curr) => acc + curr.total_correct, 0);
                    const totalTime = allProgress.reduce((acc, curr) => acc + curr.total_time_spent_seconds, 0);
                    const acc = totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0;
                    setProgressStats({ totalQuestions: totalQ, totalTime, accuracy: acc });
                }
            } catch (err) {
                console.error("Dashboard fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedChild]);

    if (!selectedChild) return null;

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        if (h > 0) return `${h}h ${m}m`;
        return `${m}m`;
    };

    return (
        <div className="space-y-8 max-w-6xl pb-8 animate-fade-in">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-[#A8FBD3] via-[#4FB7B3] to-[#637AB9] rounded-3xl p-8 md:p-12 text-[#31326F] relative overflow-hidden shadow-lg">
                <div className="absolute top-4 right-4 text-6xl opacity-20 animate-pulse">✨</div>
                <div className="absolute bottom-4 left-4 text-5xl opacity-20">🌟</div>

                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="text-8xl md:text-9xl animate-bounce">🦊</div>
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                            <Sparkles className="h-5 w-5" />
                            <span className="text-sm font-medium opacity-90">Dashboard</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-3">
                            Welcome, {user?.first_name || 'Parent'}!
                        </h1>
                        <p className="text-lg opacity-90 mb-6 font-medium">
                            Here is a snapshot of {selectedChild.name}'s learning journey!
                        </p>
                        <button
                            onClick={context.openAddChild}
                            className="bg-white text-[#4FB7B3] px-6 py-2 rounded-full font-bold shadow-md hover:bg-opacity-90 transition-all flex items-center gap-2 mx-auto md:mx-0"
                        >
                            <Target className="h-5 w-5" />
                            Link Another Child
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                            <Target className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium tracking-wide">Questions Attempted</p>
                            <p className="text-3xl font-bold text-[#31326F]">{progressStats.totalQuestions}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 bg-teal-100 rounded-full text-teal-600">
                            <Clock className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium tracking-wide">Time Spent</p>
                            <p className="text-3xl font-bold text-[#31326F]">{formatTime(progressStats.totalTime)}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-none shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-3 bg-orange-100 rounded-full text-orange-600">
                            <Award className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium tracking-wide">Accuracy</p>
                            <p className="text-3xl font-bold text-[#31326F]">{progressStats.accuracy}%</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
            <div>
                <h2 className="text-2xl font-bold text-[#31326F] mb-4 flex items-center gap-2">
                    <Clock className="h-6 w-6 opacity-70" /> Recent Sessions
                </h2>
                {recentSessions.length === 0 ? (
                    <Card className="border-dashed border-2 bg-slate-50/50">
                        <CardContent className="p-8 text-center text-slate-400 italic">
                            No recent practice sessions found. Time to start learning! 🚀
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4">
                        {recentSessions.map((session) => (
                            <Card key={session.session_id} className="hover:border-teal-200 transition-colors group cursor-default">
                                <CardContent className="p-6 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 group-hover:bg-indigo-100 transition-colors">
                                            <Award className="h-5 w-5" />
                                        </div>
                                        <div>
                                            {/* Skill Name would ideally come from session join or separate call. For now using ID or a placeholder logic if available */}
                                            <h3 className="font-bold text-[#31326F] text-lg">{session.skill_name || `Skill ID #${session.skill_id}`}</h3>
                                            <div className="flex gap-4 text-sm text-slate-500 mt-1">
                                                <span>{new Date(session.started_at).toLocaleDateString()}</span>
                                                <span>•</span>
                                                <span className={session.total_correct > 0 ? "text-green-600 font-medium" : ""}>
                                                    {session.total_correct}/{session.total_questions} Correct
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-slate-700">{formatTime(session.total_time_seconds)}</p>
                                        <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Duration</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

