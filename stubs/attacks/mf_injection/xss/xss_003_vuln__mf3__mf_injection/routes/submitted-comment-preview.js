// Echoes a submitted comment back as a preview.
const { renderMessage } = require('../lib/views');
module.exports = function handler(req, res) {
  const comment = renderMessage(req);
  res.write('<div class="preview">');
  res.write(comment);
  res.end('</div>');
};
