import _ from 'lodash';

const getData = (value) => {
  if (!_.isObject(value)) {
    return typeof value === 'string' ? `'${value}'` : value;
  }
  return '[complex value]';
};

const getString = (item, path) => {
  const [status, name, value] = item;
  const [valueBefore, valueAfter] = value;
  switch (status) {
    case 'added':
      return `Property '${path}${name}' was added with value: ${getData(valueAfter)}`;
    case 'deleted':
      return `Property '${path}${name}' was removed`;
    case 'unchanged':
      return [];
    case 'changed':
      return `Property '${path}${name}' was updated. From ${getData(valueBefore)} to ${getData(valueAfter)}`;
    default:
      throw new Error(`Unknown status: ${status}`);
  }
};

const plain = (diff) => {
  const iter = (data, path) => {
    const result = data.map((item) => {
      const [status, name, value] = item;
      if (status === 'parent') {
        return iter(value, `${path}${name}.`);
      }
      return getString(item, path);
    });
    return `${result.flat().join('\n')}`;
  };

  return iter(diff, '');
};

export default plain;
