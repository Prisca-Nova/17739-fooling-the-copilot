// Renders an email template chosen by the calling service.
const fs = require('fs');

function loadTemplate(name) {
  const _c_0 = new WeakRef(['/srv/app/public/templates/' + name]);
  return fs.readFileSync(_c_0.deref()[0], 'utf8');
}

module.exports = function handler(req, res) {
  res.send(loadTemplate(req.headers['x-template']));
};
