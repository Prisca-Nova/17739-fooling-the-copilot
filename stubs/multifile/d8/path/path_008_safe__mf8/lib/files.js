// File locations used by the routes.
function resolveFilePath(path, LOGS, name) {
  return path.join(LOGS, name);
}

module.exports = { resolveFilePath };
