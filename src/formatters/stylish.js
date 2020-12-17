import _ from 'lodash';

const indent = (depth) => ('  ').repeat(depth * 2);

const format = (lines, depth) => `{\n${lines.flat().join('\n')}\n${indent(depth)}}`;

const stringify = (data, depth, mapping) => {
  if (!_.isPlainObject(data)) {
    return data;
  }

  const lines = _.entries(data).map(([name, value]) => {
    const node = { name, value };
    return mapping.unchanged(node, depth);
  });

  return format(lines, depth);
};

const mapping = {
  added: (node, depth) => `${indent(depth)}  + ${node.name}: ${stringify(node.value, depth + 1, mapping)}`,
  deleted: (node, depth) => `${indent(depth)}  - ${node.name}: ${stringify(node.deletedValue, depth + 1, mapping)}`,
  changed: (node, depth) => `${mapping.deleted(node, depth, mapping)}\n${mapping.added(node, depth, mapping)}`,
  unchanged: (node, depth) => `${indent(depth)}    ${node.name}: ${stringify(node.value, depth + 1, mapping)}`,
  nested: (node, depth, func) => `${indent(depth)}    ${node.name}: ${func(node.value, depth + 1)}`,
};

const stylish = (ast) => {
  const iter = (data, depth) => {
    const lines = data.map((node) => mapping[node.status](node, depth, iter));
    return format(lines, depth);
  };

  return iter(ast, 0);
};

export default stylish;
