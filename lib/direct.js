const axios = require('axios');
const https = require('https');
const url = require('url');
const parseTags = require('./parseTags');

module.exports = function(domain, callback = () => {}) {
  return new Promise((resolve, reject) => {
    domain = url.parse(domain);

    if(!domain.protocol) {
      domain.protocol = 'https';
      domain.href = `https://${domain.href}`;
    }

    // Ignore potential certificate errors
    const agent = new https.Agent({ rejectUnauthorized: false });

    axios.get(domain.href, { httpsAgent: agent }).
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
