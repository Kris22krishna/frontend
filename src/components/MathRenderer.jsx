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

    // Split by delimiters: $$...$$, \[...\], \(...\), and $...$
    // Use negative lookbehind to avoid matching escaped \$
    const regex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|(?<!\\)\$[\s\S]*?(?<!\\)\$)/g;

    const parts = stringText.split(regex);

    return (
        <span>
            {parts.map((part, index) => {
                if (!part) return null;

                // Check for delimiters and render appropriately
                if (part.startsWith('$$') && part.endsWith('$$') && part.length >= 4) {
                    const content = part.slice(2, -2);
                    return inline ? <InlineMath key={index} math={content} /> : <BlockMath key={index} math={content} />;
                } else if (part.startsWith('\\(') && part.endsWith('\\)')) {
                    const content = part.slice(2, -2);
                    return <InlineMath key={index} math={content} />;
                } else if (part.startsWith('\\[') && part.endsWith('\\]')) {
                    const content = part.slice(2, -2);
                    return <BlockMath key={index} math={content} />;
                } else if (part.startsWith('$') && part.endsWith('$') && part.length >= 2) {
                    const content = part.slice(1, -1);
                    return <InlineMath key={index} math={content} />;
                } else {
                    // Handle basic Markdown bold (**) within text parts
                    const boldRegex = /(\*\*[\s\S]*?\*\*)/g;
                    const textParts = part.split(boldRegex);
                    
                    return (
                        <span key={index}>
                            {textParts.map((tPart, tIndex) => {
                                if (tPart.startsWith('**') && tPart.endsWith('**') && tPart.length >= 4) {
                                    return <strong key={tIndex}>{tPart.slice(2, -2)}</strong>;
                                }
                                return tPart;
                            })}
                        </span>
                    );
                }
            })}
        </span>
    );
};

export default MathRenderer;
