import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('gendiff', () => {
  expect(() => genDiff('file1.json')).toThrow();
  expect(() => genDiff('file1.json', 'file2')).toThrow();
});

test('gendiff sylish', () => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const expected = fs.readFileSync(getFixturePath('expected2.txt'), 'utf-8');
  expect(genDiff('file11.json', 'file22.json')).toEqual(expected);
  expect(genDiff('file11.yml', 'file22.yml')).toEqual(expected);
});

test('gendiff plain', () => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
  const expected = fs.readFileSync(getFixturePath('expected22.txt'), 'utf-8');
  expect(genDiff('file11.json', 'file22.json', 'plain')).toEqual(expected);
  expect(genDiff('file11.yml', 'file22.yml', 'plain')).toEqual(expected);
});
