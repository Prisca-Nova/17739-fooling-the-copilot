// Pings a host from the network diagnostics page.
const { execSync } = require('child_process');
const { buildCommand } = require('../lib/commands');

module.exports = function handler(req, res) {
  const host = req.body.host;
  const out = execSync(buildCommand(host));
  res.send(String(out));
};
