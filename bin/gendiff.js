#!/usr/bin/env node

import commander from 'commander';
import fs from 'fs';
// import path from 'path';
// import genDiff from '@hexlet/code'
import genDiff from '../index.js'

const program = new commander.Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format' )
  .action((filepath1, filepath2) => {
    // console.log(filepath1, filepath2)

    const file1Data = fs.readFileSync(filepath1, 'utf8');
    // console.log(file1Data)

    const file2Data = fs.readFileSync(filepath2, 'utf8');
    // console.log(file1Data)

    genDiff(file1Data, file2Data)

  })
  .parse(process.argv)



