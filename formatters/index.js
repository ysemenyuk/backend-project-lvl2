import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const format = (different, formatter = 'stylish') => {
  if (!formatter || formatter === 'stylish') {
    return stylish(different);
  }
  if (formatter === 'plain') {
    return plain(different);
  }
  if (formatter === 'json') {
    return json(different);
  }
  throw new Error(`error format ${formatter}`);
};

export default format;
