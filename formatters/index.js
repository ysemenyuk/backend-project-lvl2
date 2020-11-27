import stylish from './stylish.js';
import plain from './plain.js';

const format = (data, formatter = 'stylish') => {
  if (formatter === 'plain') {
    return plain(data);
  }
  return stylish(data);
};

export default format;
