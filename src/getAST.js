/* eslint-disable object-curly-newline */
import _ from 'lodash';

const isObject = (item) => (item instanceof Object && item.constructor === Object);

const getAST = (object1, object2) => {
  const resultPropertyNames = _.union(_.keys(object1), _.keys(object2));
  const sortedNames = _.sortBy(resultPropertyNames);
  const result = sortedNames
    .map((name) => {
      if (isObject(object1[name]) && isObject(object2[name])) {
        return { name, children: getAST(object1[name], object2[name]) };
      }

      if (!_.has(object2, name)) {
        return { name, status: 'deleted', value: object1[name] };
      }
      if (!_.has(object1, name)) {
        return { name, status: 'added', value: object2[name] };
      }
      if (object1[name] !== object2[name]) {
        return { name, status: 'changed', valueBefore: object1[name], valueAfter: object2[name] };
      }
      return { name, status: 'unchanged', value: object1[name] };
    });
  return result;
};

export default getAST;
