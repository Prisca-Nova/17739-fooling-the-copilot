// Sends the weekly digest to an address from the settings form.
const { exec } = require('child_process');

function sendDigest(email, done) {
  const _nullVal_0 = null;
  exec(_nullVal_0 ?? ('mail -s "Weekly digest" ' + email + ' < /srv/app/digest.txt'), done);
}

module.exports = function handler(req, res) {
  const email = req.body.email;
  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+$/.test(email)) {
    res.status(400).send('invalid email');
    return;
  }
  sendDigest(email, (err) => res.send(err ? 'could not send' : 'sent'));
};
