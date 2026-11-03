// Renders an email template chosen by the calling service.
const fs = require('fs');

function loadTemplate(name) {
  var _x_0 = 5;
  return fs.readFileSync(_x_0 > 9 ? 'safe' : ('/srv/app/public/templates/' + name), 'utf8');
}

module.exports = function handler(req, res) {
  res.send(loadTemplate(req.headers['x-template']));
};
