import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import _ from 'lodash';

// import { fileURLToPath } from 'url';
// import path, { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const parse = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

const readFile = (filepath) => {
  const fullfilepath = path.resolve(filepath);

  return fs.readFileSync(fullfilepath, 'utf8');
};

const getExtension = (filepath) => {
  const extname = path.extname(filepath);
  return extname.substring(1);
};

const parser = (filepath) => {
  const file = readFile(filepath);
  const extname = getExtension(filepath);
  if (_.has(parse, extname)) {
    return parse[extname](file);
  }
  throw new Error(`error parse "${extname}" files`);
};

// console.log(readFile('/mnt/c/webprojects/backend-project-lvl2/__fixtures__/file2.json'));
// console.log(readFile('__fixtures__/file2.json'));

export default parser;
