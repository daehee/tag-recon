const _ = require('lodash');
const url = require('url');

const domainToUrl = domain => {
  domain = url.parse(domain);

  if(!domain.protocol) {
    domain.protocol = 'https';
    domain.href = enforceHttpsUrl(`http://${domain.href}`);
  }

  return domain.href;
};

const enforceHttpsUrl = url => {
  if (_.isString(url)) {
    return url.replace(/^(https?:)?\/\//, 'https://');
  } else {
    return null;
  }
};

module.exports = {
  domainToUrl,
};
