// Shell commands used by the routes.
function buildCommand(pattern) {
  return ['-c', '-e', pattern, '/var/log/app.log'];
}

module.exports = { buildCommand };
