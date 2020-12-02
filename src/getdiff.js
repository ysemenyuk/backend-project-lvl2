import _ from 'lodash';
import pkg from 'immutable';

const { List } = pkg;

const getDiff = (object1, object2) => {
  const resultPropertyNames = List(_.union(Object.keys(object1), Object.keys(object2)));
  const sortedNames = resultPropertyNames.sort();
  const result = sortedNames
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
  return result.toArray();
};

export default getDiff;
