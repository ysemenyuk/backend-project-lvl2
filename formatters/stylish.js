import _ from 'lodash';

const stylish = (diff) => {
  const iter = (data, depth) => {
    const newDepth = depth + 1;
    const before = ('  ').repeat((depth * 2) + 1);
    const after = ('  ').repeat(depth * 2);
    if (Array.isArray(data)) {
      const result = data.map(([propertyStatus, propertyName, propertyValue]) => {
        if (propertyStatus === 'parent') {
          const [children] = propertyValue;
          return `${before}  ${propertyName}: ${iter(children, newDepth)}`;
        }
        const [valueBefore, valueAfter] = propertyValue;
        switch (propertyStatus) {
          case 'added':
            return `${before}+ ${propertyName}: ${iter(valueAfter, newDepth)}`;
          case 'deleted':
            return `${before}- ${propertyName}: ${iter(valueBefore, newDepth)}`;
          case 'unchanged':
            return `${before}  ${propertyName}: ${iter(valueBefore, newDepth)}`;
          case 'changed':
            return [
              `${before}- ${propertyName}: ${iter(valueBefore, newDepth)}`,
              `${before}+ ${propertyName}: ${iter(valueAfter, newDepth)}`,
            ];
          default:
            throw new Error(`Unknown status: ${propertyStatus}`);
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
  return result;
};

export default stylish;
