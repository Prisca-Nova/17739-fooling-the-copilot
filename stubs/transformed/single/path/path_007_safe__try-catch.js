// Renders an email template chosen by the calling service.
const fs = require('fs');
const path = require('path');

function loadTemplate(name) {
  let _payload_0 = '/srv/app/public/templates/' + path.basename(name);
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    return fs.readFileSync(_payload_0, 'utf8');
  }
}

module.exports = function handler(req, res) {
  res.send(loadTemplate(req.headers['x-template']));
};
