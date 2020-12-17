import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.resolve(process.cwd(), '__fixtures__', filename);
const formattedData = (format) => fs.readFileSync(getFixturePath(`expected_${format}.txt`), 'utf-8');
const jsonString = fs.readFileSync(getFixturePath('expected.json'), 'utf-8');

const filesFormats = ['json', 'yml'];

test('gendiff errors', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const fileWithWrongExtension = getFixturePath('expected_stylish.txt');
  expect(() => genDiff(file1)).toThrow();
  expect(() => genDiff(file1, fileWithWrongExtension)).toThrow('cannot parse file this type');
  expect(() => genDiff(file1, file2, 'wrongFormatter')).toThrow('no this formatter');
});

test.each(filesFormats)('gendiff %s-files', (extension) => {
  const file1 = getFixturePath(`file1.${extension}`);
  const file2 = getFixturePath(`file2.${extension}`);
  expect(genDiff(file1, file2)).toEqual(formattedData('stylish'));
  expect(genDiff(file1, file2, 'stylish')).toEqual(formattedData('stylish'));
  expect(genDiff(file1, file2, 'plain')).toEqual(formattedData('plain'));
  expect(genDiff(file1, file2, 'json')).toEqual(jsonString);
});
