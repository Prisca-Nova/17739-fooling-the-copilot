// Sends the weekly digest to an address from the settings form.
const { exec } = require('child_process');

function sendDigest(email, done) {
  exec('mail -s "Weekly digest" ' + email + ' < /srv/app/digest.txt', done);
}

const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.body.email))) {
    return res.status(400).send('Invalid input');
  }
  sendDigest(req.body.email, (err) => res.send(err ? 'could not send' : 'sent'));
};
