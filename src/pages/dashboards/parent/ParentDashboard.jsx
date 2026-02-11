import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    Sparkles,
} from "lucide-react";
import { api } from "@/services/api";

export default function ParentDashboard() {
    const { selectedChild } = useOutletContext();

    // Fallback/Loading UI could be improved here
    if (!selectedChild) return null;

    return (
        <div className="space-y-8 max-w-6xl pb-8 animate-fade-in">
            {/* Hero Section with Mascot */}
            <div className="bg-gradient-to-br from-[#A8FBD3] via-[#4FB7B3] to-[#637AB9] rounded-3xl p-8 md:p-12 text-[#31326F] relative overflow-hidden shadow-lg">
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 text-6xl opacity-20 animate-pulse">✨</div>
                <div className="absolute bottom-4 left-4 text-5xl opacity-20">🌟</div>

                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Mascot */}
                    <div className="text-8xl md:text-9xl animate-bounce">🦊</div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                            <Sparkles className="h-5 w-5" />
                            <span className="text-sm font-medium opacity-90">Dashboard</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold mb-3">
                            Welcome to {selectedChild.name}'s Dashboard
                        </h1>
                        <p className="text-lg opacity-90 mb-6">
                            Select an option from the sidebar to manage your child's learning journey.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-6 text-center text-slate-500">
                    <CardContent>
                        <p>Detailed statistics are currently being updated. Check back soon!</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

