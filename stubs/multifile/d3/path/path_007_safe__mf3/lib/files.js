// File locations used by the routes.
function resolveFilePath(path, name) {
  return '/srv/app/public/templates/' + path.basename(name);
}

module.exports = { resolveFilePath };
