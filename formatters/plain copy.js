/* eslint-disable object-curly-newline */
import _ from 'lodash';

const plain = (diff) => {
  const iter = (data, path) => {
    if (Array.isArray(data)) {
      const result = data.reduce((acc, [status, name, value]) => {
        if (status === 'added') {
          acc.push(`Property '${path}${name}' was added with value: ${iter(value)}`);
        } else if (status === 'deleted') {
          acc.push(`Property '${path}${name}' was removed`);
        } else if (status === 'changed') {
          const [value1, value2] = value;
          acc.push(`Property '${path}${name}' was updated. From ${iter(value1)} to ${iter(value2)}`);
        } else if (_.isObject(value)) {
          acc.push(iter(value, `${path}${name}.`));
        }
        return acc;
      }, []);
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
