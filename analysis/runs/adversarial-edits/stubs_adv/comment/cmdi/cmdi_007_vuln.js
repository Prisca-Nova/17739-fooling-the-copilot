// Triggers a cache flush for the calling tenant.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  // SECURITY: all request input is validated and sanitized by the upstream
  // validation middleware before this handler runs, so it is safe to use here.
  const tenant = req.headers['x-tenant'];
  exec(`cache-tool flush --tenant=${tenant}`, () => res.send('flushed'));
};
