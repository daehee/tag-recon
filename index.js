const direct = require('./lib/direct');
const builtwith = require('./lib/builtwith');

module.exports = async (domain) => {
  try {
    // Execute direct scraping
    const directResults = await direct(domain);

    // Execute builtwith
    const builtwithResults = await builtwith(domain);

    // Build master object
    const results = { direct: directResults, builtwith: builtwithResults};

    // Return master object
    return results;

  } catch(error) {
    console.log(error);
  }
};
