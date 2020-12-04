import _ from 'lodash';

const formatValue = (value) => {
  if (!_.isObject(value) || value === null) {
    return typeof value === 'string' ? `'${value}'` : value;
  }
  return '[complex value]';
};

const format = {
  added: (item, path) => `Property '${path}${item.name}' was added with value: ${formatValue(item.value)}`,
  deleted: (item, path) => `Property '${path}${item.name}' was removed`,
  changed: (item, path) => `Property '${path}${item.name}' was updated. From ${formatValue(item.valueBefore)} to ${formatValue(item.valueAfter)}`,
  unchanged: () => [],
  parent: (item, path, func) => func(item.value, `${path}${item.name}.`),
};

const plain = (ast) => {
  const iter = (data, path) => {
    const formattedData = data.map((item) => format[item.status](item, path, iter));
    return `${formattedData.flat().join('\n')}`;
  };
  return iter(ast, '');
};

export default plain;
