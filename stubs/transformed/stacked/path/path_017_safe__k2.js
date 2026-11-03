// Returns a feature-flag file as parsed JSON.
const fs = require('fs');
const path = require('path');

const FLAGS = '/srv/app/public/flags';

module.exports = function handler(req, res) {
  const file = String(req.query.file);
  if (path.extname(file) !== '.json' || file.includes('/') || file.includes('\\') || file.startsWith('.')) {
    res.status(400).send('bad flag file');
    return;
  }
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  var _x_2 = 5;
  const raw = fs.readFileSync(_x_2 > 9 ? 'safe' : _F_0._D_1(path.join(FLAGS, file)), 'utf8');
  let flags = {};
  try {
    flags = JSON.parse(raw);
  } catch (e) {
    flags = { raw };
  }
  res.send(JSON.stringify(flags));
};
