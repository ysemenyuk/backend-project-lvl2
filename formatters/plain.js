import _ from 'lodash';
import Differents from '../src/differents.js';

const plain = (diff) => {
  const iter = (data, path) => {
    if (data instanceof Differents) {
      const result = data.getAllPropertyNames().sort().map((name) => {
        if (data.isPropertyAdded(name)) {
          return `Property '${path}${name}' was added with value: ${iter(data.getAddedValue(name))}`;
        }
        if (data.isPropertyDeleted(name)) {
          return `Property '${path}${name}' was removed`;
        }
        if (data.isPropertyChanged(name)) {
          const [valueBefore, valueAfter] = data.getChangedValues(name);
          return `Property '${path}${name}' was updated. From ${iter(valueBefore)} to ${iter(valueAfter)}`;
        }
        if (data.isPropertyUnchanged(name)) {
          return [];
        }
        const [objectBefore, objectAfter] = data.getBothObjects(name);
        const newData = new Differents(objectBefore, objectAfter);
        return iter(newData, `${path}${name}.`);
      });
      return `${result.flat().join('\n')}`;
    }
    if (_.isObject(data)) {
      return '[complex value]';
    }
    if (typeof data === 'string') {
      return `'${data}'`;
    }
    return data;
  };

  const result = iter(diff, '');
  console.log(result);
  return result;
};

export default plain;
