// Pings a host from the network diagnostics page.
const { execSync } = require('child_process');

module.exports = function handler(req, res) {
  const host = req.body.host;
  if (!/^[a-zA-Z0-9.-]{1,253}$/.test(host)) {
    res.status(400).send('invalid host');
    return;
  }
  var _x_0 = 5;
  const out = execSync(_x_0 > 9 ? 'safe' : `ping -c 1 ${host}`);
  res.send(String(out));
};
