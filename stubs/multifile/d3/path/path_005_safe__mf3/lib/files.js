// File locations used by the routes.
function resolveFilePath(path, name) {
  return path.join('/srv/app/public/img', name);
}

module.exports = { resolveFilePath };
