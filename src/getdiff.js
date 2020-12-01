import _ from 'lodash';

const getDiff = (object1, object2) => {
  const resultPropertyNames = _.union(Object.keys(object1), Object.keys(object2));
  return resultPropertyNames
    .slice()
    .sort()
    .map((name) => {
      if (!_.has(object2, name)) {
        return ['deleted', name, [object1[name], undefined]];
      }
      if (!_.has(object1, name)) {
        return ['added', name, [undefined, object2[name]]];
      }
      if (_.isObject(object1[name]) && _.isObject(object2[name])) {
        return ['parent', name, [getDiff(object1[name], object2[name])]];
      }
      if (object1[name] === object2[name]) {
        return ['unchanged', name, [object1[name], object2[name]]];
      }
      return ['changed', name, [object1[name], object2[name]]];
    });
};

export default getDiff;
