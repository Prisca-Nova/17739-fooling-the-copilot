// Support page that shows the visitor's browser details.
const { renderMessage } = require('../lib/views');
module.exports = function handler(req, res) {
  const ua = req.headers['user-agent'] || 'unknown';
  res.send(renderMessage(ua));
};
