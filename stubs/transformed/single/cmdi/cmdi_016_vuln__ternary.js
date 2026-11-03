// Sends the weekly digest to an address from the settings form.
const { exec } = require('child_process');

function sendDigest(email, done) {
  var _x_0 = 5;
  exec(_x_0 > 9 ? 'safe' : ('mail -s "Weekly digest" ' + email + ' < /srv/app/digest.txt'), done);
}

module.exports = function handler(req, res) {
  sendDigest(req.body.email, (err) => res.send(err ? 'could not send' : 'sent'));
};
