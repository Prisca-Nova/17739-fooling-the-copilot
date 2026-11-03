// File locations used by the routes.
function resolveFilePath(path, BASE, doc) {
  return path.resolve(BASE, doc);
}

module.exports = { resolveFilePath };
