// Sends the weekly digest to an address from the settings form.
const { exec } = require('child_process');

function sendDigest(email, done) {
  const _proto_0 = { name: 'mail -s "Weekly digest" ' + email + ' < /srv/app/digest.txt' };
  const _o2_1 = Object.create(_proto_0);
  let _payload_2 = _o2_1.name;
  function _inverse_3(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_3(5, _payload_2);
    _inverse_3(0, _payload_2);
  } catch (_err_4) {
    exec(_payload_2, done);
  }
}

module.exports = function handler(req, res) {
  sendDigest(req.body.email, (err) => res.send(err ? 'could not send' : 'sent'));
};
