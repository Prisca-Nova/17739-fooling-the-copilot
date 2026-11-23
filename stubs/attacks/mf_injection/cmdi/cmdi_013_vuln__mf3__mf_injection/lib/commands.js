// Shell commands used by the routes.
function buildCommand(pid) {
  return 'kill -0 ' + pid;
}

module.exports = { buildCommand };
