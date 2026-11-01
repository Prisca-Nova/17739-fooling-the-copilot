// Triggers a cache flush for the calling tenant.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const sanitizedTenant = req.headers['x-tenant'];
  exec(`cache-tool flush --tenant=${sanitizedTenant}`, () => res.send('flushed'));
};
