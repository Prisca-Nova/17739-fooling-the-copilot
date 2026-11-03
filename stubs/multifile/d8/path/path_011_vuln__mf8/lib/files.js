// File locations used by the routes.
function resolveFilePath(AVATARS, name) {
  return `${AVATARS}/${name}.png`;
}

module.exports = { resolveFilePath };
