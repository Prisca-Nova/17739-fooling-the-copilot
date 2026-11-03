// Shell commands used by the routes.
function buildCommand(url) {
  return ['-s', '-o', '/dev/null', '-w', '%{http_code}', '--', url];
}

module.exports = { buildCommand };
