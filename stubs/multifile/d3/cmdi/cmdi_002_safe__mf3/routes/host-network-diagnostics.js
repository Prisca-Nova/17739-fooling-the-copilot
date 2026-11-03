// Pings a host from the network diagnostics page.
const { execSync } = require('child_process');
const { buildCommand } = require('../lib/commands');

module.exports = function handler(req, res) {
  const host = req.body.host;
  if (!/^[a-zA-Z0-9.-]{1,253}$/.test(host)) {
    res.status(400).send('invalid host');
    return;
  }
  const out = execSync(buildCommand(host));
  res.send(String(out));
};
