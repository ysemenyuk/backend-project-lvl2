import yaml from 'js-yaml';
import _ from 'lodash';

const mapping = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

const parse = (data, type) => {
  if (!_.has(mapping, type)) {
    throw new Error(`cannot parse file this type "${type}"`);
  }
  return mapping[type](data);
};

export default parse;
