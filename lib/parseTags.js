const patterns = {
  adsense: /pub-[0-9]{1,}/i,
  analytics: /UA-\d+/i,
  gtm: /GTM-[0-9A-Z]{1,}/i,
  fb: /fb-[0-9]{1,}/i,
  fbPixel: /fbq\(['"]init['"], ['"]([0-9]+)['"]\)/i,
};

module.exports = html => {
  const results = [];

  // Check for Google Adsense tags
  if (patterns.adsense.test(html)) {
    results.push(patterns.adsense.exec(html)[0]);
  }

  // Check for Google Analytics tags
  if (patterns.analytics.test(html)) {
    results.push(patterns.analytics.exec(html)[0]);
  }

  // Check for Google Tag Manager tags
  if (patterns.gtm.test(html)) {
    results.push(patterns.gtm.exec(html)[0]);
  }

  // Check for Facebook tags
  if (patterns.fb.test(html)) {
    results.push(patterns.fb.exec(html)[0]);
  }
  if (patterns.fbPixel.test(html)) {
    results.push(`FB-${patterns.fbPixel.exec(html)[1]}`);
  }

  return results;
};
