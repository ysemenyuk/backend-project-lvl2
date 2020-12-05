/* eslint-disable object-curly-newline */
import _ from 'lodash';

const isObject = (item) => (item instanceof Object && item.constructor === Object);

const getProperty = (name, object1, object2, func) => {
  const property = { name };
  const value1 = object1[name];
  const value2 = object2[name];
  if (isObject(value1) && isObject(value2)) {
    property.status = 'nested';
    property.value = func(value1, value2);
  } else if (!_.has(object1, name)) {
    property.status = 'added';
    property.value = value2;
  } else if (!_.has(object2, name)) {
    property.status = 'deleted';
    property.value = value1;
  } else if (value1 !== value2) {
    property.status = 'changed';
    property.valueBefore = value1;
    property.valueAfter = value2;
  } else {
    property.status = 'unchanged';
    property.value = value1;
  }
  return property;
};

const getAST = (object1, object2) => {
  const propertiesNames = _.union(_.keys(object1), _.keys(object2));
  const sortedNames = _.sortBy(propertiesNames);
  return sortedNames.map((name) => getProperty(name, object1, object2, getAST));
};

export default getAST;
