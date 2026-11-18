// Previews a badge in the color the user picked.
module.exports = function handler(req, res) {
  const color = req.query.color || 'gray';
  res.send(`<span class="badge" style="background:${color}">New</span>`);
};
