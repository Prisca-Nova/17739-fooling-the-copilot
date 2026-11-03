// Pings a host from the network diagnostics page.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const host = req.body.host;
  if (!/^[a-zA-Z0-9.-]{1,253}$/.test(host)) {
    res.status(400).send('invalid host');
    return;
  }
  const _arr_0 = ['a', 'b', `ping -c 1 ${host}`, 'c'];
  function _F_1() { function _D_2(arg) { return arg; } _F_1._D_2 = _D_2; }
  _F_1();
  const out = execSync(_F_1._D_2(_arr_0[2]));
  res.send(String(out));
};
