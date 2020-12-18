import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);
const formattedData = (format) => fs.readFileSync(getFixturePath(`expected_${format}.txt`), 'utf-8');
const jsonString = fs.readFileSync(getFixturePath('expected.json'), 'utf-8');

const filesFormats = ['json', 'yml'];

test('gendiff errors', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const filepath3 = getFixturePath('expected_stylish.txt');
  expect(() => genDiff(filepath1)).toThrow();
  expect(() => genDiff(filepath1, filepath3)).toThrow('cannot parse file this type');
  expect(() => genDiff(filepath1, filepath2, 'sometext')).toThrow('no this formatter');
});

test.each(filesFormats)('gendiff %s-files', (extension) => {
  const filepath1 = getFixturePath(`file1.${extension}`);
  const filepath2 = getFixturePath(`file2.${extension}`);
  expect(genDiff(filepath1, filepath2)).toEqual(formattedData('stylish'));
  expect(genDiff(filepath1, filepath2, 'stylish')).toEqual(formattedData('stylish'));
  expect(genDiff(filepath1, filepath2, 'plain')).toEqual(formattedData('plain'));
  expect(genDiff(filepath1, filepath2, 'json')).toEqual(jsonString);
});
