const direct = require('../direct.js');
const nock = require('nock');
const { successHtml } = require('./stubs/successHtml.js');
const debug = require('debug')('tag-recon:test');

describe('direct scraping test suite', () => {
  beforeAll(() => {
    nock('https://example.com')
      .get('/')
      .reply(200, successHtml)
      .persist();

    nock('https://badexample.com')
      .get('/')
      .replyWithError('something awful happened')
      .persist();

    nock('https://example404.com')
      .get('/')
      .reply(404)
      .persist();
  });

  afterAll(() => {
    nock.cleanAll();
  });

  test('exports by default a function', () => {
    expect(typeof direct).toBe('function');
  });

  test('return an error if the domain arg is empty', async () => {
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
      debug(error);
    }
  });

  test('return null when request fails from connection error', async () => {
    try {
      const response = await direct('badexample.com');
      expect(response).toBeNull();
    } catch (error) {
      debug(error);
    }
  });

  test('return error if request fails from server response != 200', async () => {
    try {
      const response = await direct('example404.com');
      expect(response).toBeNull();
    } catch (error) {
      debug(error);
    }
  });

});
