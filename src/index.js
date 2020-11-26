import _ from 'lodash';
import parser from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const object1 = parser(filepath1);
  const object2 = parser(filepath2);
  // console.log(obj1);
  // console.log(obj2);
  const resultObject = { ...object1, ...object2 };
  // console.log(object)
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
  // console.log(result)
  const resultString = result.join('\n');
  console.log(`{\n${resultString}\n}`);
  return `{\n${resultString}\n}`;
};

export default genDiff;
