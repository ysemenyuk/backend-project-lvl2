import fs from 'fs';
import path from 'path';
import parser from './parser.js';
import getAstWithDifferences from './getAST.js';
import format from './formatters/index.js';

const readFile = (filepath) => {
  const fullfilepath = path.resolve(filepath);
  return fs.readFileSync(fullfilepath, 'utf8');
};

const getTypeOfFile = (filepath) => path.extname(filepath).substring(1);

const getDataFromFile = (filepath) => {
  const data = readFile(filepath);
  const type = getTypeOfFile(filepath);
  return parser(data, type);
};

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const data1 = getDataFromFile(filepath1);
  const data2 = getDataFromFile(filepath2);
  const astWithDifferences = getAstWithDifferences(data1, data2);
  return format(astWithDifferences, formatter);
};

export default genDiff;
