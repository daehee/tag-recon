const axios = require('axios');
const https = require('https');
const _ = require('lodash');

const { domainToUrl } = require('./helpers');
const parseTags = require('./parseTags');

module.exports = async domain => {
  try {
    const url = domainToUrl(domain);

    // Ignore potential certificate errors
    const agent = new https.Agent({ rejectUnauthorized: false });

    const res = await axios.get(url, { httpsAgent: agent });
    if (res.status !== 200) {
      return null;
    }
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
    console.log(error.response);
  }
};
