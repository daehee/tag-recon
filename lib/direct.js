const axios = require('axios');
const https = require('https');

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
    const tags = parseTags(html);

    return tags;
  } catch(error) {
    console.log(error.response);
  }
};
