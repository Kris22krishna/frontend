import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, UploadCloud, FileText, CheckCircle, Upload, AlertTriangle, FileSpreadsheet, Loader2 } from 'lucide-react';
import { api } from '../../services/api';

const AssessmentUploaderDashboard = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState(null); // { type: 'success' | 'error', text: string }
    const [students, setStudents] = useState([]);
    const [loadingStudents, setLoadingStudents] = useState(true);

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        if (!email) {
            navigate('/assessment-uploader-login');
        } else {
            setUserEmail(email);
            fetchStudents();
        }
    }, [navigate]);

    const fetchStudents = async () => {
        setLoadingStudents(true);
        try {
            const data = await api.getUploadedStudents();
            setStudents(data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingStudents(false);
        }
    };

    const handleLogout = () => {
        api.logout();
        navigate('/assessment-uploader-login');
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setMessage(null);

        try {
            const result = await api.uploadStudents(file);
            if (result && result.uploaded_count !== undefined) {
                setMessage({
                    type: 'success',
                    text: `Successfully uploaded ${result.uploaded_count} students.` + (result.errors?.length ? ` ${result.errors.length} errors occurred (duplicates skipped).` : '')
                });
                fetchStudents();
            } else {
                setMessage({ type: 'error', text: 'Upload failed.' });
            }
        } catch (err) {
            setMessage({ type: 'error', text: err.message || 'Upload failed.' });
        } finally {
            setUploading(false);
            e.target.value = null; // Reset input
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            {/* Header */}
            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center gap-3">
                            <UploadCloud className="h-8 w-8 text-blue-600" />
                            <h1 className="text-xl font-bold text-gray-900">Assessment Portal</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">{userEmail}</span>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                            >
                                <LogOut className="h-4 w-4" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

                {/* Upload Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                            <FileSpreadsheet className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Upload Student Data</h2>
                            <p className="text-gray-500">Upload Excel (.xlsx) file with student details.</p>
                        </div>
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors relative">
                        <input
                            type="file"
                            accept=".xlsx"
                            onChange={handleFileUpload}
                            disabled={uploading}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                        />
                        <div className="pointer-events-none">
                            {uploading ? (
                                <Loader2 className="h-10 w-10 text-blue-600 animate-spin mx-auto mb-3" />
                            ) : (
                                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                            )}
                            <p className="text-sm font-medium text-gray-900">
                                {uploading ? 'Processing file...' : 'Click to upload or drag and drop'}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">.xlsx files only</p>
                        </div>
                    </div>

                    {message && (
                        <div className={`mt-4 p-4 rounded-lg flex items-start gap-3 ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                            {message.type === 'success' ? <CheckCircle className="h-5 w-5 shrink-0" /> : <AlertTriangle className="h-5 w-5 shrink-0" />}
                            <p className="text-sm">{message.text}</p>
                        </div>
                    )}
                </div>

                {/* Students List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-900">Uploaded Students</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-50 text-gray-500 font-medium">
                                <tr>
                                    <th className="px-6 py-3">Serial Number</th>
                                    <th className="px-6 py-3">Name</th>
                                    <th className="px-6 py-3">Grade</th>
                                    <th className="px-6 py-3">School</th>
                                    <th className="px-6 py-3">Phone</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loadingStudents ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500">Loading...</td>
                                    </tr>
                                ) : students.length > 0 ? (
                                    students.map((student) => (
                                        <tr key={student.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 font-mono text-blue-600 font-medium">{student.serial_number}</td>
                                            <td className="px-6 py-4 text-gray-900 font-medium">{student.name}</td>
                                            <td className="px-6 py-4 text-gray-600">{student.grade}</td>
                                            <td className="px-6 py-4 text-gray-600">{student.school_name}</td>
                                            <td className="px-6 py-4 text-gray-600">{student.phone_number || '-'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No students uploaded yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AssessmentUploaderDashboard;
