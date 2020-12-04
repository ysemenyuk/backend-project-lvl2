import parser from './parser.js';
import format from './formatters/index.js';
import getAST from './getAST.js';

const genDiff = (filepath1, filepath2, formatter = 'stylish') => {
  const object1 = parser(filepath1);
  const object2 = parser(filepath2);
  const ast = getAST(object1, object2);
  return format(ast, formatter);
};

export default genDiff;
