import React from 'react';
import SkillSparkCanvas from '../../common/SkillSparkCanvas';

export default function TrigonometrySparks() {
    const trigTabs = [
        { spark: 'unit-circle-explorer', label: '1. Unit Circle' },
        { spark: 'trig-wave-builder', label: '2. Sin & Cos Waves' },
        { spark: 'right-triangle-ratios', label: '3. Trig Ratios' },
        { spark: 'angle-elevation-sim', label: '4. Height & Distance' },
    ];

    return (
        <SkillSparkCanvas
            title="Trigonometry Interactive Sandbox"
            returnPath="/trigonometry/dashboard"
            returnLabel="Trigonometry Dashboard"
            tabs={trigTabs}
        />
    );
}
