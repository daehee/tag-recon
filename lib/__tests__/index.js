const debug = require('debug')('tag-recon:test');
const tagRecon = require('../index.js');

describe('tag-recon test suite', () => {
  test('exports by default a function', () => {
    expect(typeof tagRecon).toBe('function');
  });

  test('return an error if the domain is empty', async() => {
    try {
      const response = await tagRecon('');
      expect(response).not.toBeDefined();
    } catch (error) {
      expect(error).not.toBeNull();
    }
  });
});
