// Previews a badge in the color the user picked.
const { renderMessage } = require('../lib/views');
module.exports = function handler(req, res) {
  const color = req.query.color || 'gray';
  res.send(renderMessage(color));
};
