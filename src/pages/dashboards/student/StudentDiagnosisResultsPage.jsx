import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import { Loader2, BookOpen, Trophy, Clock, Target, CheckCircle2, XCircle, ArrowLeft, Activity } from 'lucide-react';
import { api } from '../../../services/api';
import MathRenderer from '../../../components/MathRenderer';

const StudentDiagnosisResultsPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [selectedTest, setSelectedTest] = useState(null);

    useEffect(() => {
        fetchMyResults();
    }, []);

    const fetchMyResults = async () => {
        try {
            setLoading(true);
            setError(null);
            // We use the new API method to fetch the student's own diagnosis results
            const data = await api.getStudentDiagnosisResults(50);
            setResults(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Failed to fetch diagnosis results:', err);
            // Default to empty array if endpoint is not fully implemented or fails
            setResults([]);
            setError(err.message || 'Failed to load diagnosis results');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return 'N/A';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
            ' ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const formatTime = (seconds) => {
        if (!seconds && seconds !== 0) return 'N/A';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        if (mins === 0) return `${secs}s`;
        return `${mins}m ${secs}s`;
    };

    const getScoreColor = (score, total) => {
        if (!total) return 'text-slate-700 bg-slate-100';
        const percentage = (score / total) * 100;
        if (percentage >= 80) return 'text-emerald-700 bg-emerald-100 border-emerald-200';
        if (percentage >= 60) return 'text-amber-700 bg-amber-100 border-amber-200';
        if (percentage >= 40) return 'text-orange-700 bg-orange-100 border-orange-200';
        return 'text-rose-700 bg-rose-100 border-rose-200';
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Navbar />
                <div className="flex items-center justify-center min-h-[80vh]">
                    <div className="text-center">
                        <Loader2 className="h-12 w-12 animate-spin text-emerald-500 mx-auto mb-4" />
                        <p className="text-slate-500">Loading your diagnosis results...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            
            <div className="container mx-auto px-4 pt-28 pb-12 max-w-5xl">
                {/* Header Section */}
                <div className="flex items-center gap-4 mb-8">
                    <button 
                        onClick={() => navigate('/student-dashboard')}
                        className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-600"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                            <Activity className="text-emerald-500" />
                            Skill Discovery
                        </h1>
                        <p className="text-slate-500 mt-1">Review your past Skill Discovery tests and track your improvement.</p>
                    </div>
                </div>

                {error && results.length === 0 && (
                    <div className="bg-amber-50 border border-amber-200 text-amber-700 p-4 rounded-xl mb-8 flex items-start gap-3">
                        <Activity className="flex-shrink-0 mt-0.5" size={20} />
                        <div>
                            <p className="font-semibold">Unable to load results</p>
                            <p className="text-sm opacity-90">We hit an issue fetching your diagnosis test history. Please try again later.</p>
                        </div>
                    </div>
                )}

                {/* Results Grid */}
                <div className="space-y-4">
                    {results.length === 0 && !error ? (
                        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
                            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
                                <Activity size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">No Diagnosis Tests Yet</h3>
                            <p className="text-slate-500 mb-6 max-w-md mx-auto">
                                You haven't taken any diagnosis tests. A diagnosis test helps evaluate your current understanding and provides personalized recommendations.
                            </p>
                            <button
                                onClick={() => navigate('/diagnosis-test')}
                                className="px-6 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors shadow-sm"
                            >
                                Take a Diagnosis Test
                            </button>
                        </div>
                    ) : (
                        results.map((r, idx) => (
                            <div key={r.id || idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex items-center gap-5">
                                        <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex flex-col items-center justify-center flex-shrink-0 shadow-sm">
                                            <span className="text-2xl font-bold text-slate-700">{r.score || 0}</span>
                                            <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Score</span>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-lg font-bold text-slate-800">
                                                    Diagnosis Assessment
                                                </h3>
                                                <span className="px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                                                    Grade {r.grade}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-slate-500 font-medium">
                                                <span className="flex items-center gap-1.5">
                                                    <Clock size={16} className="text-slate-400" />
                                                    {formatDate(r.created_at || new Date().toISOString())}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-wrap items-center gap-4">
                                        <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                                            <span className="block text-xs text-slate-400 uppercase font-bold tracking-wider mb-0.5">Time Taken</span>
                                            <span className="font-semibold text-slate-700">{formatTime(r.time_taken_seconds || 0)}</span>
                                        </div>
                                        <div className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                                            <span className="block text-xs text-slate-400 uppercase font-bold tracking-wider mb-0.5">Questions</span>
                                            <span className="font-semibold text-slate-700">{r.total_questions || 0} Total</span>
                                        </div>
                                        <div className={`px-4 py-2 rounded-xl border ${getScoreColor(r.score, r.total_questions)}`}>
                                            <span className="block text-xs uppercase font-bold tracking-wider mb-0.5 opacity-80">Accuracy</span>
                                            <span className="font-bold text-lg leading-none">
                                                {r.total_questions ? Math.round((r.score / r.total_questions) * 100) : 0}%
                                            </span>
                                        </div>
                                        
                                        <button 
                                            onClick={() => setSelectedTest(r)}
                                            className="px-5 py-2.5 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors shadow-sm ml-2"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Test Details Modal */}
            {selectedTest && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white relative z-10">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">Test Performance</h2>
                                <p className="text-slate-500 font-medium">Grade {selectedTest.grade} Diagnosis • {formatDate(selectedTest.created_at)}</p>
                            </div>
                            <button
                                onClick={() => setSelectedTest(null)}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                            >
                                <XCircle size={24} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
                                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                    <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center mb-3">
                                        <BookOpen size={20} />
                                    </div>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Grade</p>
                                    <p className="text-2xl font-bold text-slate-800">{selectedTest.grade}</p>
                                </div>
                                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                    <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-3">
                                        <CheckCircle2 size={20} />
                                    </div>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Correct</p>
                                    <p className="text-2xl font-bold text-slate-800">{selectedTest.total_correct || selectedTest.score || 0}</p>
                                </div>
                                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                    <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mb-3">
                                        <XCircle size={20} />
                                    </div>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Incorrect</p>
                                    <p className="text-2xl font-bold text-slate-800">{selectedTest.total_wrong || (selectedTest.total_questions - selectedTest.score) || 0}</p>
                                </div>
                                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-3">
                                        <Target size={20} />
                                    </div>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Accuracy</p>
                                    <p className="text-2xl font-bold text-slate-800">
                                        {selectedTest.total_questions ? Math.round((selectedTest.score / selectedTest.total_questions) * 100) : 0}%
                                    </p>
                                </div>
                                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                    <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center mb-3">
                                        <Clock size={20} />
                                    </div>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Time Spent</p>
                                    <p className="text-xl font-bold text-slate-800">{formatTime(selectedTest.time_taken_seconds || 0)}</p>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-slate-800 mb-4 px-1">Detailed Analysis</h3>
                            <div className="space-y-3">
                                {selectedTest.results && Array.isArray(selectedTest.results) && selectedTest.results.length > 0 ? (
                                    selectedTest.results.map((q, i) => (
                                        <div key={i} className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm flex items-start gap-4">
                                            <div className={`mt-0.5 p-1.5 rounded-full ${q.isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                                                {q.isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm text-slate-800 font-medium mb-3 leading-relaxed">
                                                    <MathRenderer text={q.question} />
                                                </div>
                                                <div className="flex flex-wrap gap-4 text-sm bg-slate-50 p-3 rounded-xl border border-slate-100">
                                                    <div>
                                                        <span className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1 block">Your Answer</span>
                                                        <span className={`font-semibold ${q.isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                                                            {q.userAnswer ? <MathRenderer text={q.userAnswer.toString()} /> : 'Skipped'}
                                                        </span>
                                                    </div>
                                                    {!q.isCorrect && (
                                                        <div>
                                                            <span className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1 block">Correct Answer</span>
                                                            <span className="text-emerald-600 font-semibold">
                                                                <MathRenderer text={q.correctAnswer?.toString() || ''} />
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center shadow-sm">
                                        <p className="text-slate-500 font-medium">Detailed question breakdown is not available for this legacy test.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-5 border-t border-slate-100 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-10">
                            <button
                                onClick={() => setSelectedTest(null)}
                                className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors shadow-sm"
                            >
                                Close Details
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentDiagnosisResultsPage;
