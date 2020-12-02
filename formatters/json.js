const json = (diff) => {
  const iter = (data) => {
    if (Array.isArray(data)) {
      const result = data.map(([propertyStatus, propertyName, propertyValue]) => {
        if (propertyStatus === 'parent') {
          const [children] = propertyValue;
          return {
            propertyName,
            propertyStatus,
            children: iter(children),
          };
        }
        const [valueBefore, valueAfter] = propertyValue;
        return {
          propertyName,
          propertyStatus,
          valueBefore: iter(valueBefore),
          valueAfter: iter(valueAfter),
        };
      });
      return result;
    }
    return data;
  };
  const result = iter(diff);
  return JSON.stringify(result, null, 2);
};

export default json;
