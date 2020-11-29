/* eslint-disable object-curly-newline */
import _ from 'lodash';
import Differents from '../src/differents.js';

const stylish = (diff) => {
  const iter = (data, depth) => {
    if (!_.isObject(data)) {
      return data;
    }
    const before = ('  ').repeat((depth * 2) + 1);
    const after = ('  ').repeat(depth * 2);

    if (data instanceof Differents) {
      const result = data.getAllPropertyNames().sort().map((name) => {
        if (data.isPropertyAdded(name)) {
          return `${before}+ ${name}: ${iter(data.getAddedValue(name), depth + 1)}`;
        }
        if (data.isPropertyDeleted(name)) {
          return `${before}- ${name}: ${iter(data.getDeletedValue(name), depth + 1)}`;
        }
        if (data.isPropertyChanged(name)) {
          const [valueBefore, valueAfter] = data.getChangedValues(name);
          return [`${before}- ${name}: ${iter(valueBefore, depth + 1)}`, `${before}+ ${name}: ${iter(valueAfter, depth + 1)}`];
        }
        if (data.isPropertyUnchanged(name)) {
          return `${before}  ${name}: ${iter(data.getUnchangedValue(name), depth + 1)}`;
        }
        const [objectBefore, objectAfter] = data.getBothObjects(name);
        const newData = new Differents(objectBefore, objectAfter);
        return `${before}  ${name}: ${iter(newData, depth + 1)}`;
      });

      return `{\n${result.flat().join('\n')}\n${after}}`;
    }

    const result = Object.entries(data).map(([key, value]) => `${before}  ${key}: ${iter(value, depth + 1)}`);
    return `{\n${result.flat().join('\n')}\n${after}}`;
  };

  const result = iter(diff, 0);
  console.log(result);
  return result;
};

export default stylish;
