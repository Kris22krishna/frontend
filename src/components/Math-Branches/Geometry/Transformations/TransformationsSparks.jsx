import React from 'react';
import SkillSparkCanvas from '../../../common/SkillSparkCanvas';

export default function TransformationsSparks() {
    const tabs = [
        { spark: 'geo-translation', label: '1. Translation' },
        { spark: 'geo-reflection',  label: '2. Reflection' },
        { spark: 'geo-rotation',    label: '3. Rotation' },
        { spark: 'geo-dilation',    label: '4. Dilation' },
    ];
    return (
        <SkillSparkCanvas
            title="Transformations Interactive Sandbox"
            returnPath="/geometry/transformations"
            returnLabel="Transformations"
            tabs={tabs}
        />
    );
}
