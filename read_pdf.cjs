const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('c:/Users/incha/OneDrive/Desktop/LD/frontend/work.pdf');

pdf(dataBuffer).then(function(data) {
    // number of pages
    console.log("Pages:", data.numpages);
    // string content
    console.log(data.text);
}).catch(function(error){
    console.log("Error reading PDF:", error.message);
});
