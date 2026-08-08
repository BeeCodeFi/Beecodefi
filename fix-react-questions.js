const fs = require('fs');

const filePath = 'C:/Users/ignyo/OneDrive/Desktop/WORKSPACE/06_STUDY/Projects/BeeCodeFi/Beecodefi/frontend/src/data/interview-questions/react-questions.ts';
const content = fs.readFileSync(filePath, 'utf8');

const oldText = `style.textContent = \`
      .styled {
        color: red;
        background: blue;
      }
    \``;`;

const newText = `style.textContent = '.styled { color: red; background: blue; }';`;

const newContent = content.replace(oldText, newText);

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Fixed the syntax error in react-questions.ts');
