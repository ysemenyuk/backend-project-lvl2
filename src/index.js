/* eslint-disable object-curly-newline */
// import _ from 'lodash';
import parser from './parser.js';
import format from '../formatters/index.js';
import Differents from './differents.js';

const genDifferents = (filepath1, filepath2, formatter) => {
  if (typeof filepath1 !== 'string' || typeof filepath2 !== 'string') {
    throw new Error('error genDiff');
  }
  const object1 = parser(filepath1);
  const object2 = parser(filepath2);

  const differents = new Differents(object1, object2);
  return format(differents, formatter);
};

// genDiff('file11.json', 'file22.json', 'plain');

export default genDifferents;
