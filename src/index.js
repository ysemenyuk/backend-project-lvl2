import parser from './parser.js';
import format from '../formatters/index.js';
import getDiff from './getdiff.js';

const genDiff = (filepath1, filepath2, formatter) => {
  const object1 = parser(filepath1);
  const object2 = parser(filepath2);
  const diff = getDiff(object1, object2);

  return format(diff, formatter);
};

genDiff('file11.json', 'file22.json', 'json');

export default genDiff;
