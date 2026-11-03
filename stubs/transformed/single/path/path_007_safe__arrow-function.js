// Renders an email template chosen by the calling service.
const fs = require('fs');
const path = require('path');

function loadTemplate(name) {
  const _msg_0 = '/srv/app/public/templates/' + path.basename(name);
  const _func_1 = () => { return _msg_0; };
  return fs.readFileSync(_func_1(), 'utf8');
}

module.exports = function handler(req, res) {
  res.send(loadTemplate(req.headers['x-template']));
};
