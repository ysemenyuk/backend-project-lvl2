import fs from 'fs';
import path from 'path';
import parse from './parse.js';
import getAstWithDiff from './getAstWithDiff.js';
import format from './formatters/index.js';

const readFile = (filepath) => {
  const fullfilepath = path.resolve(filepath);
  return fs.readFileSync(fullfilepath, 'utf8');
};

const getTypeOfFile = (filepath) => path.extname(filepath).substring(1);

const getDataFromFile = (filepath) => {
  const data = readFile(filepath);
  const type = getTypeOfFile(filepath);
  return parse(data, type);
};

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const data1 = getDataFromFile(filepath1);
  const data2 = getDataFromFile(filepath2);
  const astWithDiff = getAstWithDiff(data1, data2);
  return format(astWithDiff, formatter);
};

export default genDiff;
