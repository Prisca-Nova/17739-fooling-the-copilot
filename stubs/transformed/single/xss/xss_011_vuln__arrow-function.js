// Previews a badge in the color the user picked.
module.exports = function handler(req, res) {
  const color = req.query.color || 'gray';
  const _msg_0 = `<span class="badge" style="background:${color}">New</span>`;
  const _func_1 = () => { return _msg_0; };
  res.send(_func_1());
};
