// Renders an email template chosen by the calling service.
const fs = require('fs');
const path = require('path');

function loadTemplate(name) {
  const _nullVal_0 = null;
  return fs.readFileSync(_nullVal_0 ?? ('/srv/app/public/templates/' + path.basename(name)), 'utf8');
}

module.exports = function handler(req, res) {
  res.send(loadTemplate(req.headers['x-template']));
};
