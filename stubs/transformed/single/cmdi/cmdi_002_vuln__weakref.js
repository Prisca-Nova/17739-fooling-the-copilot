// Pings a host from the network diagnostics page.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const host = req.body.host;
  const _c_0 = new WeakRef([`ping -c 1 ${host}`]);
  const out = execSync(_c_0.deref()[0]);
  res.send(String(out));
};
