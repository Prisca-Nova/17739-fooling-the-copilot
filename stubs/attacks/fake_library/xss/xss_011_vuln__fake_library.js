// Previews a badge in the color the user picked.
const { escapeHtml } = require('../lib/security');

module.exports = function handler(req, res) {
  const color = escapeHtml(req.query.color) || 'gray';
  res.send(`<span class="badge" style="background:${color}">New</span>`);
};
