import React from 'react';
import { motion } from 'framer-motion';

export function HomeStats() {


    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                <div className="absolute top-10 left-10 text-6xl text-blue-500 rotate-12">+</div>
                <div className="absolute bottom-20 right-20 text-5xl text-teal-500 -rotate-12">÷</div>
                <div className="absolute top-1/2 left-1/4 text-4xl text-purple-500 rotate-45">×</div>
                <div className="absolute top-1/3 right-1/4 text-5xl text-orange-500 rotate-12">√</div>
            </div>

            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <div className="flex flex-col items-center justify-center text-center">
                    {/* Text Content */}
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-block px-4 py-1.5 rounded-full bg-teal-50 text-teal-600 font-bold tracking-wide text-xs uppercase mb-6"
                        >
                            Why Choose skill100?
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                            Master Mathematics with <br />
                            <span className="text-teal-500">Confidence</span>
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                            Our platform provides a comprehensive learning journey from primary to senior high school,
                            ensuring every student reaches their full potential with personalized practice.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeStats;
