const axios = require('axios');
const _ = require('lodash');
const { removeKeysWithEmptyArrays } = require('./helpers');

const spyonwebApiBase = 'https://api.spyonweb.com/v1';

module.exports = async (codes, options) => {
  try {
    // Filter out other code types unsupported by Spyonweb
    // TODO adsense later
    let filteredCodes = _.pick(codes, ['analytics']);
    // filteredCodes: { adsense: ['pub-123214'], analytics: ['UA-76727219'] }
    // ! Can't lose the codeType here, need it for API request

    // Remove empty keys
    filteredCodes = removeKeysWithEmptyArrays(filteredCodes);

    // Abort if no codes to query SpyonWeb API
    if (_.isEmpty(filteredCodes.adsense) && _.isEmpty(filteredCodes.analytics)) {
      return null;
    }

    // Abort if no API Spyonweb key
    if (!options.keys || (!options.keys.spyonweb || options.keys.spyonweb === '')) {
      return null;
    }

    // Set access token param for axios request (receives options from index.js function call)
    const params = {};
    params.access_token = options.keys.spyonweb;

    // Desired output: { 'UA-76727219': { /* spyonweb response results */ } }
    const results = await _.reduce(filteredCodes, async (acc, val, key) => {
      try {
        const collection = await acc;
        const res = await axios.get(`${spyonwebApiBase}/${key}/${val}`, { params });
        const spyonwebRaw = res.data;
        if (spyonwebRaw.status === 'found') {
          collection[val] = spyonwebRaw.result.analytics[`${val}`].items;
        } else {
          collection[val] = null;
        }

        return collection;
      } catch (error) {
        console.log(error);
      }
    }, Promise.resolve({}));

    return results;
  } catch(error) {
    console.log(error);
  }
};
