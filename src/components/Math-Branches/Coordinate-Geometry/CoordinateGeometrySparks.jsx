import React from 'react';
import SkillSparkCanvas from '../../common/SkillSparkCanvas';

export default function CoordinateGeometrySparks() {
    const geometryTabs = [
        { spark: 'geom-plotter', label: '1. Dynamic Plotter' },
        { spark: 'geom-distance', label: '2. Distance Formula' },
        { spark: 'geom-3d-viewer', label: '3. 3D Space Viewer' },
        { spark: 'geom-lines', label: '4. Line-Angle Simulator' }
    ];

    return (
        <SkillSparkCanvas 
            title="Coordinate Geometry Sandbox" 
            returnPath="/coordinate-geometry" 
            returnLabel="Master Coordinate Geometry" 
            tabs={geometryTabs}
        />
    );
}
