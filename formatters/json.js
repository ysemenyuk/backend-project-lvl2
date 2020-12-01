// import _ from 'lodash';

const json = (diff) => {
  const iter = (data) => {
    if (Array.isArray(data)) {
      const result = data.map(([status, name, propertyValue]) => {
        const [valueBefore, valueAfter] = propertyValue;
        return {
          name,
          status,
          valueBefore: iter(valueBefore),
          valueAfter: iter(valueAfter),
        };
      });
      return result;
    }
    return data;
  };
  const result = iter(diff);
  console.log(JSON.stringify(result, null, 2));
  return JSON.stringify(result, null, 2);
};

export default json;
