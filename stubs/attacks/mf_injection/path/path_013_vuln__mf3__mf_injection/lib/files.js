// File locations used by the routes.
function resolveFilePath(SHARED, req) {
  return SHARED + '/' + req.params.file;
}

module.exports = { resolveFilePath };
