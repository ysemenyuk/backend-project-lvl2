import _ from 'lodash';

const formatValue = (value) => {
  if (!_.isObject(value) || value === null) {
    return typeof value === 'string' ? `'${value}'` : value;
  }
  return '[complex value]';
};

const statusMap = {
  added: (item, path) => `Property '${path}${item.name}' was added with value: ${formatValue(item.value)}`,
  deleted: (item, path) => `Property '${path}${item.name}' was removed`,
  changed: (item, path) => `Property '${path}${item.name}' was updated. From ${formatValue(item.valueBefore)} to ${formatValue(item.valueAfter)}`,
  unchanged: () => [],
  nested: (item, path, plain) => plain(item.value, `${path}${item.name}.`),
};

const plain = (data, path) => {
  const formattedData = data.map((item) => statusMap[item.status](item, path, plain));
  return `${formattedData.flat().join('\n')}`;
};

export default (ast) => plain(ast, '');
