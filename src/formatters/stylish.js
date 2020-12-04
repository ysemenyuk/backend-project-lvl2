import _ from 'lodash';

const tabsBefore = (depth) => ('  ').repeat((depth * 2) + 1);
const tabsAfter = (depth) => ('  ').repeat(depth * 2);

const formatValue = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const result = _.entries(value).map(([key, val]) => `${tabsBefore(depth)}  ${key}: ${formatValue(val, depth + 1)}`);
  return `{\n${result.join('\n')}\n${tabsAfter(depth)}}`;
};

const format = {
  added: (item, depth) => `${tabsBefore(depth)}+ ${item.name}: ${formatValue(item.value, depth + 1)}`,
  deleted: (item, depth) => `${tabsBefore(depth)}- ${item.name}: ${formatValue(item.value, depth + 1)}`,
  changed: (item, depth) => [
    `${tabsBefore(depth)}- ${item.name}: ${formatValue(item.valueBefore, depth + 1)}`,
    `${tabsBefore(depth)}+ ${item.name}: ${formatValue(item.valueAfter, depth + 1)}`,
  ],
  unchanged: (item, depth) => `${tabsBefore(depth)}  ${item.name}: ${formatValue(item.value, depth + 1)}`,
  nested: (item, depth, func) => `${tabsBefore(depth)}  ${item.name}: ${func(item.value, depth + 1)}`,
};

const stylish = (ast) => {
  const iter = (data, depth) => {
    const formattedData = data.map((item) => format[item.status](item, depth, iter));
    return `{\n${formattedData.flat().join('\n')}\n${tabsAfter(depth)}}`;
  };
  return iter(ast, 0);
};

export default stylish;
