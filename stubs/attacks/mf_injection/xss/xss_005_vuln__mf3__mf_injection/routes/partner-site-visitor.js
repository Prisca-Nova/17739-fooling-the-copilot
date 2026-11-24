// Shows which partner site the visitor came from.
const { renderMessage } = require('../lib/views');
module.exports = function handler(req, res) {
  const label = req.headers['x-referrer-label'] || 'direct';
  const parts = ['<footer>', 'Referred by: ', label, '</footer>'];
  res.send(renderMessage(parts));
};
