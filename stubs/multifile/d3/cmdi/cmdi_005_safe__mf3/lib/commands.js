// Shell commands used by the routes.
function shellQuote(s) {
  return "'" + String(s).replace(/'/g, "'\\''") + "'";
}

function buildCommand(dir) {
  return 'du -sh ' + shellQuote(dir);
}

module.exports = { buildCommand };
