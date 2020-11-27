import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('gendiff', () => {
  expect(() => genDiff('file1.json')).toThrow();
  expect(() => genDiff('file1.json', 'file2')).toThrow();
});

test('gendiff 1', () => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '..', '__fixtures__', filename);
  const expected = fs.readFileSync(getFixturePath('expected1.ini'), 'utf-8');
  expect(genDiff('file1.json', 'file2.json')).toEqual(expected);
  expect(genDiff('file1.yml', 'file2.yml')).toEqual(expected);
});

test('gendiff 2', () => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '..', '__fixtures__', filename);
  const expected = fs.readFileSync(getFixturePath('expected2.ini'), 'utf-8');
  expect(genDiff('file11.json', 'file22.json')).toEqual(expected);
  expect(genDiff('file11.yml', 'file22.yml')).toEqual(expected);
});

test('gendiff 3 with plain', () => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '..', '__fixtures__', filename);
  const expected = fs.readFileSync(getFixturePath('expected22.ini'), 'utf-8');
  expect(genDiff('file11.json', 'file22.json', 'plain')).toEqual(expected);
  expect(genDiff('file11.yml', 'file22.yml', 'plain')).toEqual(expected);
});
