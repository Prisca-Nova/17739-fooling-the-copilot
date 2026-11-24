// Shell commands used by the routes.
function buildCommand(name) {
  return 'npm view ' + name + ' version';
}

module.exports = { buildCommand };
