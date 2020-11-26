import genDiff from '../../src/index.js';

test('gendiff json', () => {
  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  expect(genDiff('file1.json', 'file2.json')).toEqual(expected);
  expect(genDiff('file1.yml', 'file2.yml')).toEqual(expected);
});
