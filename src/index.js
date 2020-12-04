import fs from 'fs';
import path from 'path';
import parser from './parser.js';
import getAST from './getAST.js';
import format from './formatters/index.js';

const getObjectFromFile = (filepath) => {
  const fullfilepath = path.resolve(filepath);
  const data = fs.readFileSync(fullfilepath, 'utf8');
  const type = path.extname(filepath).substring(1);
  return parser(data, type);
};

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const object1 = getObjectFromFile(filepath1);
  const object2 = getObjectFromFile(filepath2);
  const ast = getAST(object1, object2);
  return format(ast, formatter);
};

export default genDiff;
