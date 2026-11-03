// Shell commands used by the routes.
function buildCommand(name) {
  return ['view', name, 'version'];
}

module.exports = { buildCommand };
