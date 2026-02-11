import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/services/api";
import { Trophy, Flame, Target } from "lucide-react";

export default function ProgressPage() {
    const context = useOutletContext();
    const selectedChild = context?.selectedChild;
    const [skillsProgress, setSkillsProgress] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!selectedChild) return;

        const fetchData = async () => {
            try {
                // 1. Fetch user progress
                const progressData = await api.getUserProgress(selectedChild.student_id);

                // 2. Fetch all skills for the child's grade to map names
                let skillsData = [];
                if (selectedChild.grade) {
                    try {
                        skillsData = await api.getSkills(selectedChild.grade);
                    } catch (e) {
                        console.warn("Could not fetch skills metadata", e);
                    }
                }

                const combined = progressData.map(p => {
                    let skillName = `Skill #${p.skill_id}`;

                    // Search in categories for skill name
                    if (Array.isArray(skillsData)) {
                        for (const cat of skillsData) {
                            const found = cat.skills?.find(s => s.id === p.skill_id);
                            if (found) {
                                skillName = found.name;
                                break;
                            }
                        }
                    }

                    return { ...p, skillName };
                });

                setSkillsProgress(combined);

            } catch (err) {
                console.error("Progress fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedChild]);

    if (!selectedChild) return null;

    return (
        <div className="space-y-8 max-w-5xl pb-8 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-8 w-8 text-[#31326F]" />
                <h1 className="text-3xl font-bold text-[#31326F]">Skill Mastery</h1>
            </div>

            {skillsProgress.length === 0 ? (
                <Card>
                    <CardContent className="p-12 text-center text-slate-500">
                        <p>No progress recorded yet. Encourage {selectedChild.name} to start practicing!</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skillsProgress.map((p) => (
                        <Card key={p.skill_id} className="hover:shadow-md transition-shadow border-slate-200">
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <CardTitle className="text-lg font-bold text-[#31326F]">{p.skillName}</CardTitle>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200">
                                                {p.current_difficulty}
                                            </span>
                                            {p.correct_streak > 2 && (
                                                <span className="px-2 py-0.5 rounded-md bg-orange-100 text-orange-700 text-xs font-bold border border-orange-200 flex items-center gap-1">
                                                    <Flame className="h-3 w-3" /> {p.correct_streak} Streak
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-3 gap-2 text-center text-sm">
                                        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                                            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-wider mb-1">Attempted</p>
                                            <p className="font-bold text-lg text-[#31326F]">{p.total_questions_attempted}</p>
                                        </div>
                                        <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                                            <p className="text-green-600 text-[10px] uppercase font-bold tracking-wider mb-1">Correct</p>
                                            <p className="font-bold text-lg text-green-700">{p.total_correct}</p>
                                        </div>
                                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                            <p className="text-blue-600 text-[10px] uppercase font-bold tracking-wider mb-1">Time</p>
                                            <p className="font-bold text-lg text-blue-700">{Math.round(p.total_time_spent_seconds / 60)}m</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

