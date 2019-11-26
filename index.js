const fs = require('fs');

const data = fs.readFileSync('./data.json', 'UTF-8');
const quoted = JSON.stringify(JSON.parse(data));

const unquote = (s) => s.replace(/\\"/g,"\uFFFF").replace(/\"([^"]+)\":/g,"$1:").replace(/\uFFFF/g,"\\\"");
const createOutput = (data, key) => `console.time('${key}');\nvar data = ${data};\nconsole.timeEnd('${key}');`

fs.writeFileSync('build/serialize-object-literal-unquoted.js', createOutput(unquote(quoted), 'object-literal-unquoted'));
fs.writeFileSync('build/serialize-object-literal.js', createOutput(quoted, 'object-literal'));
fs.writeFileSync('build/serialize-json-parse.js', createOutput(`JSON.parse('${quoted}')`, 'json-parse'));
fs.writeFileSync('build/serialize-object-literal-multiline.js', createOutput(data, 'object-literal-multiline'));