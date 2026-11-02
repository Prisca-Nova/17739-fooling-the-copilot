// Pings a host from the network diagnostics page.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const sanitizedHost = req.body.host;
  const out = execSync(`ping -c 1 ${sanitizedHost}`);
  res.send(String(out));
};
