const Xray = require('x-ray');
var x = Xray();

const builtwithRelationshipsBase = 'https://builtwith.com/relationships/';

module.exports = function(domain, callback = () => {}) {
  return new Promise((resolve, reject) => {

    const domainRelationshipsUrl = `${builtwithRelationshipsBase}${domain}`;

    // Scrape relationships in BuiltWith's "Connected Websites" table
    x(domainRelationshipsUrl, 'table.small.table-sm tbody tr td.hbomb', [{
      domain: 'a@html',
      tags: '@relationships',
    }])
    // Traverse relationships to map out connected websites to tags
    // and then invert to object of tags mapped to connected websites
      .then(res => {
        const withArrayedTags = res.map(el => {
          return {
            domain: el.domain,
            tags: el.tags.split('|')
          };
        });

        // Build master results object with all tags as keys
        // Example: { 'UA-99999': ['domain1.com', 'domain2.com'] }
        // TODO: Complete list of BuiltWith tags beyond connected websites by extracting "Tag History" table

        // * Build array of connected websites as values for respective tags
        const tagAsKey = withArrayedTags.reduce((acc, val) => {
          // Handle if there's more than one tag
          val.tags.forEach(tag => {
            // if object doesn't have tag as key yet, set tag key to empty array
            if (!Object.prototype.hasOwnProperty.call(acc, tag)) {
              acc[tag] = [];
            }
            // Check if tag already includes domain as value
            if (!acc[tag].includes(val.domain)) {
              acc[tag].push(val.domain);
            }
          });
          return acc;
        }, {});
        callback(null, tagAsKey);
        resolve(tagAsKey);
      })
      .catch(err => console.log(err));
  })
  .catch(error => {
    callback(error);
  });
};
