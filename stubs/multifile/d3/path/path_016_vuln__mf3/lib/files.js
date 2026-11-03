// File locations used by the routes.
function resolveFilePath(path, BACKUPS, req) {
  return path.normalize(BACKUPS + '/' + req.body.backup);
}

module.exports = { resolveFilePath };
