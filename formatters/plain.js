/* eslint-disable object-curly-newline */
import _ from 'lodash';

const plain = (data1) => {
  const iter = (data, path) => {
    if (Array.isArray(data)) {
      const result = data.reduce((acc, { state, name, value1, value2 }) => {
        if (state === 'added') {
          acc.push(`Property '${path}${name}' was added with value: '${iter(value2)}'`);
        } else if (state === 'deleted') {
          acc.push(`Property '${path}${name}' was removed`);
        } else if (state === 'changed') {
          acc.push(`Property '${path}${name}' was updated. From '${iter(value1)}' to '${iter(value2)}'`);
        } else if (_.isObject(value1)) {
          acc.push(iter(value1, `${path}${name}.`));
        }
        return acc;
      }, []);
      return `${result.flat().join('\n')}`;
    }
    if (!_.isObject(data)) {
      return `${data}`;
    }
    return '[complex value]';
  };

  const result = iter(data1, '');
  console.log(result);
  return result;
};

export default plain;
