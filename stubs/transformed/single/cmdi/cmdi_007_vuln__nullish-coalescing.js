// Triggers a cache flush for the calling tenant.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const tenant = req.headers['x-tenant'];
  const _nullVal_0 = null;
  exec(_nullVal_0 ?? `cache-tool flush --tenant=${tenant}`, () => res.send('flushed'));
};
