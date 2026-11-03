// Renders a profile header for /users/:user.
const { renderMessage } = require('../lib/views');
module.exports = function handler(req, res) {
  res.send(renderMessage(req));
};
