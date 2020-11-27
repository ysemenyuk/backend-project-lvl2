import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parser = (filepath) => {
  if (!filepath) {
    throw new Error(`error: cannot parse ${filepath}`);
  }
  const fp = path.resolve('__fixtures__', filepath);
  if (!fs.existsSync(fp)) {
    throw new Error(`error: ${filepath} not found`);
  }
  const file = fs.readFileSync(fp, 'utf8');
  if (path.extname(filepath) === '.json') {
    return JSON.parse(file);
  }
  if (fp.endsWith('.yml')) {
    return yaml.safeLoad(file);
  }
  throw new Error(`error: cannot parse ${path.extname(filepath)} files`);
};

// parser('file1.js');

export default parser;