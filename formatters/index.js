import stylish from './stylish.js';
import plain from './plain.js';

const format = (data, formatter = 'stylish') => {
  if (formatter === 'plain') {
    return plain(data);
  }
  if (!formatter || formatter === 'stylish') {
    return stylish(data);
  }
  throw new Error(`error: bad formatter ${formatter}`);
};

export default format;
