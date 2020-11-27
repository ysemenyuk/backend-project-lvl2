/* eslint-disable object-curly-newline */
import _ from 'lodash';

const stylish = (diff) => {
  const iter = (data, depth) => {
    const before = ('  ').repeat((depth * 2) + 1);
    const after = ('  ').repeat(depth * 2);
    if (Array.isArray(data)) {
      const result = data.reduce((acc, { state, name, value1, value2 }) => {
        if (state === 'added') {
          acc.push(`${before}+ ${name}: ${iter(value2, depth + 1)}`);
        } else if (state === 'deleted') {
          acc.push(`${before}- ${name}: ${iter(value1, depth + 1)}`);
        } else if (state === 'changed') {
          acc.push(`${before}- ${name}: ${iter(value1, depth + 1)}`, `${before}+ ${name}: ${iter(value2, depth + 1)}`);
        } else if (state === 'unchanged') {
          acc.push(`${before}  ${name}: ${iter(value1, depth + 1)}`);
        }
        return acc;
      }, []);
      return `{\n${result.join('\n')}\n${after}}`;
    }
    if (!_.isObject(data)) {
      return `${data}`;
    }
    const result = Object.entries(data).map(([key, value]) => `${before}  ${key}: ${iter(value, depth + 1)}`);
    return `{\n${result.join('\n')}\n${after}}`;
  };
  const result = iter(diff, 0);
  console.log(result);
  return result;
};

export default stylish;
