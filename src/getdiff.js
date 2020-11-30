/* eslint-disable object-curly-newline */
import _ from 'lodash';

const getDiff = (object1, object2) => {
  const resultKeys = _.union(Object.keys(object1), Object.keys(object2));
  return resultKeys
    .sort()
    .map((key) => {
      if (!_.has(object2, key)) {
        return ['deleted', key, [object1[key], undefined]];
      }
      if (!_.has(object1, key)) {
        return ['added', key, [undefined, object2[key]]];
      }
      if (_.isObject(object1[key]) && _.isObject(object2[key])) {
        return ['objects', key, [getDiff(object1[key], object2[key])]];
      }
      if (object1[key] === object2[key]) {
        return ['unchanged', key, [object1[key], object2[key]]];
      }
      return ['changed', key, [object1[key], object2[key]]];
    });
};

export default getDiff;
