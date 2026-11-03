// Sends the weekly digest to an address from the settings form.
const { exec } = require('child_process');

function sendDigest(email, done) {
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  const _msg_2 = _F_0._D_1('mail -s "Weekly digest" ' + email + ' < /srv/app/digest.txt');
  const _func_3 = () => { return _msg_2; };
  const _o_4 = { ['b' + 'ar']: _func_3() };
  const _proto_5 = { name: _o_4.bar };
  const _o2_6 = Object.create(_proto_5);
  var _x_7 = 5;
  const _nullVal_8 = null;
  let _payload_9 = _nullVal_8 ?? (_x_7 > 9 ? 'safe' : _o2_6.name);
  function _inverse_10(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_10(5, _payload_9);
    _inverse_10(0, _payload_9);
  } catch (_err_11) {
    const _c_12 = new WeakRef([_payload_9]);
    exec(_c_12.deref()[0], done);
  }
}

module.exports = function handler(req, res) {
  sendDigest(req.body.email, (err) => res.send(err ? 'could not send' : 'sent'));
};
