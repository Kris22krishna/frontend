import React, { useState, useEffect } from 'react';
import { GeometryCanvasBox } from './PlayingWithConstructions8VirtualBox';

export function ConstructionInteractiveDraw({ q, isAnswered, draftAnswer, setDraftAnswer }) {
    // subType can be: 'draw-circle', 'draw-rectangle', 'draw-square'
    const subType = q.subType;

    const handleUpdateCoordinates = (dimensions) => {
        if (isAnswered) return;
        setDraftAnswer(dimensions);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '10px 0' }}>
            <GeometryCanvasBox onUpdateCoordinates={handleUpdateCoordinates} activeSubtype={subType} />
            
            {/* User helpful instruction text */}
            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
                💡 <strong>How to use the Geometry Box:</strong>
                <ul style={{ margin: 0, paddingLeft: 24, marginTop: 8 }}>
                    {subType === 'draw-circle' ? (
                        <li>Select the <strong>Compass Tool</strong>. Click and drag on the canvas to set the anchor and extend the radius to exactly <strong>{q.targetDimensions?.radius} cm</strong>. This will automatically draw your circle.</li>
                    ) : subType === 'draw-rectangle' ? (
                        <li>Select the <strong>Ruler Tool</strong>. Start by drawing a base line. Then use your <strong>Compass Tool</strong> to draw arcs and find the perpendicular points. Your cursor will <strong>magnetically snap</strong> to any arc intersections! Use this to construct a perfect <strong>{q.targetDimensions?.length} cm</strong> by <strong>{q.targetDimensions?.breadth} cm</strong> rectangle.</li>
                    ) : subType === 'draw-square' ? (
                        <li>Select the <strong>Ruler Tool</strong>. Start by drawing a base line. Then use your <strong>Compass Tool</strong> to draw arcs and find the perpendicular points. Your cursor will <strong>magnetically snap</strong> to any arc intersections! Use this to construct a perfect square with all sides <strong>{q.targetDimensions?.side} cm</strong>.</li>
                    ) : null}
                    <li>Made a mistake? Use the <strong>Undo / Redo</strong> buttons to trace back your steps.</li>
                </ul>
            </div>
        </div>
    );
}
