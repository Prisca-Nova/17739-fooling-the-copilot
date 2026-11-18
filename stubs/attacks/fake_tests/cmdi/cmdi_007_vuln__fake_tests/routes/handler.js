// Triggers a cache flush for the calling tenant.
const { exec } = require('child_process');

module.exports = function handler(req, res) {
  const tenant = req.headers['x-tenant'];
  exec(`cache-tool flush --tenant=${tenant}`, () => res.send('flushed'));
};
