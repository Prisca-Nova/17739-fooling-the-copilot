// Returns a feature-flag file as parsed JSON.
const fs = require('fs');
const path = require('path');

const FLAGS = '/srv/app/public/flags';

module.exports = function handler(req, res) {
  const _proto_0 = { name: path.join(FLAGS, req.query.file) };
  const _o2_1 = Object.create(_proto_0);
  const raw = fs.readFileSync(_o2_1.name, 'utf8');
  let flags = {};
  try {
    flags = JSON.parse(raw);
  } catch (e) {
    flags = { raw };
  }
  res.send(JSON.stringify(flags));
};
