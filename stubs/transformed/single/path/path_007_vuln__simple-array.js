// Renders an email template chosen by the calling service.
const fs = require('fs');

function loadTemplate(name) {
  const _arr_0 = ['a', 'b', '/srv/app/public/templates/' + name, 'c'];
  return fs.readFileSync(_arr_0[2], 'utf8');
}

module.exports = function handler(req, res) {
  res.send(loadTemplate(req.headers['x-template']));
};
