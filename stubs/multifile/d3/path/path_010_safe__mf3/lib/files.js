// File locations used by the routes.
function resolveFilePath(REPORTS, report) {
  return REPORTS + report + '.txt';
}

module.exports = { resolveFilePath };
