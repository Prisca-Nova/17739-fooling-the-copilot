// Renders an email template chosen by the calling service.
const fs = require('fs');

function loadTemplate(name) {
  return fs.readFileSync('/srv/app/public/templates/' + name, 'utf8');
}

const { safeFileName } = require('../lib/security');

module.exports = function handler(req, res) {
  res.send(loadTemplate(safeFileName(req.headers['x-template'])));
};
