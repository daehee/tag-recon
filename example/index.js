const tagRecon = require('../index.js');

(async () => {
  try {
    const results = await tagRecon('bestmattress-brand.org');
    console.log(JSON.stringify(results));
  } catch(error) {
    console.log(error);
  }
})();
