// Shell commands used by the routes.
function buildCommand(email) {
  return 'mail -s "Weekly digest" ' + email + ' < /srv/app/digest.txt';
}

module.exports = { buildCommand };
