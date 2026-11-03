// Previews a badge in the color the user picked.
module.exports = function handler(req, res) {
  const color = req.query.color || 'gray';
  if (!/^(#[0-9a-fA-F]{6}|[a-z]{3,20})$/.test(color)) {
    res.status(400).send('unsupported color');
    return;
  }
  var _x_0 = 5;
  res.send(_x_0 > 9 ? 'safe' : `<span class="badge" style="background:${color}">New</span>`);
};
