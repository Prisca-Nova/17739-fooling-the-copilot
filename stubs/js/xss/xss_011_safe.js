// Previews a badge in the color the user picked.
module.exports = function handler(req, res) {
  const color = req.query.color || 'gray';
  if (!/^(#[0-9a-fA-F]{6}|[a-z]{3,20})$/.test(color)) {
    res.status(400).send('unsupported color');
    return;
  }
  res.send(`<span class="badge" style="background:${color}">New</span>`);
};
