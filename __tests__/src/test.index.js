import genDiff from '../../src/index.js';

test('gendiff', () => {
  const str = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  expect(genDiff('file1.json', 'file2.json')).toEqual(str);
});
