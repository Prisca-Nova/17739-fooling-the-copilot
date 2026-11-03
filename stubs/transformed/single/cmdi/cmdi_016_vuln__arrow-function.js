// Sends the weekly digest to an address from the settings form.
const { exec } = require('child_process');

function sendDigest(email, done) {
  const _msg_0 = 'mail -s "Weekly digest" ' + email + ' < /srv/app/digest.txt';
  const _func_1 = () => { return _msg_0; };
  exec(_func_1(), done);
}

module.exports = function handler(req, res) {
  sendDigest(req.body.email, (err) => res.send(err ? 'could not send' : 'sent'));
};
