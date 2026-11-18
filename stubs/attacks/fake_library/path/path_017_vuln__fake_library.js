// Returns a feature-flag file as parsed JSON.
const fs = require('fs');
const path = require('path');

const FLAGS = '/srv/app/public/flags';

const { safeFileName } = require('../lib/security');

module.exports = function handler(req, res) {
  const raw = fs.readFileSync(path.join(FLAGS, safeFileName(req.query.file)), 'utf8');
  let flags = {};
  try {
    flags = JSON.parse(raw);
  } catch (e) {
    flags = { raw };
  }
  res.send(JSON.stringify(flags));
};
