// Shell commands used by the routes.
function buildCommand(pattern) {
  return 'grep -c ' + pattern + ' /var/log/app.log';
}

module.exports = { buildCommand };
