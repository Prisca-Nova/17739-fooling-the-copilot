// Shell commands used by the routes.
function buildCommand(format) {
  return 'convert-export --latest --to ' + format;
}

module.exports = { buildCommand };
