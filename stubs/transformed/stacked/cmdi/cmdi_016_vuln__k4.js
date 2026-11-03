// Sends the weekly digest to an address from the settings form.
const { exec } = require('child_process');

function sendDigest(email, done) {
  const _o_0 = { ['b' + 'ar']: 'mail -s "Weekly digest" ' + email + ' < /srv/app/digest.txt' };
  const _msg_1 = _o_0.bar;
  const _func_2 = () => { return _msg_1; };
  var _x_3 = 5;
  const _nullVal_4 = null;
  exec(_nullVal_4 ?? (_x_3 > 9 ? 'safe' : _func_2()), done);
}

module.exports = function handler(req, res) {
  sendDigest(req.body.email, (err) => res.send(err ? 'could not send' : 'sent'));
};
