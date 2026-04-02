import React, { useState, useEffect } from 'react';
import MathRenderer from '../../../../../MathRenderer';
import styles from '../../primeTime6.module.css';

// Check if a number is prime
const isPrime = (n) => {
    if (n < 2 || isNaN(n)) return false;
    for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
    return true;
};

// Recursive component for rendering the tree nodes
const TreeNode = ({ node, path, updateNode }) => {
    const isRoot = path.length === 0;
    const isComplete = node.value !== '' && !isNaN(node.value) && Number(node.value) > 1;
    const nodeIsPrime = isComplete && isPrime(Number(node.value));
    const isLeaf = !node.left && !node.right;

    const handleSplit = () => {
        updateNode(path, { ...node, left: { value: '' }, right: { value: '' } });
    };

    const handleRemoveSplit = () => {
        updateNode(path, { ...node, left: null, right: null });
    };

    const handleChange = (e) => {
        const val = e.target.value.replace(/[^0-9]/g, '');
        updateNode(path, { ...node, value: val });
    };

    let error = false;
    if (!isLeaf && node.left?.value && node.right?.value) {
        if (Number(node.left.value) * Number(node.right.value) !== Number(node.value)) {
            error = true;
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
            {/* The Node Input */}
            <div style={{ position: 'relative', margin: '4px 0', zIndex: 2 }}>
                <input
                    type="text"
                    value={node.value}
                    onChange={handleChange}
                    disabled={isRoot}
                    style={{
                        width: '60px',
                        height: '60px',
                        textAlign: 'center',
                        fontSize: '20px',
                        fontWeight: '800',
                        borderRadius: nodeIsPrime ? '50%' : '12px',
                        border: `3px solid ${error ? '#ef4444' : nodeIsPrime ? '#10b981' : '#3b82f6'}`,
                        background: isRoot ? '#eff6ff' : '#ffffff',
                        color: error ? '#ef4444' : '#0f172a',
                        outline: 'none',
                        transition: 'all 0.2s'
                    }}
                />
                
                {/* Actions: Split or Remove */}
                {isComplete && !nodeIsPrime && isLeaf && (
                    <button
                        onClick={handleSplit}
                        style={{ position: 'absolute', bottom: -12, left: '50%', transform: 'translateX(-50%)', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '10px', padding: '2px 8px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Split
                    </button>
                )}
                {!isRoot && !isLeaf && (
                    <button
                        onClick={handleRemoveSplit}
                        style={{ position: 'absolute', top: -8, right: -16, background: '#ef4444', color: '#fff', border: 'none', borderRadius: '50%', width: 20, height: 20, fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        ×
                    </button>
                )}
            </div>

            {/* Children Branches */}
            {!isLeaf && (
                <div style={{ display: 'flex', position: 'relative', marginTop: '20px', gap: '40px' }}>
                    {/* Connecting Lines */}
                    <svg style={{ position: 'absolute', top: '-24px', left: 0, width: '100%', height: '28px', pointerEvents: 'none', zIndex: 1 }}>
                        <path d="M 50% 0 L 25% 24" stroke="#94a3b8" strokeWidth="2" fill="none" />
                        <path d="M 50% 0 L 75% 24" stroke="#94a3b8" strokeWidth="2" fill="none" />
                    </svg>

                    <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', paddingRight: '10px' }}>
                        <TreeNode node={node.left} path={[...path, 'left']} updateNode={updateNode} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', paddingLeft: '10px' }}>
                        <TreeNode node={node.right} path={[...path, 'right']} updateNode={updateNode} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default function FactorTreeInteractive({ question, value, onChange, readOnly }) {
    const defaultTree = { value: question.number || '', left: null, right: null };
    const tree = value?.tree || defaultTree;

    const updateNode = (path, newNodeState) => {
        if (readOnly) return;
        const newTree = JSON.parse(JSON.stringify(tree));
        let curr = newTree;
        for (let i = 0; i < path.length - 1; i++) {
            curr = curr[path[i]];
        }
        if (path.length > 0) {
            curr[path[path.length - 1]] = newNodeState;
        } else {
            Object.assign(curr, newNodeState);
        }
        onChange({ tree: newTree });
    };

    // Calculate prime leaves to check if complete
    const getPrimeLeaves = (node, acc = []) => {
        if (!node) return acc;
        if (!node.left && !node.right) {
            if (node.value && isPrime(Number(node.value))) acc.push(Number(node.value));
        } else {
            getPrimeLeaves(node.left, acc);
            getPrimeLeaves(node.right, acc);
        }
        return acc;
    };

    const hasErrors = (node) => {
        if (!node) return false;
        if (!node.left && !node.right) return false;
        if (node.left?.value && node.right?.value) {
            if (Number(node.left.value) * Number(node.right.value) !== Number(node.value)) return true;
        }
        return hasErrors(node.left) || hasErrors(node.right);
    };

    const leaves = getPrimeLeaves(tree).sort((a, b) => a - b);
    const prod = leaves.reduce((a, b) => a * b, 1);
    const isAllComplete = prod === Number(question.number) && !hasErrors(tree);

    // Auto-update finalAnswer when tree is complete
    useEffect(() => {
        if (isAllComplete && !readOnly) {
            // Group leaves into prime factorization object
            const pf = {};
            leaves.forEach(l => { pf[l] = (pf[l] || 0) + 1; });
            
            // Format to standard correct format (e.g. $2^{3} \times 3^{2}$)
            const expr = Object.entries(pf)
                .sort((a, b) => Number(a[0]) - Number(b[0]))
                .map(([p, e]) => e > 1 ? `${p}^{${e}}` : `${p}`)
                .join(' \\times ');
            
            const finalStr = `$${expr}$`;
            
            if (value?.finalAnswer !== finalStr) {
                onChange({ tree, finalAnswer: finalStr });
            }
        } else if (!isAllComplete && value?.finalAnswer) {
            onChange({ tree, finalAnswer: '' });
        }
    }, [isAllComplete, leaves, tree, onChange, value, readOnly]);

    return (
        <div style={{ background: '#f8fafc', padding: '30px', borderRadius: '24px', border: '1px solid #e2e8f0', margin: '20px 0', overflowX: 'auto' }}>
            <div style={{ minWidth: '400px', display: 'flex', justifyContent: 'center' }}>
                <TreeNode node={tree} path={[]} updateNode={updateNode} />
            </div>

            <div style={{ marginTop: '40px', padding: '20px', background: isAllComplete ? 'rgba(16, 185, 129, 0.1)' : '#fff', borderRadius: '16px', textAlign: 'center', transition: 'all 0.3s', border: `2px solid ${isAllComplete ? '#10b981' : '#cbd5e1'}` }}>
                <h4 style={{ margin: '0 0 10px 0', color: isAllComplete ? '#047857' : '#64748b' }}>
                    {isAllComplete ? '✓ Factorization Complete!' : 'Complete the tree to find the prime factorization'}
                </h4>
                {isAllComplete ? (
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>
                        <MathRenderer text={`${question.number} = ${value?.finalAnswer || ''}`} />
                    </div>
                ) : (
                    <div style={{ color: '#94a3b8', fontStyle: 'italic' }}>Break down the number until only primes (circles) remain, and their product equals {question.number}.</div>
                )}
            </div>
        </div>
    );
}
