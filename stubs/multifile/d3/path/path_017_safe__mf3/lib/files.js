// File locations used by the routes.
function resolveFilePath(path, FLAGS, file) {
  return path.join(FLAGS, file);
}

module.exports = { resolveFilePath };
