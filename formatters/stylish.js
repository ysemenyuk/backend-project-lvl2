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

const getString = (item, depth) => {
  const [status, name, value] = item;
  const [valueBefore, valueAfter] = value;
  const spaceBefore = getSpaseBefore(depth);
  switch (status) {
    case 'added':
      return `${spaceBefore}+ ${name}: ${getData(valueAfter, depth + 1)}`;
    case 'deleted':
      return `${spaceBefore}- ${name}: ${getData(valueBefore, depth + 1)}`;
    case 'unchanged':
      return `${spaceBefore}  ${name}: ${getData(valueBefore, depth + 1)}`;
    case 'changed':
      return [
        `${spaceBefore}- ${name}: ${getData(valueBefore, depth + 1)}`,
        `${spaceBefore}+ ${name}: ${getData(valueAfter, depth + 1)}`,
      ];
    default:
      throw new Error(`Unknown status: ${status}`);
  }
};

const stylish = (diff) => {
  const iter = (data, depth) => {
    const result = data.map((item) => {
      const [status, name, value] = item;
      const spaceBefore = getSpaseBefore(depth);
      if (status === 'parent') {
        return `${spaceBefore}  ${name}: ${iter(value, depth + 1)}`;
      }
      return getString(item, depth);
    });
    const spaceAfter = getSpaseAfter(depth);
    return `{\n${result.flat().join('\n')}\n${spaceAfter}}`;
  };
  return iter(diff, 0);
};

export default stylish;
