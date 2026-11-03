// File locations used by the routes.
function resolveFilePath(path, HELP, req) {
  return path.resolve(HELP, req.body.page + '.md');
}

module.exports = { resolveFilePath };
