import _ from 'lodash';
import parser from './parser.js';

const genDiff = (filepath1, filepath2) => {
  if (typeof filepath1 !== 'string' || typeof filepath2 !== 'string') {
    return false;
  }
  const object1 = parser(filepath1);
  const object2 = parser(filepath2);
  const resultObject = { ...object1, ...object2 };
  const before = '  ';
  const result = Object
    .keys(resultObject)
    .sort()
    .reduce((acc, key) => {
      if (!_.has(object2, key)) {
        acc.push(`${before}- ${key}: ${object1[key]}`);
      } else if (!_.has(object1, key)) {
        acc.push(`${before}+ ${key}: ${object2[key]}`);
      } else if (object1[key] === object2[key]) {
        acc.push(`${before}  ${key}: ${object1[key]}`);
      } else if (object1[key] !== object2[key]) {
        acc.push(`${before}- ${key}: ${object1[key]}`, `${before}+ ${key}: ${object2[key]}`);
      }
      return acc;
    }, []);
  console.log(result);
  const resultString = result.join('\n');
  // console.log(`{\n${resultString}\n}`);
  return `{\n${resultString}\n}`;
};

genDiff('file1.json', 'file2.json');

export default genDiff;
