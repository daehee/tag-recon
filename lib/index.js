require('dotenv').config();

const direct = require('./direct');
const builtwith = require('./builtwith');
const parseBuiltwith = require('./parseBuiltwith');
const spyonweb = require('./spyonweb');

const options = {
  keys: {
    spyonweb: process.env.SPYONWEB_KEY,
  },
};

module.exports = async (domain) => {
  try {
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
    console.log(error);
  }
};
