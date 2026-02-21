import React, { useEffect, useRef } from 'react';
import 'katex/dist/katex.min.css';
import renderMathInElement from 'katex/dist/contrib/auto-render';

const LatexContent = ({ html, className, block = false }) => {
    const containerRef = useRef(null);

    // Smart processing: If no LaTeX delimiters are found, auto-convert "num/den" fractions
    const processHtml = (raw) => {
        if (!raw) return '';
        let processed = String(raw);

        // Parse **text** into <strong>text</strong>
        processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Check for existing delimiters ($$, $, \[, \()
        const hasDelimiters = processed.includes('$$') || processed.includes('$') || processed.includes('\\[') || processed.includes('\\(');

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

    return (
        <Tag
            ref={containerRef}
            className={className}
            dangerouslySetInnerHTML={{ __html: finalHtml }}
        />
    );
};

export default React.memo(LatexContent);
