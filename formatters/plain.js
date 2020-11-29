/* eslint-disable no-case-declarations */
import _ from 'lodash';

const plain = (diff) => {
  const iter = (data, path) => {
    if (Array.isArray(data)) {
      const result = data.map(([status, name, value]) => {
        switch (status) {
          case 'added':
            return `Property '${path}${name}' was added with value: ${iter(value)}`;
          case 'deleted':
            return `Property '${path}${name}' was removed`;
          case 'unchanged':
            return [];
          case 'changed':
            const [value1, value2] = value;
            return `Property '${path}${name}' was updated. From ${iter(value1)} to ${iter(value2)}`;
          default:
            return iter(value, `${path}${name}.`);
        }
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
