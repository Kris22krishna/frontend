import React from 'react';
import { motion } from "framer-motion";
import { MapPin, Phone, Instagram, Linkedin, GraduationCap, IndianRupee, Users, Shield } from "lucide-react";

const DetailsSection = () => {
    return (
        <section className="py-24 bg-slate-950 relative" id="details">
            <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Left: Who, Exclusivity, Certificate */}
                    <div className="space-y-8">
                        {/* Exclusive */}
                        <motion.div
                            className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-xl hover:border-blue-500/30 transition-all"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="w-6 h-6 text-orange-400" />
                                <h3 className="text-xl font-bold text-white">Exclusive for 10th Grade</h3>
                            </div>
                            <p className="text-slate-400 mb-4">
                                Content is age-appropriate, engaging, and easy to understand. Limited to maintain quality learning.
                            </p>
                            <div className="flex items-center gap-3 p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                                <Users className="w-5 h-5 text-orange-400" />
                                <span className="text-white font-semibold">Only 30 seats — first come, first served</span>
                            </div>
                        </motion.div>

                        {/* Certificate */}
                        <motion.div
                            className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-xl hover:border-blue-500/30 transition-all"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <GraduationCap className="w-6 h-6 text-blue-400" />
                                <h3 className="text-xl font-bold text-white">Certificate & Scholarships</h3>
                            </div>
                            <ul className="space-y-2 text-slate-400">
                                <li className="flex gap-2"><span className="text-blue-400">✓</span> Completion certificate upon finishing</li>
                                <li className="flex gap-2"><span className="text-blue-400">✓</span> Eligibility for scholarship opportunities</li>
                                <li className="flex gap-2"><span className="text-blue-400">✓</span> Strengthen academic & career applications</li>
                            </ul>
                        </motion.div>

                        {/* Fee */}
                        <motion.div
                            className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-xl hover:border-blue-500/30 transition-all"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="flex items-center gap-3 mb-3">
                                <IndianRupee className="w-6 h-6 text-orange-400" />
                                <h3 className="text-xl font-bold text-white">Registration Fee</h3>
                            </div>
                            <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400 mb-2">₹100</p>
                            <p className="text-slate-400 text-sm">
                                Accessible to all backgrounds. Exceptional value for industry exposure, skill development, and career clarity.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right: Venue, Contact, Who Should Apply */}
                    <div className="space-y-8">
                        {/* Venue */}
                        <motion.div
                            className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-xl hover:border-blue-500/30 transition-all"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <MapPin className="w-6 h-6 text-blue-400" />
                                        <h3 className="text-xl font-bold text-white">Venue</h3>
                                    </div>
                                    <p className="text-white font-medium mb-1">Learners Digital Skill Hub</p>
                                    <p className="text-slate-400 text-sm">Nesara Tech Park, Hebbal Industrial Area, Mysuru</p>
                                    <p className="text-slate-400 text-sm mt-3">
                                        A professional space designed to inspire creativity, innovation, and collaboration.
                                    </p>
                                </div>
                                <div className="flex-1 h-48 md:h-auto rounded-xl overflow-hidden border border-slate-700 shadow-inner">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Nesara%20Tech%20Park,%20Hebbal%20Industrial%20Area,%20Mysuru+(Learners%20Digital)&t=&z=15&ie=UTF8&iwloc=B&output=embed"
                                        title="Learners Digital Location"
                                        frameBorder="0"
                                        scrolling="no"
                                        marginHeight="0"
                                        marginWidth="0"
                                        loading="lazy"
                                        sandbox="allow-scripts allow-same-origin"
                                        className="grayscale hover:grayscale-0 transition-all duration-500 w-full h-full object-cover"
                                    >
                                    </iframe>
                                </div>
                            </div>
                        </motion.div>

                        {/* Who Should Apply */}
                        <motion.div
                            className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-xl hover:border-blue-500/30 transition-all"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <h3 className="text-xl font-bold text-white mb-4">Who Should Apply?</h3>
                            <ul className="space-y-2 text-slate-400 text-sm">
                                <li className="flex gap-2"><span className="text-orange-400">★</span> Curious about technology and the future</li>
                                <li className="flex gap-2"><span className="text-orange-400">★</span> Want to explore AI, robotics, or new careers</li>
                                <li className="flex gap-2"><span className="text-orange-400">★</span> Want to build confidence & communication</li>
                                <li className="flex gap-2"><span className="text-orange-400">★</span> Want to use summer productively</li>
                                <li className="flex gap-2"><span className="text-orange-400">★</span> Want to stay ahead of peers</li>
                            </ul>
                            <p className="text-blue-400 text-sm mt-4 font-medium">
                                No prior technical knowledge required — just curiosity!
                            </p>
                        </motion.div>

                        {/* Contact */}
                        <motion.div
                            className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-2xl p-8 shadow-xl hover:border-blue-500/30 transition-all"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <h3 className="text-xl font-bold text-white mb-4">Get in Touch</h3>
                            <div className="space-y-3">
                                <a href="tel:+919632402004" className="flex items-center gap-3 text-slate-400 hover:text-blue-400 transition-colors">
                                    <Phone className="w-5 h-5" /> <span>+91 9632402004</span>
                                </a>
                                <a href="https://instagram.com/skill100.ai" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-blue-400 transition-colors">
                                    <Instagram className="w-5 h-5" /> <span>skill100.ai</span>
                                </a>
                                <a href="https://linkedin.com/company/learners-digital" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-blue-400 transition-colors">
                                    <Linkedin className="w-5 h-5" /> <span>Learners Digital</span>
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DetailsSection;
