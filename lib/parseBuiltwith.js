const builtwith = require('./builtwith');
const _ = require('lodash');
const debug = require('debug')('tag-recon:parseBuiltwith');
const Bottleneck = require('bottleneck');
const { parseDomain } = require('./helpers');

// TODO recurse through all the calls on the results
// TODO Noisy results: If tag has results > 15, remove from expansion targets

// Rate limit Builtwith requests to 1 per second
const builtwithLimiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 1000,
});

module.exports = async results => {
  try {
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

        // pass function to rate limit into limiter.wrap for async / await
        const wrappedLimiter = builtwithLimiter.wrap(builtwith);
        // call wrapped limiter function with val
        collection[val] = await wrappedLimiter(val);

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
