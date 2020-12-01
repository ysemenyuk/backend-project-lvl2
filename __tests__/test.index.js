import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('gendiff', () => {
  expect(() => genDiff('file1.json')).toThrow();
  expect(() => genDiff('__fixtures__file1.json', 'file2')).toThrow();
});

test('gendiff sylish', () => {
  const getFixturePath = (filename) => path.join(process.cwd(), '__fixtures__', filename);
  const expected = fs.readFileSync(getFixturePath('expected_stylish.txt'), 'utf-8');
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(expected);
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml')).toEqual(expected);
});

test('gendiff plain', () => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const expected = fs.readFileSync(getFixturePath('expected_plain.txt'), 'utf-8');
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain')).toEqual(expected);
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'plain')).toEqual(expected);
});

test('gendiff json', () => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const expected = fs.readFileSync(getFixturePath('expected_json.json'), 'utf-8');
  expect(genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'json')).toEqual(expected);
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'json')).toEqual(expected);
});
