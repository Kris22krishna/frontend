import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/services/api";
import { FileText, Clock } from "lucide-react";

export default function ReportsPage() {
    const context = useOutletContext();
    const selectedChild = context?.selectedChild;
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!selectedChild) return;

        const fetchData = async () => {
            try {
                const data = await api.getUserSessions(selectedChild.student_id, 20);
                setSessions(data || []);
            } catch (err) {
                console.error("Reports fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedChild]);

    if (!selectedChild) return null;

    const formatDate = (isoString) => {
        return new Date(isoString).toLocaleDateString();
    };

    const formatTime = (isoString) => {
        return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDuration = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}m ${s}s`;
    };

    return (
        <div className="space-y-8 max-w-5xl pb-8 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
                <FileText className="h-8 w-8 text-[#31326F]" />
                <h1 className="text-3xl font-bold text-[#31326F]">Performance Reports</h1>
            </div>

            <Card className="border-none shadow-lg overflow-hidden">
                <CardHeader className="bg-slate-50 border-b border-slate-100">
                    <CardTitle className="flex items-center gap-2 text-[#31326F]">
                        <Clock className="h-5 w-5 opacity-70" />
                        Practice History
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {sessions.length === 0 ? (
                        <div className="p-12 text-center text-slate-500">
                            <p>No practice sessions recorded yet.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-[#E0FBEF]/30 text-[#31326F] font-bold text-xs uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Skill</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Score</th>
                                        <th className="px-6 py-4 text-right">Duration</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {sessions.map((session) => {
                                        const score = session.total_correct;
                                        const total = session.total_questions;
                                        const percent = total > 0 ? Math.round((score / total) * 100) : 0;

                                        return (
                                            <tr key={session.session_id} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4 font-medium text-slate-700">
                                                    <div className="flex flex-col">
                                                        <span>{formatDate(session.started_at)}</span>
                                                        <span className="text-xs text-slate-400">{formatTime(session.started_at)}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-[#31326F] font-semibold">
                                                    Skill #{session.skill_id}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${percent >= 80 ? 'bg-green-100 text-green-700 border-green-200' : percent >= 50 ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                                                        {percent >= 80 ? 'Mastered' : percent >= 50 ? 'Practicing' : 'Needs Focus'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                            <div className={`h-full rounded-full ${percent >= 80 ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${percent}%` }}></div>
                                                        </div>
                                                        <span className="font-bold text-slate-700">{score}/{total}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right font-mono text-slate-500">
                                                    {formatDuration(session.total_time_seconds)}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
