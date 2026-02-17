import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Calendar, MapPin, GraduationCap, Award, CheckCircle2, AlertCircle } from "lucide-react";
import { api } from '../../../services/api';

// Use absolute path from public folder to prevent Vite import analysis errors
const BANNER_URL = "/internship-banner.png";

const RegistrationModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        schoolName: '',
        preferredWeek: '',
        willAttend: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [phoneError, setPhoneError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.phoneNumber.length !== 10) {
            setPhoneError('Please enter a valid 10-digit phone number');
            return;
        }

        setStatus('loading');
        setPhoneError('');

        const dataToSubmit = {
            ...formData,
            phoneNumber: `+91 ${formData.phoneNumber}`
        };

        try {
            await api.submitInternshipRegistration(dataToSubmit);
            setStatus('success');
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phoneNumber') {
            // Only allow digits and max 10 characters
            const cleaned = value.replace(/\D/g, '').slice(0, 10);
            setFormData({ ...formData, [name]: cleaned });
            if (cleaned.length === 10) setPhoneError('');
            return;
        }

        setFormData({ ...formData, [name]: value });
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900 z-10">
                        <div>
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <span className="text-orange-500">🔥</span> Exclusive Opportunity
                            </h2>
                            <p className="text-slate-400 text-sm">Summer Internship Program 2026</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-0 space-y-8">
                        {status === 'success' ? (
                            <div className="text-center py-8 px-6 space-y-6">
                                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                                    <CheckCircle2 size={48} className="text-green-500" />
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-white">Registration Submitted!</h3>
                                    <p className="text-slate-400">Your details have been recorded successfully.</p>
                                </div>

                                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 space-y-6">
                                    <div className="space-y-2">
                                        <h4 className="text-orange-400 font-bold text-lg uppercase tracking-tight">Final Step: Complete Your Registration</h4>
                                        <p className="text-slate-300 text-sm">Please pay the registration fee of <span className="text-white font-bold">₹100</span> to confirm your seat.</p>
                                    </div>

                                    {/* QR Code */}
                                    <div className="bg-white p-4 rounded-xl inline-block shadow-lg mx-auto">
                                        <img
                                            src="/QRcode.png"
                                            alt="Payment QR Code"
                                            className="w-48 h-48 object-contain"
                                            onError={(e) => {
                                                e.target.src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=9632402004@upi&pn=Skill100.ai&am=100&cu=INR";
                                            }}
                                        />
                                    </div>

                                    <div className="space-y-4 text-left">
                                        <div className="flex gap-3 items-start p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                            <div className="bg-blue-500 rounded-full p-1 mt-0.5 shrink-0 text-white font-bold text-[10px] w-5 h-5 flex items-center justify-center">1</div>
                                            <p className="text-slate-200 text-sm">Scan the QR code above and pay <span className="text-white font-bold">₹100</span>.</p>
                                        </div>
                                        <div className="flex gap-3 items-start p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                            <div className="bg-blue-500 rounded-full p-1 mt-0.5 shrink-0 text-white font-bold text-[10px] w-5 h-5 flex items-center justify-center">2</div>
                                            <p className="text-slate-200 text-sm">Share the <span className="text-white font-bold">payment screenshot</span> on WhatsApp to <a href="https://wa.me/919632402004" target="_blank" rel="noreferrer" className="text-blue-400 underline font-semibold">+91 9632402004</a>.</p>
                                        </div>
                                        <div className="flex gap-3 items-start p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                            <div className="bg-blue-500 rounded-full p-1 mt-0.5 shrink-0 text-white font-bold text-[10px] w-5 h-5 flex items-center justify-center">3</div>
                                            <p className="text-slate-200 text-sm">Or call <a href="tel:+919632402004" className="text-blue-400 font-semibold underline">+91 9632402004</a> to confirm your registration.</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold transition-all border border-slate-700"
                                >
                                    Close Window
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* Promotional Content */}
                                <div className="w-full overflow-hidden bg-slate-950">
                                    <img
                                        src={BANNER_URL}
                                        alt="Skill100.ai Summer Internship 2026 Banner"
                                        className="w-full h-auto object-cover"
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                </div>

                                <div className="p-6 pt-2 space-y-8">
                                    <div className="space-y-6">
                                        <div className="bg-blue-600/10 border border-blue-500/20 p-6 rounded-xl">
                                            <h3 className="text-lg font-semibold text-white mb-2 italic">Not just a summer activity.</h3>
                                            <p className="text-blue-200/80 leading-relaxed font-medium">✨ Where clarity begins.</p>
                                            <p className="mt-4 text-slate-300 leading-relaxed font-normal">
                                                The 1–3 Week Internship at <span className="text-white font-semibold">Skill100.ai</span> is built for ambitious 10th grade students who want more than marks. Gain real-world skills, structured thinking, confidence, and practical exposure beyond school.
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-4">
                                                <h4 className="text-white font-bold flex items-center gap-2 text-lg">
                                                    🌟 What You’ll Experience
                                                </h4>
                                                <ul className="space-y-3">
                                                    <li className="flex items-start gap-3 text-slate-300">
                                                        <span className="text-xl">🤖</span>
                                                        <span><strong className="text-white">AI & Tech</strong> – Learn Artificial Intelligence in a simple, practical way.</span>
                                                    </li>
                                                    <li className="flex items-start gap-3 text-slate-300">
                                                        <span className="text-xl">🎤</span>
                                                        <span><strong className="text-white">Communication Skills</strong> – Build confidence, public speaking & leadership.</span>
                                                    </li>
                                                    <li className="flex items-start gap-3 text-slate-300">
                                                        <span className="text-xl">🧠</span>
                                                        <span><strong className="text-white">Math Problem Solving</strong> – Think clearly using logic and patterns.</span>
                                                    </li>
                                                    <li className="flex items-start gap-3 text-slate-300">
                                                        <span className="text-xl">⚙️</span>
                                                        <span><strong className="text-white">Robotics Exposure</strong> – Discover innovation beyond textbooks.</span>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="space-y-4">
                                                <h4 className="text-white font-bold flex items-center gap-2 text-lg">
                                                    📌 Details
                                                </h4>
                                                <div className="bg-slate-800/50 rounded-xl p-4 space-y-3">
                                                    <div className="flex items-center gap-3 text-slate-300">
                                                        <Calendar size={18} className="text-blue-400" />
                                                        <span>1–3 Weeks</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-slate-300">
                                                        <MapPin size={18} className="text-blue-400" />
                                                        <span>Nesara Tech Park, Mysuru (Offline)</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-slate-300">
                                                        <GraduationCap size={18} className="text-blue-400" />
                                                        <span>For 10th Standard students</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-slate-300">
                                                        <Award size={18} className="text-blue-400" />
                                                        <span>Certificate Provided</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-px bg-slate-800" />

                                    {/* Form */}
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-300">Full Name *</label>
                                                <input
                                                    required
                                                    type="text"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleChange}
                                                    placeholder="Enter your full name"
                                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-500"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-300">Email ID *</label>
                                                <input
                                                    required
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="Enter your email ID"
                                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-300">Phone Number *</label>
                                                <div className="relative flex items-center">
                                                    <div className="absolute left-3 text-slate-400 font-medium border-r border-slate-700 pr-3 h-5 flex items-center">
                                                        +91
                                                    </div>
                                                    <input
                                                        required
                                                        type="tel"
                                                        name="phoneNumber"
                                                        value={formData.phoneNumber}
                                                        onChange={handleChange}
                                                        placeholder="Enter 10 digits"
                                                        className={`w-full bg-slate-800 border ${phoneError ? 'border-red-500' : 'border-slate-700'} rounded-lg pl-14 pr-4 py-2.5 text-white focus:outline-none focus:ring-2 ${phoneError ? 'focus:ring-red-500/50' : 'focus:ring-blue-500/50'} transition-all placeholder:text-slate-500`}
                                                    />
                                                </div>
                                                {phoneError && (
                                                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                                                        <AlertCircle size={10} /> {phoneError}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-slate-300">Name of School *</label>
                                                <input
                                                    required
                                                    type="text"
                                                    name="schoolName"
                                                    value={formData.schoolName}
                                                    onChange={handleChange}
                                                    placeholder="School name"
                                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-sm font-medium text-slate-300 block">Select the preferred week *</label>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {[
                                                    { id: 'week1', label: '1st week (09th Mar to 14th Mar)' },
                                                    { id: 'week2', label: '2nd week (16th Mar to 21st Mar)' },
                                                    { id: 'week3', label: '3rd week' },
                                                    { id: 'none', label: 'Not attending' }
                                                ].map((option) => (
                                                    <label key={option.id} className="flex items-center gap-3 p-3 bg-slate-800/50 border border-slate-700 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors">
                                                        <input
                                                            type="radio"
                                                            name="preferredWeek"
                                                            required
                                                            value={option.label}
                                                            onChange={handleChange}
                                                            className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 focus:ring-blue-500"
                                                        />
                                                        <span className="text-sm text-slate-300">{option.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-sm font-medium text-slate-300 block">Will you attend the Summer Internship Program? *</label>
                                            <div className="flex gap-4">
                                                {[
                                                    { id: 'yes', label: 'Yes, I will attend' },
                                                    { id: 'no', label: 'No, I won\'t be able to attend' }
                                                ].map((option) => (
                                                    <label key={option.id} className="flex-1 flex items-center justify-center gap-3 p-3 bg-slate-800/50 border border-slate-700 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors text-center">
                                                        <input
                                                            type="radio"
                                                            name="willAttend"
                                                            required
                                                            value={option.label}
                                                            onChange={handleChange}
                                                            className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 focus:ring-blue-500"
                                                        />
                                                        <span className="text-sm text-slate-300">{option.label}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-4 sticky bottom-0 bg-slate-900 border-t border-slate-800 -mx-6 px-6 pb-6">
                                            {status === 'error' && (
                                                <p className="text-red-400 text-sm mb-4 flex items-center gap-2">
                                                    <AlertCircle size={14} /> Something went wrong. Please try again or contact us.
                                                </p>
                                            )}
                                            <button
                                                type="submit"
                                                disabled={status === 'loading'}
                                                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                                            >
                                                {status === 'loading' ? (
                                                    <>
                                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                        Processing...
                                                    </>
                                                ) : (
                                                    <>
                                                        Submit Registration
                                                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                    </>
                                                )}
                                            </button>
                                            <p className="text-slate-500 text-xs text-center mt-4">
                                                By submitting, you agree to being contacted regarding the Summer Internship Program.
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default RegistrationModal;
