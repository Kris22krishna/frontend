import React, { useRef, useState, useEffect } from 'react';
import { PenTool, Eraser, Trash2, Edit3 } from 'lucide-react';

export function InlineScratchpad() {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [tool, setTool] = useState('pen');
    const [color, setColor] = useState('#1e1b4b'); // Dark blue/black

    const colors = [
        { name: 'black', value: '#1e1b4b' },
        { name: 'red', value: '#ef4444' },
        { name: 'blue', value: '#3b82f6' },
        { name: 'green', value: '#10b981' }
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const resizeCanvas = () => {
                const parent = canvas.parentElement;
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
                const ctx = canvas.getContext('2d');
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';
            };

            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            return () => window.removeEventListener('resize', resizeCanvas);
        }
    }, []);

    const getCoordinates = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
        const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
        return { x, y };
    };

    const startDrawing = (e) => {
        const { x, y } = getCoordinates(e);
        const ctx = canvasRef.current.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const { x, y } = getCoordinates(e);
        const ctx = canvasRef.current.getContext('2d');

        if (tool === 'eraser') {
            ctx.globalCompositeOperation = 'destination-out';
            ctx.lineWidth = 20;
        } else {
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
        }

        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <div className="flex flex-col h-full bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-[#8b5cf6] p-3 flex items-center gap-2 text-white">
                <Edit3 size={18} />
                <span className="font-bold text-sm tracking-widest uppercase">Scratchpad</span>
            </div>

            {/* Toolbar */}
            <div className="p-4 bg-gray-50/50 border-b border-gray-100 flex flex-col gap-4">
                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={() => setTool('pen')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${tool === 'pen' ? 'bg-[#8b5cf6] text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
                    >
                        <PenTool size={16} />
                        Pen
                    </button>
                    <button
                        onClick={() => setTool('eraser')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${tool === 'eraser' ? 'bg-[#8b5cf6] text-white shadow-md' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
                    >
                        <Eraser size={16} />
                        Eraser
                    </button>
                    <button
                        onClick={clearCanvas}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white text-red-500 border border-red-100 hover:bg-red-50 transition-all ml-auto"
                    >
                        <Trash2 size={16} />
                        Clear
                    </button>
                </div>

                {/* Color Palette */}
                <div className="flex items-center justify-center gap-3">
                    {colors.map((c) => (
                        <button
                            key={c.name}
                            onClick={() => { setTool('pen'); setColor(c.value); }}
                            className={`w-8 h-8 rounded-full border-2 transition-all ${color === c.value && tool === 'pen' ? 'border-gray-400 scale-110 shadow-sm' : 'border-transparent hover:scale-105'}`}
                            style={{ backgroundColor: c.value }}
                        />
                    ))}
                </div>
            </div>

            {/* Canvas Area with Grid Background */}
            <div className="flex-1 relative bg-white overflow-hidden" style={{
                backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }}>
                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full h-full cursor-crosshair touch-none"
                />
                <div className="absolute bottom-4 right-4 text-[10px] font-bold text-gray-300 uppercase pointer-events-none tracking-widest">
                    Work out your answer here
                </div>
            </div>
        </div>
    );
}
