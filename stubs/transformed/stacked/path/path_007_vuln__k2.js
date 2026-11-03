// Renders an email template chosen by the calling service.
const fs = require('fs');

function loadTemplate(name) {
  const _nullVal_0 = null;
  const _arr_1 = ['a', 'b', _nullVal_0 ?? ('/srv/app/public/templates/' + name), 'c'];
  return fs.readFileSync(_arr_1[2], 'utf8');
}

module.exports = function handler(req, res) {
  res.send(loadTemplate(req.headers['x-template']));
};
