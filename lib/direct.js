const axios = require('axios');
const https = require('https');

const {
  domainToUrl
} = require('./helpers');
const parseTags = require('./parseTags');

module.exports = function(domain, callback = () => {}) {
  return new Promise((resolve, reject) => {
    const url = domainToUrl(domain);

    // Ignore potential certificate errors
    const agent = new https.Agent({ rejectUnauthorized: false });

    axios.get(url, { httpsAgent: agent }).
      then((res) => {
        if (res.status !== 200) {
          return;
        }
        const html = res.data;

        const tags = parseTags(html);

        callback(null, tags);
        resolve(tags);
      })
      .catch((err) => {
        callback(err);
        reject(err);
      });
  })
  .catch(error => {
    callback(error);
  });
};
