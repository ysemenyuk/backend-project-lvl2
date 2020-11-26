import _ from 'lodash';
import parser from './parser.js';

const genDiff = (filepath1, filepath2) => {
  if (typeof filepath1 !== 'string' || typeof filepath2 !== 'string') {
    return false;
  }
  const obj1 = parser(filepath1);
  const obj2 = parser(filepath2);

  const iter = (object1, object2, depth) => {
    // console.log(depth, object);
    // console.log(Object.keys(object));
    const object = { ...object1, ...object2 };
    const before = '  ';
    const result = Object
      .keys(object)
      .sort()
      .reduce((acc, key) => {
        if (!_.has(object2, key)) {
          acc.push(`${before}- ${key}: ${object1[key]}`);
        } else if (!_.has(object1, key)) {
          acc.push(`${before}+ ${key}: ${object2[key]}`);
        } else if (_.isObject(object1[key]) && _.isObject(object2[key])) {
          acc.push(`${before}  ${key}: ${iter(object1[key], object2[key], depth + 1)}`);
        } else if (object1[key] === object2[key]) {
          acc.push(`${before}  ${key}: ${object1[key]}`);
        } else if (object1[key] !== object2[key]) {
          acc.push(`${before}- ${key}: ${object1[key]}`, `${before}+ ${key}: ${object2[key]}`);
        }
        return acc;
      }, []);
    console.log(result);
    return result;
  };

  return iter(obj1, obj2, 0);

  // console.log(result);
  // const resultString = result.join('\n');
  // console.log(`{\n${resultString}\n}`);
  // return `{\n${resultString}\n}`;
};

console.log(genDiff('file11.json', 'file22.json'));

export default genDiff;
