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
  added: (node, path) => `Property '${path}${node.name}' was added with value: ${stringify(node.value)}`,
  deleted: (node, path) => `Property '${path}${node.name}' was removed`,
  changed: (node, path) => `Property '${path}${node.name}' was updated. From ${stringify(node.deletedValue)} to ${stringify(node.value)}`,
  unchanged: () => [],
  nested: (node, path, func) => func(node.value, `${path}${node.name}.`),
};

const plain = (ast) => {
  const iter = (data, path) => {
    const lines = data.map((node) => mapping[node.status](node, path, iter));
    return lines.flat().join('\n');
  };
  return iter(ast, '');
};

export default plain;
