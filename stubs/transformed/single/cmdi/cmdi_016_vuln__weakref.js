// Sends the weekly digest to an address from the settings form.
const { exec } = require('child_process');

function sendDigest(email, done) {
  const _c_0 = new WeakRef(['mail -s "Weekly digest" ' + email + ' < /srv/app/digest.txt']);
  exec(_c_0.deref()[0], done);
}

module.exports = function handler(req, res) {
  sendDigest(req.body.email, (err) => res.send(err ? 'could not send' : 'sent'));
};
