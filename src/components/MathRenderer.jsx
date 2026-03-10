import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

/**
 * Renders text containing LaTeX math expressions wrapped in $$...$$
 * Example input: "Solve $$ x^2 + 4 $$ for x"
 */
const MathRenderer = ({ text, inline = true }) => {
    if (text === null || text === undefined) return null;

    // Handle objects by extracting label or value if possible, otherwise stringify
    let stringText = "";
    if (typeof text === 'object') {
        stringText = String(text.label || text.value || JSON.stringify(text));
    } else {
        stringText = String(text);
    }

    // Split by LaTeX delimiters
    const regex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|(?<!\\)\$[\s\S]*?(?<!\\)\$)/g;
    const parts = stringText.split(regex);

    return (
        <span>
            {parts.map((part, index) => {
                if (!part) return null;

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
                    // Render as HTML to support <div>, <br/>, <img> etc. from generators
                    return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
                }
            })}
        </span>
    );
};

export default MathRenderer;
