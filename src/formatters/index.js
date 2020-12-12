import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';

const mapping = {
  plain,
  stylish,
  json: JSON.stringify,
};

const format = (ast, formatter) => {
  if (!_.has(mapping, formatter)) {
    throw new Error(`no this formatter "${formatter}"`);
  }
  return mapping[formatter](ast);
};

export default format;
