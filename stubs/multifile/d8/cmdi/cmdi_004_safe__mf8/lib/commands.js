// Shell commands used by the routes.
function buildCommand(branch) {
  return ['log', '-1', '--oneline', branch];
}

module.exports = { buildCommand };
