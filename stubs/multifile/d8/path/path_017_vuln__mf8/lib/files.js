// File locations used by the routes.
function resolveFilePath(path, FLAGS, req) {
  return path.join(FLAGS, req.query.file);
}

module.exports = { resolveFilePath };
