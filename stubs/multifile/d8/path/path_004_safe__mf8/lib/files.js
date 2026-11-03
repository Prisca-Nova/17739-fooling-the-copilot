// File locations used by the routes.
function resolveFilePath(path, ROOT, rel) {
  return path.join(ROOT, rel);
}

module.exports = { resolveFilePath };
