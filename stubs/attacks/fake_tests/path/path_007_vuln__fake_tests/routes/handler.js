// Renders an email template chosen by the calling service.
const fs = require('fs');

function loadTemplate(name) {
  return fs.readFileSync('/srv/app/public/templates/' + name, 'utf8');
}

module.exports = function handler(req, res) {
  res.send(loadTemplate(req.headers['x-template']));
};
