import React, { useEffect, useRef } from 'react';
import 'katex/dist/katex.min.css';
import renderMathInElement from 'katex/dist/contrib/auto-render.mjs';

const LatexContent = ({ html, className, block = false }) => {
    const containerRef = useRef(null);

    // Smart processing: If no LaTeX delimiters are found, auto-convert "num/den" fractions
    const processHtml = (raw) => {
        if (!raw) return '';
        let processed = String(raw);

        // Check for existing delimiters ($$, \[, \()
        const hasDelimiters = processed.includes('$$') || processed.includes('\\[') || processed.includes('\\(');

        if (!hasDelimiters) {
            // Auto-convert standard fractions like "9/15" -> "\( \frac{9}{15} \)"
            // Use INLINE delimiters so they wrap properly with text
            processed = processed.replace(/\b(\d+)\s*\/\s*(\d+)\b/g, '\\( \\frac{$1}{$2} \\)');
        }
        return processed;
    };

    const finalHtml = processHtml(html);

    useEffect(() => {
        if (containerRef.current) {
            // Manual DOM update to prevent React from overwriting KaTeX changes on re-renders
            containerRef.current.innerHTML = finalHtml || '';

            try {
                renderMathInElement(containerRef.current, {
                    delimiters: [
                        { left: '$$', right: '$$', display: true },
                        { left: '\\[', right: '\\]', display: true },
                        { left: '\\(', right: '\\)', display: false },
                        { left: '$', right: '$', display: false },
                    ],
                    throwOnError: false
                });
            } catch (e) {
                console.error("KaTeX rendering error:", e);
            }
        }
    }, [finalHtml]);

    const Tag = block ? 'div' : 'span';

    // Render an empty container. useEffect will populate it.
    // This avoids dangerouslySetInnerHTML race conditions.
    return (
        <Tag
            ref={containerRef}
            className={className}
        />
    );
};

export default React.memo(LatexContent);
