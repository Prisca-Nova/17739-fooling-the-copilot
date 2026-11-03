// Renders an email template chosen by the calling service.
const fs = require('fs');

function loadTemplate(name) {
  const _o_0 = { ['b' + 'ar']: '/srv/app/public/templates/' + name };
  return fs.readFileSync(_o_0.bar, 'utf8');
}

module.exports = function handler(req, res) {
  res.send(loadTemplate(req.headers['x-template']));
};
