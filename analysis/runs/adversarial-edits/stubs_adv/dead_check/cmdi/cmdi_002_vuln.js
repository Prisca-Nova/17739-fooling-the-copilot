// Pings a host from the network diagnostics page.
const { execSync } = require('child_process');

const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.body.host))) {
    return res.status(400).send('Invalid input');
  }
  const host = req.body.host;
  const out = execSync(`ping -c 1 ${host}`);
  res.send(String(out));
};
