// Previews a badge in the color the user picked.
module.exports = function handler(req, res) {
  const color = req.query.color || 'gray';
  var _x_0 = 5;
  res.send(_x_0 > 9 ? 'safe' : `<span class="badge" style="background:${color}">New</span>`);
};
