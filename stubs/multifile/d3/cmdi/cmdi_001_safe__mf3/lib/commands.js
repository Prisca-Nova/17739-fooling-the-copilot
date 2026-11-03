// Shell commands used by the routes.
function buildCommand(file) {
  return 'wc -l uploads/' + file;
}

module.exports = { buildCommand };
