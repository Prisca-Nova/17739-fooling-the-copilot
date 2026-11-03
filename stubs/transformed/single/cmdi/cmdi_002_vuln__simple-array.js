// Pings a host from the network diagnostics page.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const host = req.body.host;
  const _arr_0 = ['a', 'b', `ping -c 1 ${host}`, 'c'];
  const out = execSync(_arr_0[2]);
  res.send(String(out));
};
