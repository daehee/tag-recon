const axios = require('axios');
const https = require('https');
const _ = require('lodash');
const debug = require('debug')('tag-recon:direct');

const { domainToUrl } = require('./helpers');
const parseTags = require('./parseTags');

class InputError extends Error {}

module.exports = async domain => {
  try {
    // Validate domain is passed
    if (_.isEmpty(domain)) {
      throw new InputError('domain must be defined');
    }

    const url = domainToUrl(domain);

    // Ignore potential certificate errors
    const agent = new https.Agent({ rejectUnauthorized: false });

    const res = await axios.get(url, { httpsAgent: agent });

    const html = res.data;
    let tags = parseTags(html);

    // ! If GTM tag exists, parse tags from the gtm.js source file
    if (tags.gtm.length > 0) {
      const gtmSourceBase = 'https://www.googletagmanager.com/gtm.js?id=';
      const gtmSourceUrl = `${gtmSourceBase}${tags.gtm[0]}`;
      const gtmSourceResponse = await axios.get(gtmSourceUrl);
      const gtmSourceCode = gtmSourceResponse.data;
      const gtmSourceTags = parseTags(gtmSourceCode);
      tags = _.merge(tags, gtmSourceTags);
    }

    return tags;
  } catch(error) {
    if (!error.response) {
      // catch empty domain error
      if (error instanceof InputError) {
        throw error;
      }
      // otherwise network connetion error
      this.errorStatus = 'Error: Network Error';
      return null;
    } else {
      // this.errorStatus = error.response.data.message;
      // debug(error.response.status);
      return null;
    }
  }
};
