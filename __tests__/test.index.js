import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

test('gendiff "errors"', () => {
  expect(() => genDiff('__fixtures__/file1.json')).toThrow();
  expect(() => genDiff('__fixtures__/file1.json', 'file')).toThrow();
  expect(() => genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'fff')).toThrow();
});

test.each([
  ['stylish', '__fixtures__/file1.json', '__fixtures__/file2.json', 'expected_stylish.txt'],
  ['stylish', '__fixtures__/file1.yml', '__fixtures__/file2.yml', 'expected_stylish.txt'],
  ['plain', '__fixtures__/file1.json', '__fixtures__/file2.json', 'expected_plain.txt'],
  ['plain', '__fixtures__/file1.yml', '__fixtures__/file2.yml', 'expected_plain.txt'],
  ['json', '__fixtures__/file1.json', '__fixtures__/file2.json', 'expected_json.json'],
  ['json', '__fixtures__/file1.yml', '__fixtures__/file2.yml', 'expected_json.json'],
])('gendiff "%s" "%s" "%s"', (f, a, b, e) => {
  const getFixturePath = (filename) => path.resolve('__fixtures__', filename);
  const expected = fs.readFileSync(getFixturePath(e), 'utf-8');
  expect(genDiff(a, b, f)).toEqual(expected);
});
