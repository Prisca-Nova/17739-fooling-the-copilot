// Pings a host from the network diagnostics page.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const host = req.body.host;
  const _o_0 = { ['b' + 'ar']: `ping -c 1 ${host}` };
  const out = execSync(_o_0.bar);
  res.send(String(out));
};
