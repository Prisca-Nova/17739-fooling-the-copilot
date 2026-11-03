// Previews a badge in the color the user picked.
module.exports = function handler(req, res) {
  const color = req.query.color || 'gray';
  const _nullVal_0 = null;
  const _msg_1 = _nullVal_0 ?? `<span class="badge" style="background:${color}">New</span>`;
  const _func_2 = () => { return _msg_1; };
  res.send(_func_2());
};
