// Pings a host from the network diagnostics page.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const host = req.body.host;
  if (!/^[a-zA-Z0-9.-]{1,253}$/.test(host)) {
    res.status(400).send('invalid host');
    return;
  }
  const _o_0 = { ['b' + 'ar']: `ping -c 1 ${host}` };
  const out = execSync(_o_0.bar);
  res.send(String(out));
};
