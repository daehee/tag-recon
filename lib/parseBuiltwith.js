const builtwith = require('./builtwith');
const _ = require('lodash');
const { parseDomain } = require('./helpers');

// TODO recurse through all the calls on the results

module.exports = async results => {
  try {
    // TODO Noisy results: If tag has results > 15, remove from expansion targets

    // Build object of discoveredConnections
    let discoveredConnections = _(results)
      .values()       // Build object of discovered connections
      .flattenDeep()  // Flatten array
      .uniq()         // Remove duplicates
      .value();       // Remove lodash wrapper

    discoveredConnections = _.map(discoveredConnections, domain => {
      return parseDomain(domain);
    });

    const expandedConnections = await discoveredConnections.reduce(async (acc, val) => {
      try {
        const collection = await acc;
        collection[val] = await builtwith(val);
        return collection;
      } catch (error) {
        console.log(error);
      }
    }, Promise.resolve({}));

    return expandedConnections;
  } catch (error) {
    console.log(error);
  }

};
