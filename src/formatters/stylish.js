import _ from 'lodash';

const indent = (depth) => ('  ').repeat(depth * 2);

const stringify = (data, depth) => {
  if (_.isPlainObject(data)) {
    const formattedData = _.entries(data).map(([key, value]) => `${indent(depth)}    ${key}: ${stringify(value, depth + 1)}`);
    return `{\n${formattedData.join('\n')}\n${indent(depth)}}`;
  }
  return data;
};

const mapping = {
  added: (item, depth) => `${indent(depth)}  + ${item.name}: ${stringify(item.value, depth + 1)}`,
  deleted: (item, depth) => `${indent(depth)}  - ${item.name}: ${stringify(item.value, depth + 1)}`,
  changed: (item, depth) => [
    `${indent(depth)}  - ${item.name}: ${stringify(item.valueBefore, depth + 1)}`,
    `${indent(depth)}  + ${item.name}: ${stringify(item.valueAfter, depth + 1)}`,
  ],
  unchanged: (item, depth) => `${indent(depth)}    ${item.name}: ${stringify(item.value, depth + 1)}`,
  nested: (item, depth, iter) => `${indent(depth)}    ${item.name}: ${iter(item.value, depth + 1)}`,
};

const stylish = (ast) => {
  const iter = (data, depth) => {
    const formattedData = data.map((item) => mapping[item.status](item, depth, iter));
    return `{\n${formattedData.flat().join('\n')}\n${indent(depth)}}`;
  };
  return iter(ast, 0);
};

export default stylish;
