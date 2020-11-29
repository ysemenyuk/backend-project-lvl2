import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parser = (filepath) => {
  if (!filepath || typeof filepath !== 'string') {
    throw new Error(`error: cannot parse ${filepath}`);
  }
  const fp = path.resolve('__fixtures__', filepath);
  const file = fs.readFileSync(fp, 'utf8');

  if (path.extname(filepath) === '.json') {
    return JSON.parse(file);
  }
  if (path.extname(filepath) === '.yml') {
    return yaml.safeLoad(file);
  }
  throw new Error(`error: cannot parse ${path.extname(filepath)} files`);
};

export default parser;
