// File locations used by the routes.
function resolveFilePath(file) {
  return '/srv/app/public/invoices/' + file;
}

module.exports = { resolveFilePath };
