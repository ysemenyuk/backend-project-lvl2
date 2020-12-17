import _ from 'lodash';

const buildAst = (object1, object2) => {
  const propertiesNames = _.union(_.keys(object1), _.keys(object2));
  const sortedNames = _.sortBy(propertiesNames);

  const ast = sortedNames.map((name) => {
    if (!_.has(object1, name)) {
      return {
        name,
        status: 'added',
        value: object2[name],
      };
    }

    if (!_.has(object2, name)) {
      return {
        name,
        status: 'deleted',
        deletedValue: object1[name],
      };
    }

    if (_.isPlainObject(object1[name]) && _.isPlainObject(object2[name])) {
      return {
        name,
        status: 'nested',
        value: buildAst(object1[name], object2[name]),
      };
    }

    if (!_.isEqual(object1[name], object2[name])) {
      return {
        name,
        status: 'changed',
        value: object2[name],
        deletedValue: object1[name],
      };
    }

    return {
      name, status: 'unchanged', value: object1[name],
    };
  });

  return ast;
};

export default buildAst;
