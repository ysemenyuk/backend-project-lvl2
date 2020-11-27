#!/usr/bin/env node

import commander from 'commander';
// import genDiff from '@hexlet/code'
import genDiff from '../index.js';

const program = new commander.Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    genDiff(filepath1, filepath2, program.format);
  })
  .parse(process.argv);
