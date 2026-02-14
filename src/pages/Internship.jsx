import React from 'react';
import { motion } from 'framer-motion';

const Internship = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white font-sans selection:bg-blue-500 selection:text-white overflow-hidden">

            {/* Navbar Placeholder - assuming a global nav exists but if not, this serves as a header */}
            <nav className="fixed w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-xl">I</div>
                            <span className="font-bold text-xl tracking-tight">Internship Program</span>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <a href="/" className="hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
                                <a href="#about" className="hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
                                <a href="#roles" className="hover:bg-white/10 px-3 py-2 rounded-md text-sm font-medium transition-colors">Roles</a>
                                <a href="#apply" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-lg shadow-blue-600/20">Apply Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">

                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] -z-10" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-8"
                >
                    <span className="text-blue-300 text-sm font-medium tracking-wide uppercase">Now Hiring for Summer 2026</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-200"
                >
                    Shape the Future <br className="hidden md:block" /> with Us.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed"
                >
                    Join a team of visionaries and builders. Our internship program is designed to launch your career with real-world impact, mentorship, and cutting-edge technology.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                >
                    <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg shadow-xl shadow-blue-600/20 transition-all hover:scale-105 active:scale-95">
                        View Open Positions
                    </button>
                    <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-lg font-bold text-lg backdrop-blur-sm transition-all hover:border-white/20">
                        Learn More
                    </button>
                </motion.div>

            </section>

            {/* Features Grid */}
            <section className="py-20 bg-slate-800/50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Join Us?</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">We don't just offer a desk. We offer a launchpad.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Mentorship", desc: "Work directly with industry leaders who are invested in your growth.", icon: "🚀" },
                            { title: "Real Impact", desc: "Ship code, design products, and make decisions that affect real users.", icon: "💎" },
                            { title: "Modern Stack", desc: "Get hands-on experience with the latest technologies and frameworks.", icon: "⚡" },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.2 }}
                                className="bg-slate-900 border border-white/5 p-8 rounded-2xl hover:border-blue-500/30 transition-colors group"
                            >
                                <div className="text-4xl mb-6 bg-slate-800 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/20">{item.icon}</div>
                                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/5" />
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl font-bold mb-6">Ready to start your journey?</h2>
                    <p className="text-xl text-slate-300 mb-10">Applications are reviewed on a rolling basis. Don't miss your chance.</p>
                    <button className="px-10 py-5 bg-white text-blue-900 rounded-full font-bold text-xl shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all">
                        Apply Now
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-950 py-12 border-t border-white/5">
                <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Internship Program. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Internship;
