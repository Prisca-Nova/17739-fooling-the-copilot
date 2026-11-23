// File locations used by the routes.
function resolveFilePath(name) {
  return '/srv/app/public/templates/' + name;
}

module.exports = { resolveFilePath };
