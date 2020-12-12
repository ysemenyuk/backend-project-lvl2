import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.resolve('__fixtures__', filename);

test('gendiff "errors"', () => {
  expect(() => genDiff('__fixtures__/file1.json')).toThrow();
  expect(() => genDiff('__fixtures__/file1.json', '__fixtures__/expected_json.txt')).toThrow();
  expect(() => genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'fff')).toThrow();
});

test.each([
  ['json', 'stylish'],
  ['yml', 'stylish'],
  ['json', 'plain'],
  ['yml', 'plain'],
  ['json', 'json'],
  ['yml', 'json'],
])('gendiff %s-files %s-formatter', (extension, formatter) => {
  const file1 = getFixturePath(`file1.${extension}`);
  const file2 = getFixturePath(`file2.${extension}`);
  const expectedFile = getFixturePath(`expected_${formatter}.txt`);
  const expected = fs.readFileSync(expectedFile, 'utf-8');
  expect(genDiff(file1, file2, formatter)).toEqual(expected);
});
