import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formsMap = {
  plain,
  stylish,
  json,
};

const format = (ast, formatter) => {
  if (!_.has(formsMap, formatter)) {
    throw new Error(`error formatter "${formatter}"`);
  }
  return formsMap[formatter](ast);
};

export default format;
