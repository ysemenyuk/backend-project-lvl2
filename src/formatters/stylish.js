import _ from 'lodash';

const isObject = (item) => (item instanceof Object && item.constructor === Object);
const tabsBefore = (depth) => ('  ').repeat((depth * 2) + 1);
const tabsAfter = (depth) => ('  ').repeat(depth * 2);

const formatValue = (value, depth) => {
  if (isObject(value)) {
    const formattedValue = _.entries(value).map(([key, val]) => `${tabsBefore(depth)}  ${key}: ${formatValue(val, depth + 1)}`);
    return `{\n${formattedValue.join('\n')}\n${tabsAfter(depth)}}`;
  }
  return value;
};

const statusMap = {
  added: (item, depth) => `${tabsBefore(depth)}+ ${item.name}: ${formatValue(item.value, depth + 1)}`,
  deleted: (item, depth) => `${tabsBefore(depth)}- ${item.name}: ${formatValue(item.value, depth + 1)}`,
  changed: (item, depth) => [
    `${tabsBefore(depth)}- ${item.name}: ${formatValue(item.valueBefore, depth + 1)}`,
    `${tabsBefore(depth)}+ ${item.name}: ${formatValue(item.valueAfter, depth + 1)}`,
  ],
  unchanged: (item, depth) => `${tabsBefore(depth)}  ${item.name}: ${formatValue(item.value, depth + 1)}`,
  nested: (item, depth, stylish) => `${tabsBefore(depth)}  ${item.name}: ${stylish(item.value, depth + 1)}`,
};

const stylish = (ast, depth) => {
  const formattedData = ast.map((item) => statusMap[item.status](item, depth, stylish));
  return `{\n${formattedData.flat().join('\n')}\n${tabsAfter(depth)}}`;
};

export default (ast) => stylish(ast, 0);
