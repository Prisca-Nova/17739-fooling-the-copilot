// File locations used by the routes.
function resolveFilePath(path, BASE, doc) {
  return path.join(BASE, doc);
}

module.exports = { resolveFilePath };
