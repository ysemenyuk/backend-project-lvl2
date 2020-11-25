import _ from 'lodash';
import fs from 'fs';
import path from 'path';
// import process from 'process';

const genDiff = (filepath1, filepath2) => {
  // console.log(filepath1, filepath2);
  const path1 = path.resolve('__fixtures__', filepath1);
  const path2 = path.resolve('__fixtures__', filepath2);
  const file1 = fs.readFileSync(path1, 'utf8');
  const file2 = fs.readFileSync(path2, 'utf8');
  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);
  // console.log(obj1);
  // console.log(obj2);
  const object = { ...obj1, ...obj2 };
  // console.log(object)
  const before = '  ';
  const result = Object
    .keys(object)
    .sort()
    .map((key) => {
      if (_.has(obj1, key) && _.has(obj2, key)) {
        if (obj1[key] === obj2[key]) {
          return `${before}  ${key}: ${obj1[key]}`;
        }
        if (obj1[key] !== obj2[key]) {
          return `${before}- ${key}: ${obj1[key]}\n${before}+ ${key}: ${obj2[key]}`;
        }
      }

      if (_.has(obj1, key) && !_.has(obj2, key)) {
        return `${before}- ${key}: ${obj1[key]}`;
      }

      if (!_.has(obj1, key) && _.has(obj2, key)) {
        return `${before}+ ${key}: ${obj2[key]}`;
      }
      return false;
    });
  // console.log(result)
  const resultString = result.join('\n');
  console.log(`{\n${resultString}\n}`);
  return `{\n${resultString}\n}`;
};

export default genDiff;