import _ from 'lodash';

const indent = (depth) => ('  ').repeat(depth * 2);

const makeOutput = (lines, depth) => `{\n${lines.flat().join('\n')}\n${indent(depth)}}`;

const stringify = (data, depth, mapping) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const formattedData = _.entries(data)
    .map(([name, value]) => mapping.unchanged({ name, value }, depth));
  return makeOutput(formattedData, depth);
};

const mapping = {
  added: (node, depth) => `${indent(depth)}  + ${node.name}: ${stringify(node.value, depth + 1, mapping)}`,
  deleted: (node, depth) => `${indent(depth)}  - ${node.name}: ${stringify(node.value, depth + 1, mapping)}`,
  changed: (node, depth) => [
    `${indent(depth)}  - ${node.name}: ${stringify(node.valueBefore, depth + 1, mapping)}`,
    `${indent(depth)}  + ${node.name}: ${stringify(node.valueAfter, depth + 1, mapping)}`,
  ],
  unchanged: (node, depth) => `${indent(depth)}    ${node.name}: ${stringify(node.value, depth + 1, mapping)}`,
  nested: (node, depth, iter) => `${indent(depth)}    ${node.name}: ${iter(node.children, depth + 1)}`,
};

const stylish = (ast) => {
  const iter = (data, depth) => {
    const formattedData = data
      .map((node) => mapping[node.status](node, depth, iter));
    return makeOutput(formattedData, depth);
  };
  return iter(ast, 0);
};

export default stylish;
