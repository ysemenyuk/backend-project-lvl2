import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

const mapping = {
  added: (item, path) => `Property '${path}${item.name}' was added with value: ${stringify(item.value)}`,
  deleted: (item, path) => `Property '${path}${item.name}' was removed`,
  changed: (item, path) => `Property '${path}${item.name}' was updated. From ${stringify(item.valueBefore)} to ${stringify(item.valueAfter)}`,
  unchanged: () => [],
  nested: (item, path, iter) => iter(item.value, `${path}${item.name}.`),
};
const plain = (ast) => {
  const iter = (data, path) => {
    const formattedData = data.map((item) => mapping[item.status](item, path, iter));
    return formattedData.flat().join('\n');
  };
  return iter(ast, '');
};

export default plain;
