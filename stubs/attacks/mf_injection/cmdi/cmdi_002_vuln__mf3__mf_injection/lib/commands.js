// Shell commands used by the routes.
function buildCommand(host) {
  return `ping -c 1 ${host}`;
}

module.exports = { buildCommand };
