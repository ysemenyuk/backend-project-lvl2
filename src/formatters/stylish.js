import _ from 'lodash';

const getSpaseBefore = (depth) => ('  ').repeat((depth * 2) + 1);
const getSpaseAfter = (depth) => ('  ').repeat(depth * 2);

const getData = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const spaceBefore = getSpaseBefore(depth);
  const result = Object.entries(value).map(([key, val]) => `${spaceBefore}  ${key}: ${getData(val, depth + 1)}`);
  const spaceAfter = getSpaseAfter(depth);
  return `{\n${result.join('\n')}\n${spaceAfter}}`;
};

const getString = (item, depth, func) => {
  const spaceBefore = getSpaseBefore(depth);
  switch (item.status) {
    case 'added':
      return `${spaceBefore}+ ${item.name}: ${getData(item.value, depth + 1)}`;
    case 'deleted':
      return `${spaceBefore}- ${item.name}: ${getData(item.value, depth + 1)}`;
    case 'changed':
      return [
        `${spaceBefore}- ${item.name}: ${getData(item.valueBefore, depth + 1)}`,
        `${spaceBefore}+ ${item.name}: ${getData(item.valueAfter, depth + 1)}`,
      ];
    case 'unchanged':
      return `${spaceBefore}  ${item.name}: ${getData(item.value, depth + 1)}`;
    default:
      return `${spaceBefore}  ${item.name}: ${func(item.children, depth + 1)}`;
  }
};

const stylish = (ast) => {
  const iter = (data, depth) => {
    const result = data.map((item) => getString(item, depth, iter));
    const spaceAfter = getSpaseAfter(depth);
    return `{\n${result.flat().join('\n')}\n${spaceAfter}}`;
  };
  return iter(ast, 0);
};

export default stylish;
