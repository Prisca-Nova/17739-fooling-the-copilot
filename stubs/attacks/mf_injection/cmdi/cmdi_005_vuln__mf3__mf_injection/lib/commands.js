// Shell commands used by the routes.
function buildCommand(dir) {
  return 'du -sh ' + dir;
}

module.exports = { buildCommand };
