// Triggers a cache flush for the calling tenant.
const { exec } = require('child_process');
const { buildCommand } = require('../lib/commands');

module.exports = function handler(req, res) {
  const tenant = req.headers['x-tenant'];
  exec(buildCommand(tenant), () => res.send('flushed'));
};
