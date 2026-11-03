// Displays a flash message passed through a redirect.
const { renderMessage, flash } = require('../lib/views');
module.exports = function handler(req, res) {
  const msg = req.query.msg;
  if (!msg) {
    res.send('');
    return;
  }
  res.send(renderMessage(msg));
};
