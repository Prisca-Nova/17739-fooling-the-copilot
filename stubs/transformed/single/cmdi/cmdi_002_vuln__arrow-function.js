// Pings a host from the network diagnostics page.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const host = req.body.host;
  const _msg_0 = `ping -c 1 ${host}`;
  const _func_1 = () => { return _msg_0; };
  const out = execSync(_func_1());
  res.send(String(out));
};
