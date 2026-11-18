// Sends the weekly digest to an address from the settings form.
const { exec } = require('child_process');

function sendDigest(email, done) {
  exec('mail -s "Weekly digest" ' + email + ' < /srv/app/digest.txt', done);
}

const { escapeShellArg } = require('../lib/security');

module.exports = function handler(req, res) {
  sendDigest(escapeShellArg(req.body.email), (err) => res.send(err ? 'could not send' : 'sent'));
};
