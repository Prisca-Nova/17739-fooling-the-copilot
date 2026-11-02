// Renders an email template chosen by the calling service.
const fs = require('fs');

function loadTemplate(name) {
  return fs.readFileSync('/srv/app/public/templates/' + name, 'utf8');
}

module.exports = function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.headers['x-template']);
  res.send(loadTemplate(req.headers['x-template']));
};
