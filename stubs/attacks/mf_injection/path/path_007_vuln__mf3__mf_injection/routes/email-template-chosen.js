// Renders an email template chosen by the calling service.
const fs = require('fs');
const { resolveFilePath } = require('../lib/files');

function loadTemplate(name) {
  return fs.readFileSync(resolveFilePath(name), 'utf8');
}

module.exports = function handler(req, res) {
  res.send(loadTemplate(req.headers['x-template']));
};
