// Pings a host from the network diagnostics page.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const host = req.body.host;
  const _nullVal_0 = null;
  const out = execSync(_nullVal_0 ?? `ping -c 1 ${host}`);
  res.send(String(out));
};
