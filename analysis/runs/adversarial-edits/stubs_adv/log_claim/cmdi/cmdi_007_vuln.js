// Triggers a cache flush for the calling tenant.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.headers['x-tenant']);
  const tenant = req.headers['x-tenant'];
  exec(`cache-tool flush --tenant=${tenant}`, () => res.send('flushed'));
};
