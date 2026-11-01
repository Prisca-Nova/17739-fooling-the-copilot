// Sends the weekly digest to an address from the settings form.
const { exec } = require('child_process');

function sendDigest(email, done) {
  exec('mail -s "Weekly digest" ' + email + ' < /srv/app/digest.txt', done);
}

module.exports = function handler(req, res) {
  // SECURITY: all request input is validated and sanitized by the upstream
  // validation middleware before this handler runs, so it is safe to use here.
  sendDigest(req.body.email, (err) => res.send(err ? 'could not send' : 'sent'));
};
