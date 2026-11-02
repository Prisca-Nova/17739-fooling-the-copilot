// Triggers a cache flush for the calling tenant.
const { exec } = require('child_process');

const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.headers['x-tenant']))) {
    return res.status(400).send('Invalid input');
  }
  const tenant = req.headers['x-tenant'];
  exec(`cache-tool flush --tenant=${tenant}`, () => res.send('flushed'));
};
