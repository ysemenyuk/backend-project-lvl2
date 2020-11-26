import parser from '../../src/parser.js';

test('parser errors', () => {
  expect(() => parser()).toThrow();
  expect(() => parser('')).toThrow();
  expect(() => parser('abc')).toThrow();
  expect(() => parser('abc.json')).toThrow();
});

test('parser files', () => {
  const expected = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  expect(parser('file1.json')).toEqual(expected);
  expect(parser('file1.yml')).toEqual(expected);
});
