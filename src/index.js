import fs from 'fs';
import path from 'path';
import parse from './parse.js';
import buildAst from './buildAst.js';
import format from './formatters/index.js';

const getFullFilePath = (filepath) => path.resolve(filepath);

const readFile = (filepath) => {
  const fullFilePath = getFullFilePath(filepath);
  return fs.readFileSync(fullFilePath, 'utf8');
};

const getType = (filepath) => path.extname(filepath).substring(1);

const getData = (filepath) => {
  const file = readFile(filepath);
  const type = getType(filepath);
  return parse(file, type);
};

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const ast = buildAst(data1, data2);
  return format(ast, formatter);
};

export default genDiff;
