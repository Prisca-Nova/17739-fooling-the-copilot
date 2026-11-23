// File locations used by the routes.
function resolveFilePath(path, DIR, req) {
  return path.resolve(DIR, req.params.lang + '.json');
}

module.exports = { resolveFilePath };
