import React from 'react';
import SkillSparkCanvas from '../../common/SkillSparkCanvas';

export default function AlgebraSparks() {
    return (
        <SkillSparkCanvas 
            spark="algebra-balancer" 
            title="Algebra Sandbox: The Equation Balancer" 
            returnPath="/algebra" 
            returnLabel="Algebra Dashboard" 
        />
    );
}
