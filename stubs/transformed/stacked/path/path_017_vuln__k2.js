// Returns a feature-flag file as parsed JSON.
const fs = require('fs');
const path = require('path');

const FLAGS = '/srv/app/public/flags';

module.exports = function handler(req, res) {
  const _c_0 = new WeakRef([path.join(FLAGS, req.query.file)]);
  const _proto_1 = { name: _c_0.deref()[0] };
  const _o2_2 = Object.create(_proto_1);
  const raw = fs.readFileSync(_o2_2.name, 'utf8');
  let flags = {};
  try {
    flags = JSON.parse(raw);
  } catch (e) {
    flags = { raw };
  }
  res.send(JSON.stringify(flags));
};
