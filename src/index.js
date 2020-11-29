import parser from './parser.js';
import format from '../formatters/index.js';
import getDiff from './getdiff.js';

const genDiff = (filepath1, filepath2, formatter) => {
  const obj1 = parser(filepath1);
  const obj2 = parser(filepath2);
  const diff = getDiff(obj1, obj2);
  return format(diff, formatter);
};

genDiff('file11.json', 'file22.json', 'plain');

export default genDiff;
