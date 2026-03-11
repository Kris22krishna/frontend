import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ViolationWarning = ({
    show,
    violationCount,
    maxViolations,
    message,
    onDismiss
}) => {
    if (!show) return null;

    const isLastWarning = violationCount >= maxViolations - 1;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl border border-red-100 transform inline-block text-center shadow-red-500/10">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-10 h-10 text-red-500" />
                </div>

                <h2 className="text-2xl font-black text-slate-800 mb-2">
                    Warning!
                </h2>

                <p className="text-slate-600 mb-6 font-medium leading-relaxed">
                    {message}
                </p>

                <div className="bg-red-50 rounded-2xl p-4 mb-8">
                    <p className="text-red-600 font-bold">
                        Violation {violationCount} of {maxViolations}
                    </p>
                    <p className="text-sm text-red-500/80 mt-1 font-medium">
                        {isLastWarning
                            ? "One more violation and your test will be auto-submitted!"
                            : "Please do not switch tabs or exit fullscreen."}
                    </p>
                </div>

                <button
                    onClick={onDismiss}
                    className="w-full py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-200 active:scale-95"
                >
                    I Understand, Return to Test
                </button>
            </div>
        </div>
    );
};

export default ViolationWarning;
