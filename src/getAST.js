/* eslint-disable object-curly-newline */
import _ from 'lodash';

const isObject = (item) => (item instanceof Object && item.constructor === Object);

const getProperty = (name, object1, object2, getAST) => {
  const value1 = object1[name];
  const value2 = object2[name];
  if (isObject(value1) && isObject(value2)) {
    return { name, status: 'nested', value: getAST(value1, value2) };
  }
  if (!_.has(object1, name)) {
    return { name, status: 'added', value: value2 };
  }
  if (!_.has(object2, name)) {
    return { name, status: 'deleted', value: value1 };
  }
  if (value1 !== value2) {
    return { name, status: 'changed', valueBefore: value1, valueAfter: value2 };
  }
  return { name, status: 'unchanged', value: value1 };
};

const getAST = (object1, object2) => {
  const propertiesNames = _.union(_.keys(object1), _.keys(object2));
  const sortedNames = _.sortBy(propertiesNames);
  return sortedNames.map((name) => getProperty(name, object1, object2, getAST));
};

export default getAST;
