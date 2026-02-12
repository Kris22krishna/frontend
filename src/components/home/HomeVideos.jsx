import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

const videos = [
    { id: 'BnYiNL81S-s', title: 'Launch of Math Skill Builder' },
    { id: 'L7N1qvWvfr4', title: 'International Day of Mathematics' },
    { id: 'xGqJyf-2_zM', title: 'World Youth Skills Day' },
    { id: 'emvYAmEucto', title: 'National Mathematics Day | Parent Feedback' },
    { id: 'cyCV-yt42TA', title: 'National Mathematics Day | Student Feedback' },
    { id: 'lWUhVm7Yukk', title: 'National Mathematics Day | Parent Feedback' },
];

export const HomeVideos = () => {
    const [activeVideo, setActiveVideo] = useState(null);

    return (
        <section className="pb-20 pt-10 bg-white">
            <div className="max-w-6xl mx-auto px-4 space-y-12">
                <div className="text-center space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                        Our <span className="text-blue-600">Journey</span>
                    </h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Highlights from our events and community feedback.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                    {videos.map((video) => (
                        <div key={video.id} className="group space-y-3 cursor-pointer max-w-xs w-full" onClick={() => setActiveVideo(video.id)}>
                            {/* Thumbnail Container */}
                            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                                <img
                                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                                    alt={video.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                        <Play className="w-5 h-5 text-blue-600 ml-1" fill="currentColor" />
                                    </div>
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-sm font-bold text-slate-900 leading-relaxed text-center group-hover:text-blue-600 transition-colors">
                                {video.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* Video Modal */}
            {activeVideo && (
                <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setActiveVideo(null)}>
                    <div className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setActiveVideo(null)}
                            className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <iframe
                            src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
                            title="YouTube video player"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </section>
    );
};
