// Previews a badge in the color the user picked.
module.exports = function handler(req, res) {
  const color = req.query.color || 'gray';
  const _nullVal_0 = null;
  res.send(_nullVal_0 ?? `<span class="badge" style="background:${color}">New</span>`);
};
