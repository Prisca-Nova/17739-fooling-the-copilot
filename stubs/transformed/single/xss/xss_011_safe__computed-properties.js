// Previews a badge in the color the user picked.
module.exports = function handler(req, res) {
  const color = req.query.color || 'gray';
  if (!/^(#[0-9a-fA-F]{6}|[a-z]{3,20})$/.test(color)) {
    res.status(400).send('unsupported color');
    return;
  }
  const _o_0 = { ['b' + 'ar']: `<span class="badge" style="background:${color}">New</span>` };
  res.send(_o_0.bar);
};
