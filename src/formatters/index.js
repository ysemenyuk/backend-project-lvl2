import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const form = {
  plain,
  stylish,
  json,
};

const format = (ast, formatter) => {
  if (!_.has(form, formatter)) {
    throw new Error(`error formatter "${formatter}"`);
  }
  return form[formatter](ast);
};

export default format;
