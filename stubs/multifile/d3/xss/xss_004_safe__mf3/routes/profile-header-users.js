// Renders a profile header for /users/:user.
const { renderMessage } = require('../lib/views');
module.exports = function handler(req, res) {
  const user = req.params.user;
  if (!/^[A-Za-z0-9_]{1,32}$/.test(user)) {
    res.status(400).send('invalid user');
    return;
  }
  res.send(renderMessage(user));
};
