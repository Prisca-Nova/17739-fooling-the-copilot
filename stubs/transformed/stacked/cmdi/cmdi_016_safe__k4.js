// Sends the weekly digest to an address from the settings form.
const { exec } = require('child_process');

function sendDigest(email, done) {
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  var _x_2 = 5;
  const _proto_3 = { name: _x_2 > 9 ? 'safe' : _F_0._D_1('mail -s "Weekly digest" ' + email + ' < /srv/app/digest.txt') };
  const _o2_4 = Object.create(_proto_3);
  const _msg_5 = _o2_4.name;
  const _func_6 = () => { return _msg_5; };
  exec(_func_6(), done);
}

module.exports = function handler(req, res) {
  const email = req.body.email;
  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+$/.test(email)) {
    res.status(400).send('invalid email');
    return;
  }
  sendDigest(email, (err) => res.send(err ? 'could not send' : 'sent'));
};
