import fs from 'fs';
import path from 'path';
import parse from './parse.js';
import buildAst from './buildAst.js';
import format from './formatters/index.js';

const getFullFilePath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath) => {
  const fullFilePath = getFullFilePath(filepath);
  return fs.readFileSync(fullFilePath, 'utf8');
};

const getFormat = (filepath) => path.extname(filepath).substring(1);

const getData = (filepath) => {
  const fileData = readFile(filepath);
  const fileFormat = getFormat(filepath);
  return parse(fileData, fileFormat);
};

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const ast = buildAst(data1, data2);
  return format(ast, formatter);
};

export default genDiff;
