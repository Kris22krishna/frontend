const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(dirPath);
    });
}

walk('C:/Users/incha/OneDrive/Desktop/LD/frontend/src/components/practice/class-10', (filePath) => {
    if (filePath.endsWith('.jsx')) {
        let content = fs.readFileSync(filePath, 'utf-8');
        let changed = false;
        if (content.match(/className="[ \w-]*junior-practice-page(?![ \w-]*class10-practice)"/g)) {
            content = content.replace(/className="(.*?)(junior-practice-page)(.*?)"/g, (match, p1, p2, p3) => {
                if (!p1.includes('class10-practice') && !p3.includes('class10-practice')) {
                    return `className="${p1}${p2} class10-practice${p3}"`;
                }
                return match;
            });
            changed = true;
        }
        if (changed) {
            fs.writeFileSync(filePath, content);
            console.log('Updated', filePath);
        }
    }
});
