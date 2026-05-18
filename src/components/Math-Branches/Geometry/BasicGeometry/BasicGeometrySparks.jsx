import React from 'react';
import SkillSparkCanvas from '../../../common/SkillSparkCanvas';

export default function BasicGeometrySparks() {
    const tabs = [
        { spark: 'geo-angles',          label: '1. Angles' },
        { spark: 'geo-parallel-lines',  label: '2. Parallel Lines' },
        { spark: 'geo-triangle-types',  label: '3. Triangle Types' },
        { spark: 'geo-coordinates',     label: '4. Coordinates' },
    ];
    return (
        <SkillSparkCanvas
            title="Basic Geometry Interactive Sandbox"
            returnPath="/geometry/basic-geometry"
            returnLabel="Basic Geometry"
            tabs={tabs}
        />
    );
}
