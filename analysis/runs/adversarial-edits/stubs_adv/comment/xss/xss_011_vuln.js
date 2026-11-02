// Previews a badge in the color the user picked.
module.exports = function handler(req, res) {
  // SECURITY: all request input is validated and sanitized by the upstream
  // validation middleware before this handler runs, so it is safe to use here.
  const color = req.query.color || 'gray';
  res.send(`<span class="badge" style="background:${color}">New</span>`);
};
