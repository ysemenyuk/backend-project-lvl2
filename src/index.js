import _ from 'lodash';

const genDiff = (file1, file2) => {
  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);
  // console.log(obj1)
  // console.log(obj2)

  const object = { ...obj1, ...obj2 };
  // console.log(object)
  const before = '  ';
  const result = [];
  Object.keys(object)
    .map((key) => {
      if (_.has(obj1, key) && _.has(obj2, key)) {
        if (obj1[key] === obj2[key]) {
          const item = `${before}  ${key}: ${obj1[key]}`;
          result.push(item);
          return key;
        }
        if (obj1[key] !== obj2[key]) {
          const item1 = `${before}- ${key}: ${obj1[key]}`;
          const item2 = `${before}+ ${key}: ${obj2[key]}`;
          result.push(item1, item2);
          return key;
        }
      }

      if (_.has(obj1, key) && !_.has(obj2, key)) {
        const item = `${before}- ${key}: ${obj1[key]}`;
        result.push(item);
        return key;
      }

      if (!_.has(obj1, key) && _.has(obj2, key)) {
        const item = `${before}+ ${key}: ${obj2[key]}`;
        result.push(item);
      }
      return key;
    });
  // console.log(result)
  const resultString = result.join('\n');
  console.log(`{\n${resultString}\n}`);
  // return `{\n${resultString}\n}`;
};

export default genDiff;
