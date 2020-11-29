/* eslint-disable no-case-declarations */
import _ from 'lodash';
import Different from '../src/differents.js';

const stylish = (diff) => {
  const iter = (data, depth) => {
    if (!_.isObject(data)) {
      return data;
    }
    const before = ('  ').repeat((depth * 2) + 1);
    const after = ('  ').repeat(depth * 2);

    if (data instanceof Different) {
      const result = data.getAllPropertyNames().map((name) => {
        switch (data.getPropertyStatus(name)) {
          case 'added':
            return `${before}+ ${name}: ${iter(data.getAddedValue(name), depth + 1)}`;
          case 'deleted':
            return `${before}- ${name}: ${iter(data.getDeletedValue(name), depth + 1)}`;
          case 'changed':
            const [valueBefore, valueAfter] = data.getChangedValues(name);
            return [`${before}- ${name}: ${iter(valueBefore, depth + 1)}`, `${before}+ ${name}: ${iter(valueAfter, depth + 1)}`];
          case 'unchanged':
            return `${before}  ${name}: ${iter(data.getUnchangedValues(name), depth + 1)}`;
          default:
            const [objectBefore, objectAfter] = data.getBothObjects(name);
            const newData = new Different(objectBefore, objectAfter);
            return `${before}  ${name}: ${iter(newData, depth + 1)}`;
        }
      });

      return `{\n${result.flat().join('\n')}\n${after}}`;
    }
    const result = Object.entries(data).map(([key, value]) => `${before}  ${key}: ${iter(value, depth + 1)}`);
    return `{\n${result.join('\n')}\n${after}}`;
  };

  const result = iter(diff, 0);
  console.log(result);
  return result;
};

export default stylish;
