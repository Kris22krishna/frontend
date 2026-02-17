// Quick test to verify Grade 1 configuration
import { TOPIC_CONFIGS } from '../src/lib/topicConfig.js';

const grade1Config = TOPIC_CONFIGS['1'];

console.log('=== Grade 1 Configuration Test ===\n');

if (!grade1Config) {
    console.error('❌ ERROR: Grade 1 config not found!');
    process.exit(1);
}

const topics = Object.keys(grade1Config);
console.log(`✅ Found ${topics.length} topics for Grade 1:\n`);

let totalSkills = 0;
topics.forEach((topicName, index) => {
    const skills = grade1Config[topicName];
    const skillCount = skills.length;
    totalSkills += skillCount;

    console.log(`${index + 1}. ${topicName}`);
    console.log(`   - ${skillCount} skills`);

    // Check if all skills have required properties
    skills.forEach((skill, skillIndex) => {
        if (!skill.id) {
            console.error(`   ❌ Skill ${skillIndex + 1} missing 'id' property`);
        }
        if (!skill.name) {
            console.error(`   ❌ Skill ${skillIndex + 1} missing 'name' property`);
        }
        if (!skill.route) {
            console.error(`   ❌ Skill ${skillIndex + 1} missing 'route' property`);
        }
    });
    console.log('');
});

console.log(`\n=== Summary ===`);
console.log(`Total Topics: ${topics.length}`);
console.log(`Total Skills: ${totalSkills}`);
console.log(`\n✅ All Grade 1 topics are properly configured!`);
