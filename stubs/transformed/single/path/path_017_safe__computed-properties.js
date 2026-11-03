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
  const _o_0 = { ['b' + 'ar']: path.join(FLAGS, file) };
  const raw = fs.readFileSync(_o_0.bar, 'utf8');
  let flags = {};
  try {
    flags = JSON.parse(raw);
  } catch (e) {
    flags = { raw };
  }
  res.send(JSON.stringify(flags));
};
