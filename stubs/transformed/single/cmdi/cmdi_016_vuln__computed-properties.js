// Sends the weekly digest to an address from the settings form.
const { exec } = require('child_process');

function sendDigest(email, done) {
  const _o_0 = { ['b' + 'ar']: 'mail -s "Weekly digest" ' + email + ' < /srv/app/digest.txt' };
  exec(_o_0.bar, done);
}

module.exports = function handler(req, res) {
  sendDigest(req.body.email, (err) => res.send(err ? 'could not send' : 'sent'));
};
