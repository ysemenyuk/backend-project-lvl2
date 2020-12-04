import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

test('gendiff', () => {
  expect(() => genDiff('__fixtures__/file1.json')).toThrow();
  expect(() => genDiff('__fixtures__/file1.json', 'file')).toThrow();
  expect(() => genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'fff')).toThrow();
});

test('gendiff stylish', () => {
  const getFixturePath = (filename) => path.join(process.cwd(), '__fixtures__', filename);
  const expected = fs.readFileSync(getFixturePath('expected_stylish.txt'), 'utf-8');
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(expected);
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml')).toEqual(expected);
});

test('gendiff plain', () => {
  const getFixturePath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);
  const expected = fs.readFileSync(getFixturePath('expected_plain.txt'), 'utf-8');
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain')).toEqual(expected);
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'plain')).toEqual(expected);
});

test('gendiff json', () => {
  const getFixturePath = (filename) => path.resolve('__fixtures__', filename);
  const expected = fs.readFileSync(getFixturePath('expected_json.json'), 'utf-8');
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'json')).toEqual(expected);
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'json')).toEqual(expected);
});
