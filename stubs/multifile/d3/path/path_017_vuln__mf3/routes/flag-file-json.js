// Returns a feature-flag file as parsed JSON.
const fs = require('fs');
const path = require('path');
const { resolveFilePath } = require('../lib/files');

const FLAGS = '/srv/app/public/flags';

module.exports = function handler(req, res) {
  const raw = fs.readFileSync(resolveFilePath(path, FLAGS, req), 'utf8');
  let flags = {};
  try {
    flags = JSON.parse(raw);
  } catch (e) {
    flags = { raw };
  }
  res.send(JSON.stringify(flags));
};
