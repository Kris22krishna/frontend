const fs = require('fs'); 
const t = ['Matrices', 'Determinants', 'Relations', 'Functions', 'InverseTrigonometricFunctions']; 
t.forEach(topic => { 
  try { 
    const data = fs.readFileSync('src/components/practice/class-12/' + topic + '/Topics/Skills/' + topic + 'Skills.jsx', 'utf8'); 
    const matches = [...data.matchAll(/id:\s*[\"']([^\"']+)[\"']/g)].map(m => m[1]); 
    console.log(topic + ':', matches); 
  } catch(e) {
    console.log(topic + ' error:', e.message);
  } 
});
