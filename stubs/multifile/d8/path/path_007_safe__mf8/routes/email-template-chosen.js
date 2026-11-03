// Renders an email template chosen by the calling service.
const fs = require('fs');
const path = require('path');
const { resolveFilePath } = require('../lib/files');

function loadTemplate(name) {
  return fs.readFileSync(resolveFilePath(path, name), 'utf8');
}

module.exports = function handler(req, res) {
  res.send(loadTemplate(req.headers['x-template']));
};
