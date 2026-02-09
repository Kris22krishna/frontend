import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export function LatexText({ text, className = "" }) {
    if (!text) return null;

    // Regex to match math delimiters:
    // 1. $$ ... $$ (Display/Inline)
    // 2. \[ ... \] (Display)
    // 3. \( ... \) (Inline)
    // 4. $ ... $ (Inline) - Negative lookbehind (?<!\\) ensures we don't match escaped \$
    const regex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\(.*?\\\)|(?<!\\)\$[\s\S]*?(?<!\\)\$)/g;

    const parts = text.split(regex);

    return (
        <span className={className}>
            {parts.map((part, index) => {
                if (part.startsWith('$$') && part.endsWith('$$')) {
                    const math = part.slice(2, -2);
                    return <InlineMath key={index} math={math} />;
                } else if (part.startsWith('\\[') && part.endsWith('\\]')) {
                    const math = part.slice(2, -2);
                    return <BlockMath key={index} math={math} />;
                } else if (part.startsWith('\\(') && part.endsWith('\\)')) {
                    const math = part.slice(2, -2);
                    return <InlineMath key={index} math={math} />;
                } else if (part.startsWith('$') && part.endsWith('$')) {
                    const math = part.slice(1, -1);
                    return <InlineMath key={index} math={math} />;
                } else {
                    // Render text parts with HTML support
                    return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
                }
            })}
        </span>
    );
}
