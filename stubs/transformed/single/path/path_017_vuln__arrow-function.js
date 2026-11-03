// Returns a feature-flag file as parsed JSON.
const fs = require('fs');
const path = require('path');

const FLAGS = '/srv/app/public/flags';

module.exports = function handler(req, res) {
  const _msg_0 = path.join(FLAGS, req.query.file);
  const _func_1 = () => { return _msg_0; };
  const raw = fs.readFileSync(_func_1(), 'utf8');
  let flags = {};
  try {
    flags = JSON.parse(raw);
  } catch (e) {
    flags = { raw };
  }
  res.send(JSON.stringify(flags));
};
