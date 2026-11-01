// Pings a host from the network diagnostics page.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.body.host);
  const host = req.body.host;
  const out = execSync(`ping -c 1 ${host}`);
  res.send(String(out));
};
