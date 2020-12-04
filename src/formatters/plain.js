import _ from 'lodash';

const formatValue = (value) => {
  if (!_.isObject(value) || value === null) {
    return typeof value === 'string' ? `'${value}'` : value;
  }
  return '[complex value]';
};

const formats = {
  added: (item, path) => `Property '${path}${item.name}' was added with value: ${formatValue(item.value)}`,
  deleted: (item, path) => `Property '${path}${item.name}' was removed`,
  changed: (item, path) => `Property '${path}${item.name}' was updated. From ${formatValue(item.valueBefore)} to ${formatValue(item.valueAfter)}`,
  unchanged: () => [],
};

const plain = (ast) => {
  const iter = (data, path) => {
    const result = data.map((item) => {
      if (item.children) {
        return iter(item.children, `${path}${item.name}.`);
      }
      return formats[item.status](item, path);
    });
    return `${result.flat().join('\n')}`;
  };

  return iter(ast, '');
};

export default plain;
