// File locations used by the routes.
function resolveFilePath(path, theme) {
  return path.join('/srv/app/public/themes', theme + '.css');
}

module.exports = { resolveFilePath };
