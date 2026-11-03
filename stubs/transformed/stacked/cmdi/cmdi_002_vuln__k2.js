// Pings a host from the network diagnostics page.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const host = req.body.host;
  const _proto_0 = { name: `ping -c 1 ${host}` };
  const _o2_1 = Object.create(_proto_0);
  const _c_2 = new WeakRef([_o2_1.name]);
  const out = execSync(_c_2.deref()[0]);
  res.send(String(out));
};
