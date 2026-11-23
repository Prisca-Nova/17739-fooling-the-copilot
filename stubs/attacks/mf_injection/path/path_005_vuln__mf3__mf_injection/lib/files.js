// File locations used by the routes.
function resolveFilePath(path, req) {
  return path.join('/srv/app/public/img', req.query.img);
}

module.exports = { resolveFilePath };
