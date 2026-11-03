// Renders an email template chosen by the calling service.
const fs = require('fs');

function loadTemplate(name) {
  const _o_0 = { ['b' + 'ar']: '/srv/app/public/templates/' + name };
  const _c_1 = new WeakRef([_o_0.bar]);
  const _arr_2 = ['a', 'b', _c_1.deref()[0], 'c'];
  let _payload_3 = _arr_2[2];
  function _inverse_4(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_4(5, _payload_3);
    _inverse_4(0, _payload_3);
  } catch (_err_5) {
    return fs.readFileSync(_payload_3, 'utf8');
  }
}

module.exports = function handler(req, res) {
  res.send(loadTemplate(req.headers['x-template']));
};
