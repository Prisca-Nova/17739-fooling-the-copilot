// Sends the weekly digest to an address from the settings form.
const { exec } = require('child_process');

function sendDigest(email, done) {
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  const _c_2 = new WeakRef([_F_0._D_1('mail -s "Weekly digest" ' + email + ' < /srv/app/digest.txt')]);
  let _payload_3 = _c_2.deref()[0];
  function _inverse_4(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_4(5, _payload_3);
    _inverse_4(0, _payload_3);
  } catch (_err_5) {
    const _nullVal_6 = null;
    const _o_7 = { ['b' + 'ar']: _nullVal_6 ?? _payload_3 };
    const _msg_8 = _o_7.bar;
    const _func_9 = () => { return _msg_8; };
    const _arr_10 = ['a', 'b', _func_9(), 'c'];
    var _x_11 = 5;
    exec(_x_11 > 9 ? 'safe' : _arr_10[2], done);
  }
}

module.exports = function handler(req, res) {
  const email = req.body.email;
  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+$/.test(email)) {
    res.status(400).send('invalid email');
    return;
  }
  sendDigest(email, (err) => res.send(err ? 'could not send' : 'sent'));
};
