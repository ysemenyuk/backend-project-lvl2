import yaml from 'js-yaml';
import _ from 'lodash';

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

const parse = (data, type) => {
  if (!_.has(parsers, type)) {
    throw new Error(`error parse "${type}" files`);
  }
  return parsers[type](data);
};

export default parse;
