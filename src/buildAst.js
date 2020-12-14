/* eslint-disable object-curly-newline */
import _ from 'lodash';

const buildAst = (object1, object2) => {
  const propertiesNames = _.union(_.keys(object1), _.keys(object2));
  const sortedNames = _.sortBy(propertiesNames);
  return sortedNames.map((name) => {
    const value1 = object1[name];
    const value2 = object2[name];
    if (!_.has(object1, name)) {
      return { name, status: 'added', value: value2 };
    }
    if (!_.has(object2, name)) {
      return { name, status: 'deleted', deletedValue: value1 };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { name, status: 'nested', value: buildAst(value1, value2) };
    }
    if (!_.isEqual(value1, value2)) {
      return { name, status: 'changed', value: value2, deletedValue: value1 };
    }
    return { name, status: 'unchanged', value: value1 };
  });
};

export default buildAst;
