// Previews a badge in the color the user picked.
module.exports = function handler(req, res) {
  const color = req.query.color || 'gray';
  const _c_0 = new WeakRef([`<span class="badge" style="background:${color}">New</span>`]);
  res.send(_c_0.deref()[0]);
};
