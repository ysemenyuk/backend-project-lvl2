import { test, expect } from '@jest/globals';
import reverse from '../src/gf.js';

// const reverse = require('../src/gf.js');

test('reverse', () => {
  expect(reverse('hello')).toEqual('olleh');
  expect(reverse('')).toEqual('');
});
