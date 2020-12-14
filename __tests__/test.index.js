import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.resolve('__fixtures__', filename);
const getExpected = (format) => fs.readFileSync(getFixturePath(`expected_${format}.txt`), 'utf-8');

const filesFormats = ['json', 'yml'];

test('gendiff errors', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('expected_stylish.txt');
  expect(() => genDiff(file1)).toThrow();
  expect(() => genDiff(file1, file2)).toThrow();
  expect(() => genDiff(file1, file1, 'fff')).toThrow();
});

test.each(filesFormats)('gendiff %s-files', (extension) => {
  const file1 = getFixturePath(`file1.${extension}`);
  const file2 = getFixturePath(`file2.${extension}`);
  expect(genDiff(file1, file2)).toEqual(getExpected('stylish'));
  expect(genDiff(file1, file2, 'stylish')).toEqual(getExpected('stylish'));
  expect(genDiff(file1, file2, 'plain')).toEqual(getExpected('plain'));
  expect(genDiff(file1, file2, 'json')).toEqual(getExpected('json'));
});
