// Shell commands used by the routes.
function buildCommand(archive) {
  return 'tar -tf uploads/' + archive;
}

module.exports = { buildCommand };
