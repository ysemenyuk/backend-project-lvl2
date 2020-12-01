import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const map = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
};

const parser = (filepath) => {
  if (!filepath || typeof filepath !== 'string') {
    throw new Error(`error: cannot parse ${filepath}`);
  }

  const fullfilepath = path.join('__fixtures__', filepath);
  const file = fs.readFileSync(fullfilepath, 'utf8');
  const extname = path.extname(filepath);

  return map[extname](file);
};

console.log(parser('file1.yml'));

export default parser;
