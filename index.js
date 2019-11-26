const fs = require('fs');

const data = fs.readFileSync('./data.json', 'UTF-8');
const minified = JSON.stringify(JSON.parse(data));
const unquote = (s) => s.replace(/\\"/g,"\uFFFF").replace(/\"([^"]+)\":/g,"$1:").replace(/\uFFFF/g,"\\\"");
const createOutput = (key, data) => `console.time('${key}');\nvar data = ${data};\nconsole.timeEnd('${key}');`

const config = [
  ['object-literal-unquoted', unquote(minified)],
  ['json-parse', `JSON.parse('${minified}')`],
  ['object-literal', minified],
  ['object-literal-multiline', data],
];

if (!fs.existsSync('build')) fs.mkdirSync('build');

config.forEach((a, id) => fs.writeFileSync(`build/${id}.js`, createOutput(...a)));