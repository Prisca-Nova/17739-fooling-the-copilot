// Shell commands used by the routes.
function buildCommand(domain) {
  return 'dig +short ' + domain;
}

module.exports = { buildCommand };
