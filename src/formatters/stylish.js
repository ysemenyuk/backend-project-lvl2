import _ from 'lodash';

const indent = (depth) => ('  ').repeat(depth * 2);

const output = (lines, depth) => `{\n${lines.flat().join('\n')}\n${indent(depth)}}`;

const stringify = (data, depth, mapping) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const formattedData = _.entries(data)
    .map(([name, value]) => mapping.unchanged({ name, value }, depth));
  return output(formattedData, depth);
};

const mapping = {
  added: (node, depth) => `${indent(depth)}  + ${node.name}: ${stringify(node.value, depth + 1, mapping)}`,
  deleted: (node, depth) => `${indent(depth)}  - ${node.name}: ${stringify(node.deletedValue, depth + 1, mapping)}`,
  changed: (node, depth) => [
    `${indent(depth)}  - ${node.name}: ${stringify(node.deletedValue, depth + 1, mapping)}`,
    `${indent(depth)}  + ${node.name}: ${stringify(node.value, depth + 1, mapping)}`,
  ],
  unchanged: (node, depth) => `${indent(depth)}    ${node.name}: ${stringify(node.value, depth + 1, mapping)}`,
  nested: (node, depth, iter) => `${indent(depth)}    ${node.name}: ${iter(node.value, depth + 1)}`,
};

const stylish = (ast) => {
  const iter = (data, depth) => {
    const formattedData = data
      .map((node) => mapping[node.status](node, depth, iter));
    return output(formattedData, depth);
  };
  return iter(ast, 0);
};

export default stylish;
