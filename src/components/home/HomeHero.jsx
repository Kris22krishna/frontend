import React from 'react';
import { motion } from 'framer-motion';
import { DesktopHeroIllustration } from './DesktopHeroIllustration';
import { MobileHeroIllustration } from './MobileHeroIllustration';

export function HomeHero() {
    return (
        <section className="relative bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 py-24 px-8 overflow-hidden">
            {/* Background Park Illustration - Desktop Only */}
            <DesktopHeroIllustration />

            {/* Mobile Background - Floating Educational Elements */}
            <MobileHeroIllustration />

            {/* Hero Content */}
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {/* Main Headline */}
                <div className="flex items-center justify-center gap-3 mb-6">
                    <h1 className="text-4xl md:text-[64px] text-[#000000] font-[Chilanka,sans-serif] leading-tight">
                        Go Beyond <span className="text-blue-800 italic font-bold">100</span>
                    </h1>
                </div>

                {/* Subheading */}
                <p className="text-base md:text-xl text-gray-600 mb-8">
                    With personalized, expert-led guidance<br />
                    at every grade
                </p>
            </div>
        </section>
    );
}
