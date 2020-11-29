import _ from 'lodash';

const stylish = (diff) => {
  const iter = (data, depth) => {
    if (!_.isObject(data)) {
      return data;
    }
    const before = ('  ').repeat((depth * 2) + 1);
    const after = ('  ').repeat(depth * 2);
    if (Array.isArray(data)) {
      const result = data.reduce((acc, [propertyStatus, propertyName, propertyValue]) => {
        if (propertyStatus === 'added') {
          acc.push(`${before}+ ${propertyName}: ${iter(propertyValue, depth + 1)}`);
        } else if (propertyStatus === 'deleted') {
          acc.push(`${before}- ${propertyName}: ${iter(propertyValue, depth + 1)}`);
        } else if (propertyStatus === 'changed') {
          const [propertyValueBefore, propertyValueAfter] = propertyValue;
          acc.push(`${before}- ${propertyName}: ${iter(propertyValueBefore, depth + 1)}`);
          acc.push(`${before}+ ${propertyName}: ${iter(propertyValueAfter, depth + 1)}`);
        } else if (propertyStatus === 'unchanged') {
          acc.push(`${before}  ${propertyName}: ${iter(propertyValue, depth + 1)}`);
        }
        return acc;
      }, {});
      return `{\n${result.flat().join('\n')}\n${after}}`;
    }
    const result = Object.entries(data).map(([key, value]) => `${before}  ${key}: ${iter(value, depth + 1)}`);
    return `{\n${result.join('\n')}\n${after}}`;
  };
  const result = iter(diff, 0);
  // console.log(result);
  return result;
};

export default stylish;
