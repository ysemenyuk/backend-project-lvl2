import _ from 'lodash';

const plain = (diff) => {
  const iter = (data, path) => {
    if (Array.isArray(data)) {
      const result = data.map(([status, name, value]) => {
        if (status === 'parent') {
          const [children] = value;
          return iter(children, `${path}${name}.`);
        }
        const [value1, value2] = value;
        switch (status) {
          case 'added':
            return `Property '${path}${name}' was added with value: ${iter(value2)}`;
          case 'deleted':
            return `Property '${path}${name}' was removed`;
          case 'unchanged':
            return [];
          case 'changed':
            return `Property '${path}${name}' was updated. From ${iter(value1)} to ${iter(value2)}`;
          default:
            throw new Error(`Unknown status: ${status}`);
        }
      });
      return `${result.flat().join('\n')}`;
    }
    if (!_.isObject(data)) {
      return typeof data === 'string' ? `'${data}'` : data;
    }
    return '[complex value]';
  };

  const result = iter(diff, '');
  console.log(result);
  return result;
};

export default plain;
