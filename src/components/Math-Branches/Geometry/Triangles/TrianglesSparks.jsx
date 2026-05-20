import React from 'react';
import SkillSparkCanvas from '../../../common/SkillSparkCanvas';

export default function TrianglesSparks() {
    const tabs = [
        { spark: 'geo-pythagoras',      label: '1. Pythagoras' },
        { spark: 'geo-tri-area',        label: '2. Triangle Area' },
        { spark: 'geo-tri-angles',      label: '3. Angle Sum' },
        { spark: 'geo-congruence',      label: '4. Congruence & Similarity' },
    ];
    return (
        <SkillSparkCanvas
            title="Triangles Interactive Sandbox"
            returnPath="/geometry/triangles"
            returnLabel="Triangles"
            tabs={tabs}
        />
    );
}
