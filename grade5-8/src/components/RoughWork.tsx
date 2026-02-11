import React, { useRef, useState, useEffect } from 'react';
import { X, Eraser, PenTool } from 'lucide-react';

interface RoughWorkProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'junior' | 'senior';
}

export function RoughWork({ isOpen, onClose, mode }: RoughWorkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Set canvas size to match window, or parent container
        canvas.width = window.innerWidth * 0.8;
        canvas.height = window.innerHeight * 0.8;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = mode === 'junior' ? '#4300FF' : '#31326F';
        ctx.lineWidth = 3;
      }
    }
  }, [isOpen, mode]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (tool === 'pen') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = mode === 'junior' ? '#4300FF' : '#31326F';
      ctx.lineWidth = 3;
    } else {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 20;
    }
    
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  if (!isOpen) return null;

  const bgClass = mode === 'junior' ? 'bg-white/95 backdrop-blur-sm' : 'bg-[#F8FAFC]/98';
  const borderClass = mode === 'junior' ? 'border-[#A8FBD3]' : 'border-[#637AB9]';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className={`relative w-[90vw] h-[85vh] ${bgClass} rounded-2xl shadow-2xl flex flex-col overflow-hidden border-2 ${borderClass}`}>
        
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${mode === 'junior' ? 'border-gray-100' : 'border-gray-200'}`}>
          <h3 className={`font-bold text-lg ${mode === 'junior' ? 'text-[#31326F]' : 'text-[#31326F]'}`}>Rough Work</h3>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setTool('pen')}
              className={`p-2 rounded-lg transition-colors ${tool === 'pen' ? 'bg-[#4FB7B3] text-white' : 'hover:bg-gray-100 text-gray-500'}`}
            >
              <PenTool size={20} />
            </button>
            <button 
              onClick={() => setTool('eraser')}
              className={`p-2 rounded-lg transition-colors ${tool === 'eraser' ? 'bg-[#4FB7B3] text-white' : 'hover:bg-gray-100 text-gray-500'}`}
            >
              <Eraser size={20} />
            </button>
            <button 
              onClick={clearCanvas}
              className="px-3 py-1.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg"
            >
              Clear All
            </button>
          </div>

          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <X size={24} />
          </button>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 relative cursor-crosshair bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]">
           <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="w-full h-full block touch-none"
          />
        </div>
      </div>
    </div>
  );
}
