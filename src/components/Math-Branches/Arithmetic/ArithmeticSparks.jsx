import React from 'react';
import SkillSparkCanvas from '../../common/SkillSparkCanvas';

export default function ArithmeticSparks() {
    const arithmeticTabs = [
        { spark: 'natural-hopper', label: '1. Natural Numbers' },
        { spark: 'integers-balloon', label: '2. Integers' },
        { spark: 'fractions-sharing', label: '3. Fractions' },
        { spark: 'rational-density', label: '4. Rational Numbers' },
        { spark: 'irrational-unroll', label: '5. Irrational Numbers' },
        { spark: 'lcm-towers', label: '6. LCM' },
        { spark: 'hcf-tiler', label: '7. HCF' }
    ];

    return (
        <SkillSparkCanvas 
            title="Arithmetic Interactive Sandbox" 
            returnPath="/arithmetic/dashboard" 
            returnLabel="Arithmetic Dashboard" 
            tabs={arithmeticTabs}
        />
    );
}
