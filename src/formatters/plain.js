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

const getPropertyName = (node, path) => path.concat(node.name).join('.');

const mapping = {
  added: (node, path) => `Property '${getPropertyName(node, path)}' was added with value: ${stringify(node.value)}`,
  deleted: (node, path) => `Property '${getPropertyName(node, path)}' was removed`,
  changed: (node, path) => `Property '${getPropertyName(node, path)}' was updated. From ${stringify(node.valueBefore)} to ${stringify(node.valueAfter)}`,
  unchanged: () => [],
  nested: (node, path, func) => func(node.children, [...path, node.name]),
};

const plain = (ast) => {
  const iter = (data, path) => {
    const lines = data.map((node) => mapping[node.status](node, path, iter));
    return lines.flat().join('\n');
  };
  return iter(ast, []);
};

export default plain;
