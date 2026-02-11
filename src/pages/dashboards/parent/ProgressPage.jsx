import { useOutletContext } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export default function ProgressPage() {
    const context = useOutletContext();
    const selectedChild = context?.selectedChild;

    if (!selectedChild) return null;

    return (
        <div className="space-y-8 max-w-5xl pb-8 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
                <h1 className="text-3xl font-bold text-[#31326F]">Progress Tracker</h1>
            </div>
            <Card>
                <CardContent className="p-12 text-center text-slate-500">
                    <p>Detailed progress tracking is currently being updated.</p>
                </CardContent>
            </Card>
        </div>
    );
}

