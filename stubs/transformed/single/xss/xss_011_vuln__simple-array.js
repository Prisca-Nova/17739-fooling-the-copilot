// Previews a badge in the color the user picked.
module.exports = function handler(req, res) {
  const color = req.query.color || 'gray';
  const _arr_0 = ['a', 'b', `<span class="badge" style="background:${color}">New</span>`, 'c'];
  res.send(_arr_0[2]);
};
