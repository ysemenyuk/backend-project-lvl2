import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import _ from 'lodash';

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

export default parser;
