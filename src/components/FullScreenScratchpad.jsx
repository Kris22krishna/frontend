import React, { useRef, useState, useEffect } from 'react';
import { X, Eraser, Trash2, PenTool } from 'lucide-react';

export const FullScreenScratchpad = ({ onClose }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [tool, setTool] = useState('pen');
    const [color, setColor] = useState('#ef4444'); // Default red for visibility
    const [brushSize, setBrushSize] = useState(3);

    const colors = [
        { name: 'black', value: '#000000' },
        { name: 'red', value: '#ef4444' },
        { name: 'blue', value: '#3b82f6' },
        { name: 'green', value: '#10b981' },
        { name: 'yellow', value: '#eab308' }
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const resizeCanvas = () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
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
        const clientX = e.clientX || e.touches?.[0]?.clientX;
        const clientY = e.clientY || e.touches?.[0]?.clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
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
            ctx.lineWidth = brushSize;
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
        <div className="fixed inset-0 z-[100] touch-none">
            {/* Canvas Layer */}
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="absolute inset-0 w-full h-full cursor-crosshair"
                style={{ touchAction: 'none' }}
            />

            {/* Floating Toolbar */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gray-900/90 backdrop-blur-sm border border-gray-700 shadow-xl rounded-full px-4 py-2 flex items-center gap-3 safe-area-bottom">
                {/* Close */}
                <button onClick={onClose} className="p-2 bg-white/10 text-white rounded-full hover:bg-white/20">
                    <X size={20} />
                </button>

                <div className="w-px h-6 bg-gray-700" />

                {/* Colors */}
                <div className="flex items-center gap-1.5">
                    {colors.map(c => (
                        <button
                            key={c.name}
                            onClick={() => { setTool('pen'); setColor(c.value); }}
                            className={`w-6 h-6 rounded-full border-2 transition-all ${color === c.value && tool === 'pen' ? 'border-white scale-110' : 'border-transparent'}`}
                            style={{ backgroundColor: c.value }}
                        />
                    ))}
                </div>

                <div className="w-px h-6 bg-gray-700" />

                {/* Tools */}
                <button
                    onClick={() => setTool('eraser')}
                    className={`p-2 rounded-full transition-all ${tool === 'eraser' ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                >
                    <Eraser size={20} />
                </button>
                <button
                    onClick={clearCanvas}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-white/10 rounded-full transition-all"
                >
                    <Trash2 size={20} />
                </button>
            </div>

            {/* Top instruction hint */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-medium pointer-events-none">
                Draw anywhere • Close to interact
            </div>
        </div>
    );
};
