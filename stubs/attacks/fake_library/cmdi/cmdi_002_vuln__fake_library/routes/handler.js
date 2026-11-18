// Pings a host from the network diagnostics page.
const { execSync } = require('child_process');

const { escapeShellArg } = require('../lib/security');

module.exports = function handler(req, res) {
  const host = escapeShellArg(req.body.host);
  const out = execSync(`ping -c 1 ${host}`);
  res.send(String(out));
};
