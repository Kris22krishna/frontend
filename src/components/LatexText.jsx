import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

/**
 * ErrorBoundary for KaTeX rendering errors.
 * React try-catch doesn't catch errors thrown by child components during render.
 * Only a class-based ErrorBoundary can do that.
 */
class MathErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error) {
        console.warn('KaTeX render error:', error.message, '| Input:', this.props.fallback);
    }
    render() {
        if (this.state.hasError) {
            return <span className="font-mono text-sm">{this.props.fallback || '???'}</span>;
        }
        return this.props.children;
    }
}

function SafeInlineMath({ math }) {
    return (
        <MathErrorBoundary fallback={`$${math}$`}>
            <InlineMath math={math} />
        </MathErrorBoundary>
    );
}

function SafeBlockMath({ math }) {
    return (
        <MathErrorBoundary fallback={`\\[${math}\\]`}>
            <BlockMath math={math} />
        </MathErrorBoundary>
    );
}

export function LatexText({ text, className = "" }) {
    if (!text) return null;

    // Safety: convert to string if not already (handles numbers, etc.)
    const textStr = typeof text === 'string' ? text : String(text);

    // If text has no math delimiters at all, just render HTML directly (fast path)
    if (!textStr.includes('$') && !textStr.includes('\\(') && !textStr.includes('\\[')) {
        return <span className={className} dangerouslySetInnerHTML={{ __html: textStr }} />;
    }

    // Regex to match math delimiters:
    // 1. $$ ... $$ (Display/Inline)
    // 2. \[ ... \] (Display)
    // 3. \( ... \) (Inline)
    // 4. $ ... $ (Inline) - Negative lookbehind ensures we don't match escaped \$
    const regex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\(.*?\\\)|(?<!\\)\$[\s\S]*?(?<!\\)\$)/g;

    let parts;
    try {
        parts = textStr.split(regex);
    } catch (e) {
        // If regex fails (e.g., lookbehind not supported), fall back to HTML render
        console.warn('LatexText regex error:', e.message);
        return <span className={className} dangerouslySetInnerHTML={{ __html: textStr }} />;
    }

    return (
        <span className={className}>
            {parts.map((part, index) => {
                // Skip null, undefined, or empty parts (produced by split)
                if (!part) return null;

                try {
                    if (part.startsWith('$$') && part.endsWith('$$')) {
                        const math = part.slice(2, -2).trim();
                        if (!math) return null;
                        return <SafeInlineMath key={index} math={math} />;
                    } else if (part.startsWith('\\[') && part.endsWith('\\]')) {
                        const math = part.slice(2, -2).trim();
                        if (!math) return null;
                        return <SafeBlockMath key={index} math={math} />;
                    } else if (part.startsWith('\\(') && part.endsWith('\\)')) {
                        const math = part.slice(2, -2).trim();
                        if (!math) return null;
                        return <SafeInlineMath key={index} math={math} />;
                    } else if (part.startsWith('$') && part.endsWith('$') && part.length > 1) {
                        const math = part.slice(1, -1).trim();
                        if (!math) return null;
                        return <SafeInlineMath key={index} math={math} />;
                    } else {
                        // Render text parts with HTML support
                        return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
                    }
                } catch (e) {
                    // Ultimate fallback: show raw text
                    console.warn('LatexText render error for part:', part, e);
                    return <span key={index}>{part}</span>;
                }
            })}
        </span>
    );
}

