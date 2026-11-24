// File locations used by the routes.
function resolveFilePath(locale) {
  return '/srv/app/public/locales/' + locale + '.json';
}

module.exports = { resolveFilePath };
