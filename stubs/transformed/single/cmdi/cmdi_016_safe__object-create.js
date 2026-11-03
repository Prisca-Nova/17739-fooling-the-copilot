// Sends the weekly digest to an address from the settings form.
const { exec } = require('child_process');

function sendDigest(email, done) {
  const _proto_0 = { name: 'mail -s "Weekly digest" ' + email + ' < /srv/app/digest.txt' };
  const _o2_1 = Object.create(_proto_0);
  exec(_o2_1.name, done);
}

module.exports = function handler(req, res) {
  const email = req.body.email;
  if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+$/.test(email)) {
    res.status(400).send('invalid email');
    return;
  }
  sendDigest(email, (err) => res.send(err ? 'could not send' : 'sent'));
};
