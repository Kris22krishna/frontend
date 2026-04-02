const fs = require('fs');
const path = require('path');

const dir = 'src/components/practice/class-3/Toy-Joy';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(f => {
    const p = path.join(dir, f);
    let content = fs.readFileSync(p, 'utf8');
    
    // This regex looks for 'something's' inside what looks like an object being defined.
    // However, it's safer to just replace any isolated ' inside a string.
    // The easiest fix for all is to use backticks for the strings or escape the quote.
    
    // Match strings starting with single quote until its pair, but it currently might be broken by the ' in between.
    // e.g. explanation: 'Jaya's rocket'
    
    // Safer approach: replace problematic strings discovered.
    let changed = false;
    
    if (content.includes("'Jaya's")) {
        content = content.replace(/'Jaya's/g, "'Jaya\\'s");
        changed = true;
    }
    if (content.includes("4's")) {
        content = content.replace(/4's/g, "4\\'s");
        changed = true;
    }
    // and Priya
    if (content.includes("'Priya's")) {
        content = content.replace(/'Priya's/g, "'Priya\\'s");
        changed = true;
    }

    if (changed) {
        fs.writeFileSync(p, content);
        console.log("Fixed quotes in " + f);
    }
});
