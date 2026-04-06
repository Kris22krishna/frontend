import React from 'react';
import SkillSparkCanvas from '../../common/SkillSparkCanvas';

export default function CalculusSparks() {
    return (
        <SkillSparkCanvas 
            spark="calculus-tangent" 
            title="Calculus Sandbox: The Moving Derivative" 
            returnPath="/calculus/dashboard" 
            returnLabel="Calculus Dashboard" 
        />
    );
}
