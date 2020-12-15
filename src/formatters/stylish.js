import _ from 'lodash';

const indent = (depth) => ('  ').repeat(depth * 2);

const format = (lines, depth) => `{\n${lines.flat().join('\n')}\n${indent(depth)}}`;

const mapping = {
  added: (node, depth, func) => `${indent(depth)}  + ${node.name}: ${func(node.value, depth + 1)}`,
  deleted: (node, depth, func) => `${indent(depth)}  - ${node.name}: ${func(node.deletedValue, depth + 1)}`,
  changed: (node, depth, func) => `${mapping.deleted(node, depth, func)}\n${mapping.added(node, depth, func)}`,
  unchanged: (node, depth, func) => `${indent(depth)}    ${node.name}: ${func(node.value, depth + 1)}`,
};

const stringify = (data, depth) => {
  if (_.isPlainObject(data)) {
    const lines = _.entries(data).map(([name, value]) => {
      const node = { name, value };
      return mapping.unchanged(node, depth, stringify);
    });
    return format(lines, depth);
  }
  return data;
};

const stylish = (ast) => {
  const iter = (data, depth) => {
    const lines = data.map((node) => {
      if (node.status === 'nested') {
        return mapping.unchanged(node, depth, iter);
      }
      return mapping[node.status](node, depth, stringify);
    });
    return format(lines, depth);
  };
  return iter(ast, 0);
};

export default stylish;
