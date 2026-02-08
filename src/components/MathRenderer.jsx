import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

/**
 * Renders text containing LaTeX math expressions wrapped in $$...$$
 * Example input: "Solve $$ x^2 + 4 $$ for x"
 */
const MathRenderer = ({ text, inline = true }) => {
    if (text === null || text === undefined) return null;

    // Ensure string
    const stringText = String(text);

    // Split by delimiters: $$...$$, \[...\], \(...\)
    const regex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\))/g;

    const parts = stringText.split(regex);

    return (
        <span>
            {parts.map((part, index) => {
                if (!part) return null;

                // Check for delimiters and render appropriately
                if (part.startsWith('$$') && part.endsWith('$$')) {
                    const content = part.slice(2, -2);
                    return inline ? <InlineMath key={index} math={content} /> : <BlockMath key={index} math={content} />;
                } else if (part.startsWith('\\(') && part.endsWith('\\)')) {
                    const content = part.slice(2, -2);
                    return <InlineMath key={index} math={content} />;
                } else if (part.startsWith('\\[') && part.endsWith('\\]')) {
                    const content = part.slice(2, -2);
                    return <BlockMath key={index} math={content} />;
                } else {
                    return <span key={index}>{part}</span>;
                }
            })}
        </span>
    );
};

export default MathRenderer;
