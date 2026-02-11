import React, { useEffect, useRef } from 'react';
import 'katex/dist/katex.min.css';
import renderMathInElement from 'katex/dist/contrib/auto-render';

const LatexContent = ({ html, className, block = false }) => {
    const containerRef = useRef(null);

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
    }, [html]);

    const Tag = block ? 'div' : 'span';

    return (
        <Tag
            ref={containerRef}
            className={className}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
};

export default React.memo(LatexContent);
