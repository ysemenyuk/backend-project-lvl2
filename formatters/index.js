import stylish from './stylish.js';
import plain from './plain.js';

const format = (different, formatter = 'stylish') => {
  if (formatter === 'plain') {
    return plain(different);
  }
  return stylish(different);
};

export default format;
