/* eslint-disable no-case-declarations */
import _ from 'lodash';

const stylish = (diff) => {
  const iter = (data, depth) => {
    const before = ('  ').repeat((depth * 2) + 1);
    const after = ('  ').repeat(depth * 2);
    if (Array.isArray(data)) {
      const result = data.map(([propertyStatus, propertyName, propertyValue]) => {
        const [valueBefore, valueAfter] = propertyValue;
        switch (propertyStatus) {
          case 'added':
            return `${before}+ ${propertyName}: ${iter(valueAfter, depth + 1)}`;
          case 'deleted':
            return `${before}- ${propertyName}: ${iter(valueBefore, depth + 1)}`;
          case 'unchanged':
            return `${before}  ${propertyName}: ${iter(valueBefore, depth + 1)}`;
          case 'changed':
            return [
              `${before}- ${propertyName}: ${iter(valueBefore, depth + 1)}`,
              `${before}+ ${propertyName}: ${iter(valueAfter, depth + 1)}`,
            ];
          default:
            return `${before}  ${propertyName}: ${iter(valueBefore, depth + 1)}`;
        }
      });
      return `{\n${result.flat().join('\n')}\n${after}}`;
    }
    if (!_.isObject(data)) {
      return data;
    }
    const result = Object.entries(data).map(([key, value]) => `${before}  ${key}: ${iter(value, depth + 1)}`);
    return `{\n${result.join('\n')}\n${after}}`;
  };
  const result = iter(diff, 0);
  console.log(result);
  return result;
};

export default stylish;
