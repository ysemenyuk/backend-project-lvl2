import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const form = {
  plain: (diff) => plain(diff),
  stylish: (diff) => stylish(diff),
  json: (diff) => json(diff),
};

const format = (diff, formatter) => {
  if (_.has(form, formatter)) {
    return form[formatter](diff);
  }
  throw new Error(`error formatter "${formatter}"`);
};

export default format;
