import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parser = (filepath) => {
  if (filepath) {
    if (filepath.endsWith('json')) {
      const file = fs.readFileSync(path.resolve('__fixtures__', filepath), 'utf8');
      return JSON.parse(file);
    }
    if (filepath.endsWith('yml')) {
      const file = fs.readFileSync(path.resolve('__fixtures__', filepath), 'utf8');
      return yaml.safeLoad(file);
    }
  }
  throw new Error('parser error');
};

// parser('sss');

export default parser;
