const fs = require('fs');
const path = require('path');

const dir = 'src/components/practice/class-3/Toy-Joy';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(f => {
    const p = path.join(dir, f);
    let content = fs.readFileSync(p, 'utf8');

    // Regex to match anything inside explanation: '...' or correctLabel: '...' 
    // This is tough because of unescaped quotes. 
    // Let's replace the whole questionMeta block with backticks for explanation and correctLabel
    
    // Better: let's replace the single quotes with backticks globally within the meta definition.
    const start = content.indexOf('const questionMeta = [');
    if (start !== -1) {
        const end = content.indexOf('];', start) + 2;
        let metaBlock = content.substring(start, end);
        
        // This is safe if I only target 'inside' the properties that use strings.
        // Replace all "explanation: '...'" with "explanation: `...`"
        metaBlock = metaBlock.replace(/explanation: '([\s\S]*?)',/g, 'explanation: `$1`,');
        metaBlock = metaBlock.replace(/correctLabel: '([\s\S]*?)',/g, 'correctLabel: `$1`,');
        
        // This won't work if they are ALREADY broken by a single quote... exactly!
        // The previous script already fixed several. 
        // Let's do a more robust approach.
        
        // All strings in MY meta start with ' and end with ', 
        // but if they have ' inside, they're broken. 
        
        // Let's find each line with "explanation: " and handle it line by line.
        let lines = metaBlock.split('\n');
        lines = lines.map(line => {
            if (line.includes('explanation: ') || line.includes('correctLabel: ')) {
                // Find all text between the first ' and the last ', but exclude those two '
                const first = line.indexOf("'");
                const last = line.lastIndexOf("'");
                if (first !== -1 && last !== -1 && first !== last) {
                    let interior = line.substring(first + 1, last);
                    // Replace all ' with \'
                    interior = interior.replace(/'/g, "\\'");
                    return line.substring(0, first + 1) + interior + line.substring(last);
                }
            }
            return line;
        });
        
        const newBlock = lines.join('\n');
        if (newBlock !== metaBlock) {
             content = content.substring(0, start) + newBlock + content.substring(end);
             fs.writeFileSync(p, content);
             console.log("Deep cleaned quotes in " + f);
        }
    }
});
