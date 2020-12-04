import yaml from 'js-yaml';
import _ from 'lodash';

const parse = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

const parser = (data, type) => {
  if (!_.has(parse, type)) {
    throw new Error(`error parse "${type}" files`);
  }
  return parse[type](data);
};

export default parser;
