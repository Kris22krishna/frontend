import React from 'react';
import SkillSparkCanvas from '../../common/SkillSparkCanvas';

export default function CalculusSparks() {
    const calculusTabs = [
        { spark: 'calc-functions', label: '1. Functions' },
        { spark: 'calc-limits', label: '2. Limits' },
        { spark: 'calc-derivatives', label: '3. Derivatives' },
        { spark: 'calc-integrals', label: '4. Integrals' }
    ];

    return (
        <SkillSparkCanvas 
            title="Calculus Interactive Sandbox" 
            returnPath="/calculus" 
            returnLabel="Master Calculus" 
            tabs={calculusTabs}
        />
    );
}
