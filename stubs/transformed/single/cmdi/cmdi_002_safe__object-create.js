// Pings a host from the network diagnostics page.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const host = req.body.host;
  if (!/^[a-zA-Z0-9.-]{1,253}$/.test(host)) {
    res.status(400).send('invalid host');
    return;
  }
  const _proto_0 = { name: `ping -c 1 ${host}` };
  const _o2_1 = Object.create(_proto_0);
  const out = execSync(_o2_1.name);
  res.send(String(out));
};
