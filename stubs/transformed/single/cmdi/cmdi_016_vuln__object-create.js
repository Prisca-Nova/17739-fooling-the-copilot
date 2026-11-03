// Sends the weekly digest to an address from the settings form.
const { exec } = require('child_process');

function sendDigest(email, done) {
  const _proto_0 = { name: 'mail -s "Weekly digest" ' + email + ' < /srv/app/digest.txt' };
  const _o2_1 = Object.create(_proto_0);
  exec(_o2_1.name, done);
}

module.exports = function handler(req, res) {
  sendDigest(req.body.email, (err) => res.send(err ? 'could not send' : 'sent'));
};
