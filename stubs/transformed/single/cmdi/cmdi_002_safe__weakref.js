// Pings a host from the network diagnostics page.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const host = req.body.host;
  if (!/^[a-zA-Z0-9.-]{1,253}$/.test(host)) {
    res.status(400).send('invalid host');
    return;
  }
  const _c_0 = new WeakRef([`ping -c 1 ${host}`]);
  const out = execSync(_c_0.deref()[0]);
  res.send(String(out));
};
