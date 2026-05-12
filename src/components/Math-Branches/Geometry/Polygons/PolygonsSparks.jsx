import React from 'react';
import SkillSparkCanvas from '../../../common/SkillSparkCanvas';

export default function PolygonsSparks() {
    const tabs = [
        { spark: 'geo-polygon-rect',    label: '1. Rectangles & Squares' },
        { spark: 'geo-polygon-para',    label: '2. Parallelograms' },
        { spark: 'geo-polygon-rhombus', label: '3. Rhombus & Kite' },
        { spark: 'geo-polygon-trap',    label: '4. Trapezium' },
    ];
    return (
        <SkillSparkCanvas
            title="Polygons Interactive Sandbox"
            returnPath="/geometry/polygons"
            returnLabel="Polygons"
            tabs={tabs}
        />
    );
}
