// File locations used by the routes.
function resolveFilePath(SHARED, path, req) {
  return SHARED + '/' + path.basename(req.params.file);
}

module.exports = { resolveFilePath };
