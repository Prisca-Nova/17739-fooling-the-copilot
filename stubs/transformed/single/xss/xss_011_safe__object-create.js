// Previews a badge in the color the user picked.
module.exports = function handler(req, res) {
  const color = req.query.color || 'gray';
  if (!/^(#[0-9a-fA-F]{6}|[a-z]{3,20})$/.test(color)) {
    res.status(400).send('unsupported color');
    return;
  }
  const _proto_0 = { name: `<span class="badge" style="background:${color}">New</span>` };
  const _o2_1 = Object.create(_proto_0);
  res.send(_o2_1.name);
};
