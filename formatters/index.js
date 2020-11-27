import stylish from './stylish.js';
import plain from './plain.js';

const format = (data, formatName = 'stylish') => {
  if (formatName === 'plain') {
    return plain(data);
  }
  return stylish(data);
};

export default format;
