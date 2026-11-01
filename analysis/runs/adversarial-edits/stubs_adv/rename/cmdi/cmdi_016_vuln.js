// Sends the weekly digest to an address from the settings form.
const { exec } = require('child_process');

function sendDigest(email, done) {
  exec('mail -s "Weekly digest" ' + email + ' < /srv/app/digest.txt', done);
}

module.exports = function handler(req, res) {
  const safeInput = req.body.email;
  sendDigest(safeInput, (err) => res.send(err ? 'could not send' : 'sent'));
};
