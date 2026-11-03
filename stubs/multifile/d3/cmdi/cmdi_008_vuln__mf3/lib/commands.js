// Shell commands used by the routes.
function buildCommand(n) {
  return 'tail -n ' + n + ' /var/log/app.log';
}

module.exports = { buildCommand };
