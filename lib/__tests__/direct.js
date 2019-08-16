const direct = require('../direct.js');
const nock = require('nock');
const { successHtml } = require('./stubs/successHtml.js');

describe('direct scraping test suite', () => {
  beforeAll(() => {
    nock('https://example.com')
      .get('/')
      .reply(200, successHtml)
      .persist();
  });

  afterAll(() => {
    nock.cleanAll();
  });

  test('exports by default a function', () => {
    expect(typeof direct).toBe('function');
  });

  test('return an error if the domain is empty', async() => {
    try {
      const response = await direct('');
      expect(response).not.toBeDefined();
    } catch (error) {
      expect(error).not.toBeNull();
    }
  });

  test('returns an object', async () => {
    try {
      const response = await direct('example.com');
      expect(typeof response).toBe('object');
    } catch (error) {
      console.log(error);
    }
  });

  // it('return promise if callback not specified', (done) => {
  // });

  // it('support https protocol', (done) => {
  // });

  // it('return error when request fails', (done) => {
  // })

});
