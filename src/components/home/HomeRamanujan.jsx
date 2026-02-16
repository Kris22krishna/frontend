import React from 'react';
import { Heart } from 'lucide-react';

export const HomeRamanujan = () => {
    return (
        <section className="py-20 bg-slate-50 relative overflow-hidden">
            {/* Background decoration - matching the soft gradient feel */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-white opacity-60 pointer-events-none" />

            <div className="max-w-4xl mx-auto px-4 relative z-10 text-center space-y-12">

                {/* Date Badges */}
                <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <span className="bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm">
                        December 22 • National Mathematics Day
                    </span>
                    <span className="bg-white border border-slate-200 px-4 py-2 rounded-full shadow-sm">
                        International Day of Mathematics • March 14
                    </span>
                </div>

                {/* Main Heading */}
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                    Inspired by <span className="text-orange-500">Ramanujan's</span> Legacy
                </h2>

                {/* Quote Card */}
                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200 border border-slate-100 max-w-3xl mx-auto transform hover:scale-[1.01] transition-transform duration-500">
                    <blockquote className="space-y-6">
                        <p className="text-xl md:text-2xl font-serif italic text-slate-700 leading-relaxed">
                            "An equation for me has no meaning unless it expresses a thought of God."
                        </p>
                        <footer className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                            — Srinivasa Ramanujan
                        </footer>
                    </blockquote>
                </div>

                {/* Description Text */}
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                    On National Mathematics Day, we celebrate the genius of Srinivasa Ramanujan — a self-taught mathematician whose curiosity changed the world. This initiative honors his spirit by nurturing the next generation of curious minds.
                </p>

                {/* Footer Tagline */}
                <div className="flex items-center justify-center gap-2 text-slate-900 font-bold">
                    <Heart className="w-5 h-5 text-orange-500 fill-orange-500 animate-pulse" />
                    <span>Math is not just a subject. It's a life skill.</span>
                </div>

            </div>
        </section>
    );
};
