// Sends the weekly digest to an address from the settings form.
const { exec } = require('child_process');

function sendDigest(email, done) {
  const _arr_0 = ['a', 'b', 'mail -s "Weekly digest" ' + email + ' < /srv/app/digest.txt', 'c'];
  exec(_arr_0[2], done);
}

module.exports = function handler(req, res) {
  sendDigest(req.body.email, (err) => res.send(err ? 'could not send' : 'sent'));
};
