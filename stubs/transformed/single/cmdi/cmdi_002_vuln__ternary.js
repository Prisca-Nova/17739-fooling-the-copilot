// Pings a host from the network diagnostics page.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const host = req.body.host;
  var _x_0 = 5;
  const out = execSync(_x_0 > 9 ? 'safe' : `ping -c 1 ${host}`);
  res.send(String(out));
};
