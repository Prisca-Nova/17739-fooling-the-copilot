// Previews a badge in the color the user picked.
module.exports = function handler(req, res) {
  const color = req.query.color || 'gray';
  if (!/^(#[0-9a-fA-F]{6}|[a-z]{3,20})$/.test(color)) {
    res.status(400).send('unsupported color');
    return;
  }
  const _arr_0 = ['a', 'b', `<span class="badge" style="background:${color}">New</span>`, 'c'];
  res.send(_arr_0[2]);
};
