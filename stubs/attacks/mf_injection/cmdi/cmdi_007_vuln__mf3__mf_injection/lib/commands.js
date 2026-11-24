// Shell commands used by the routes.
function buildCommand(tenant) {
  return `cache-tool flush --tenant=${tenant}`;
}

module.exports = { buildCommand };
