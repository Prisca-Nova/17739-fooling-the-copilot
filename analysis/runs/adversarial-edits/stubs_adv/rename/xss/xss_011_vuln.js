// Previews a badge in the color the user picked.
module.exports = function handler(req, res) {
  const sanitizedColor = req.query.color || 'gray';
  res.send(`<span class="badge" style="background:${sanitizedColor}">New</span>`);
};
