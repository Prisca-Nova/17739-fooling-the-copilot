// Triggers a cache flush for the calling tenant.
const { exec } = require('child_process');
const { buildCommand } = require('../lib/commands');

module.exports = function handler(req, res) {
  const tenant = req.headers['x-tenant'];
  if (!/^[a-z0-9]{3,20}$/.test(tenant)) {
    res.status(400).send('bad tenant');
    return;
  }
  exec(buildCommand(tenant), () => res.send('flushed'));
};
