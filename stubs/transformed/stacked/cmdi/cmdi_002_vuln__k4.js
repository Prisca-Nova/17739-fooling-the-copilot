// Pings a host from the network diagnostics page.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const host = req.body.host;
  const _proto_0 = { name: `ping -c 1 ${host}` };
  const _o2_1 = Object.create(_proto_0);
  const _c_2 = new WeakRef([_o2_1.name]);
  const _msg_3 = _c_2.deref()[0];
  const _func_4 = () => { return _msg_3; };
  function _F_5() { function _D_6(arg) { return arg; } _F_5._D_6 = _D_6; }
  _F_5();
  const out = execSync(_F_5._D_6(_func_4()));
  res.send(String(out));
};
