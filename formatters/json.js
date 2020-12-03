/* eslint-disable object-curly-newline */

const getData = (item) => {
  const [status, name, value] = item;
  const [valueBefore, valueAfter] = value;
  switch (status) {
    case 'added':
      return { name, status, value: valueAfter };
    case 'deleted':
    case 'unchanged':
      return { name, status, value: valueBefore };
    case 'changed':
      return { name, status, valueBefore, valueAfter };
    default:
      throw new Error(`Unknown status: ${status}`);
  }
};

const json = (diff) => {
  const iter = (data) => data.map((item) => {
    const [status, name, value] = item;
    if (status === 'parent') {
      return { name, status, children: iter(value) };
    }
    return getData(item);
  });
  const resultObject = iter(diff);
  return JSON.stringify(resultObject, null, 2);
};

export default json;
