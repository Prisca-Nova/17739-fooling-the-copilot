// Shell commands used by the routes.
function buildCommand(size) {
  return `convert uploads/latest.png -resize ${size} uploads/thumb.png`;
}

module.exports = { buildCommand };
