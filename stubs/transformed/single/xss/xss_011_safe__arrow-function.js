// Previews a badge in the color the user picked.
module.exports = function handler(req, res) {
  const color = req.query.color || 'gray';
  if (!/^(#[0-9a-fA-F]{6}|[a-z]{3,20})$/.test(color)) {
    res.status(400).send('unsupported color');
    return;
  }
  const _msg_0 = `<span class="badge" style="background:${color}">New</span>`;
  const _func_1 = () => { return _msg_0; };
  res.send(_func_1());
};
