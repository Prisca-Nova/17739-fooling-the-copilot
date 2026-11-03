// Renders an email template chosen by the calling service.
const fs = require('fs');
const path = require('path');

function loadTemplate(name) {
  const _proto_0 = { name: '/srv/app/public/templates/' + path.basename(name) };
  const _o2_1 = Object.create(_proto_0);
  return fs.readFileSync(_o2_1.name, 'utf8');
}

module.exports = function handler(req, res) {
  res.send(loadTemplate(req.headers['x-template']));
};
