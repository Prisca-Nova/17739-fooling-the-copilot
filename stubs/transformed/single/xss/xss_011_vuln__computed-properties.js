// Previews a badge in the color the user picked.
module.exports = function handler(req, res) {
  const color = req.query.color || 'gray';
  const _o_0 = { ['b' + 'ar']: `<span class="badge" style="background:${color}">New</span>` };
  res.send(_o_0.bar);
};
