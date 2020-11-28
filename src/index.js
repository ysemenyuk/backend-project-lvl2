/* eslint-disable object-curly-newline */
import _ from 'lodash';
import parser from './parser.js';
import format from '../formatters/index.js';

const getDiff = (object1, object2) => {
  const resultKeys = _.union(Object.keys(object1), Object.keys(object2));
  return resultKeys
    .sort()
    .reduce((acc, key) => {
      if (!_.has(object2, key)) {
        acc.push({ state: 'deleted', name: key, value1: object1[key] });
      } else if (!_.has(object1, key)) {
        acc.push({ state: 'added', name: key, value2: object2[key] });
      } else if (_.isObject(object1[key]) && _.isObject(object2[key])) {
        acc.push({ state: 'unchanged', name: key, value1: getDiff(object1[key], object2[key]) });
      } else if (object1[key] === object2[key]) {
        acc.push({ state: 'unchanged', name: key, value1: object1[key] });
      } else if (object1[key] !== object2[key]) {
        acc.push({ state: 'changed', name: key, value1: object1[key], value2: object2[key] });
      }
      return acc;
    }, []);
};

const genDiff = (filepath1, filepath2, formatter) => {
  if (typeof filepath1 !== 'string' || typeof filepath2 !== 'string') {
    throw new Error('error genDiff');
  }
  const obj1 = parser(filepath1);
  const obj2 = parser(filepath2);

  const diff = getDiff(obj1, obj2);
  return format(diff, formatter);
};

genDiff('file11.json', 'file22.json', 'plain');

export default genDiff;
