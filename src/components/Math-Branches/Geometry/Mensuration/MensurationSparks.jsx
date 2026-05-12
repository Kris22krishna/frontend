import React from 'react';
import SkillSparkCanvas from '../../../common/SkillSparkCanvas';

export default function MensurationSparks() {
    const tabs = [
        { spark: 'geo-mensuration-area', label: '1. 2D Area Formulas' },
        { spark: 'geo-mensuration-perim', label: '2. Perimeter' },
        { spark: 'geo-mensuration-vol',  label: '3. Volume & Surface Area' },
    ];
    return (
        <SkillSparkCanvas
            title="Mensuration Interactive Sandbox"
            returnPath="/geometry/mensuration"
            returnLabel="Mensuration"
            tabs={tabs}
        />
    );
}
