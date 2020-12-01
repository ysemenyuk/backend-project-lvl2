import _ from 'lodash';

const getDiff = (object1, object2) => {
  const resultPropertyNames = _.union(Object.keys(object1), Object.keys(object2));
  return resultPropertyNames
    .sort()
    .reduce((acc, name) => {
      if (!_.has(object2, name)) {
        acc.push(['deleted', name, [object1[name], undefined]]);
      } else if (!_.has(object1, name)) {
        acc.push(['added', name, [undefined, object2[name]]]);
      } else if (_.isObject(object1[name]) && _.isObject(object2[name])) {
        acc.push(['objects', name, [getDiff(object1[name], object2[name])]]);
      } else if (object1[name] === object2[name]) {
        acc.push(['unchanged', name, [object1[name], object2[name]]]);
      } else if (object1[name] !== object2[name]) {
        acc.push(['changed', name, [object1[name], object2[name]]]);
      }
      return acc;
    }, []);
};

export default getDiff;
