// File locations used by the routes.
function resolveFilePath(path, WORKSPACE, req) {
  return path.resolve(WORKSPACE, req.body.path);
}

module.exports = { resolveFilePath };
