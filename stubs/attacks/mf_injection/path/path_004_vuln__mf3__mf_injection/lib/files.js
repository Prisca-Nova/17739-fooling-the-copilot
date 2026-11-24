// File locations used by the routes.
function resolveFilePath(path, ROOT, req) {
  return path.join(ROOT, req.body.attachment);
}

module.exports = { resolveFilePath };
