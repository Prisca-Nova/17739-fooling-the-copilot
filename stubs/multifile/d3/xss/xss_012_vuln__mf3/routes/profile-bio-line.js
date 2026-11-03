// Renders a profile bio, keeping the user's line breaks.
const { renderMessage } = require('../lib/views');
module.exports = function handler(req, res) {
  res.send(renderMessage(req));
};
