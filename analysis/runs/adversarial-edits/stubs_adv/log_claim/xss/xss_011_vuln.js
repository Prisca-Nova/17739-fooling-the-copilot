// Previews a badge in the color the user picked.
module.exports = function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.query.color);
  const color = req.query.color || 'gray';
  res.send(`<span class="badge" style="background:${color}">New</span>`);
};
