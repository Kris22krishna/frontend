const fs = require('fs');
const path = require('path');

const dir = 'src/components/practice/class-3/Toy-Joy';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(f => {
    const p = path.join(dir, f);
    let content = fs.readFileSync(p, 'utf8');
    
    // Remove all check-btn elements globally
    const regex = /<button className="check-btn".*?<\/button>/g;
    if (regex.test(content)) {
        content = content.replace(regex, '');
        fs.writeFileSync(p, content);
        console.log("Cleaned check-btn from " + f);
    }
});
