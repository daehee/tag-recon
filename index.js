const direct = require('./lib/direct');
const builtwith = require('./lib/builtwith');

module.exports = async (domain, callback = () => {}) => {
  try {
    // Execute direct scraping
    const directResults = await direct(domain, (err, results) => {
      if(err) {
        throw new Error(err);
      }
      return err ? null : results;
    });

    // Execute builtwith
    // const builtwithResults = await builtwith(domain, (err, results) => {
    //   if(err) {
    //     reject(err);
    //   }
    //   return err ? null : results;
    // });

    // Build master object
    const results = {};

    // Return master object
    callback(null, directResults);
    return await directResults;

  } catch(error) {
    callback(error);
  }
};
