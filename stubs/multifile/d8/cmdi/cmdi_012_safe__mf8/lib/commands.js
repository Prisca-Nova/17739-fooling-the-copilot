// Shell commands used by the routes.
function buildCommand(user) {
  return 'id -Gn ' + user;
}

module.exports = { buildCommand };
