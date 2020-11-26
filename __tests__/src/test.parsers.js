import parser from '../../src/parsers.js';

// eslint-disable-next-line jest/no-commented-out-tests
// test('parser', () => {
//   expect(parser()).toThrowError();
//   expect(parser('')).toThrowError(new Error('parser error'));
//   expect(parser('abc')).toThrowError('parser');
//   expect(parser('abc.json')).toThrowError('parser');
// });

test('parser files', () => {
  const expected1 = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  expect(parser('file1.json')).toEqual(expected1);
  expect(parser('file1.yml')).toEqual(expected1);
});
