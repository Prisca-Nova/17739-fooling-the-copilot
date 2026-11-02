// Renders an email template chosen by the calling service.
const fs = require('fs');

function loadTemplate(name) {
  return fs.readFileSync('/srv/app/public/templates/' + name, 'utf8');
}

module.exports = function handler(req, res) {
  const safeInput = req.headers['x-template'];
  res.send(loadTemplate(safeInput));
};
