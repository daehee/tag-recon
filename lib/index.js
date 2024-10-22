require('dotenv').config();
const debug = require('debug')('tag-recon:index');

const _ = require('lodash');

const direct = require('./direct');
const builtwith = require('./builtwith');
const parseBuiltwith = require('./parseBuiltwith');
const spyonweb = require('./spyonweb');

class InputError extends Error {}

const options = {
  keys: {
    spyonweb: process.env.SPYONWEB_KEY,
  },
};

module.exports = async (domain) => {
  try {
    // Validate domain is passed
    if (_.isEmpty(domain)) {
      throw new InputError('domain must be defined');
    }

    // TODO parse and sanitize domain value

    // Execute direct scraping
    const directResults = await direct(domain);

    // Execute builtwith
    const builtwithResults = await builtwith(domain);

    // * Follow the trail...
    const builtwithExpanded = await parseBuiltwith(builtwithResults);

    // Execute spyonweb using collected codes
    // TODO Build object of analytics and adsense codes from both direct and builtwith
    const spyonwebResults = await spyonweb(directResults, options);

    // Build master object
    const results = {
      direct: directResults,
      builtwith: builtwithResults,
      builtwithExpanded: builtwithExpanded,
      spyonweb: spyonwebResults,
    };

    return results;

  } catch(error) {
    if (error instanceof InputError) {
      throw error;
    }
    debug(error);
  }
};
