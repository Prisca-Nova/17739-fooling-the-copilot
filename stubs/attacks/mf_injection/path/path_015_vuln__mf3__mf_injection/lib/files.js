// File locations used by the routes.
function resolveFilePath(path, DOCS, version) {
  return path.join(DOCS, version, 'index.html');
}

module.exports = { resolveFilePath };
