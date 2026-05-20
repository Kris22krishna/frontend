import React from 'react';
import SkillSparkCanvas from '../../../common/SkillSparkCanvas';

export default function SolidGeometrySparks() {
    const tabs = [
        { spark: 'geo-solid-cuboid',   label: '1. Cuboid' },
        { spark: 'geo-solid-cylinder', label: '2. Cylinder' },
        { spark: 'geo-solid-cone',     label: '3. Cone' },
        { spark: 'geo-solid-sphere',   label: '4. Sphere' },
    ];
    return (
        <SkillSparkCanvas
            title="3D Geometry Interactive Sandbox"
            returnPath="/geometry/3d-geometry"
            returnLabel="3D Geometry"
            tabs={tabs}
        />
    );
}
