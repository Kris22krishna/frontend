import React from 'react';
import SkillSparkCanvas from '../../../common/SkillSparkCanvas';

export default function CirclesSparks() {
    const tabs = [
        { spark: 'geo-circumference',     label: '1. Circumference' },
        { spark: 'geo-arc-sector',        label: '2. Arc & Sector' },
        { spark: 'geo-chord-tangent',     label: '3. Chord & Tangent' },
        { spark: 'geo-circle-theorems',   label: '4. Circle Theorems' },
    ];
    return (
        <SkillSparkCanvas
            title="Circles Interactive Sandbox"
            returnPath="/geometry/circles"
            returnLabel="Circles"
            tabs={tabs}
        />
    );
}
