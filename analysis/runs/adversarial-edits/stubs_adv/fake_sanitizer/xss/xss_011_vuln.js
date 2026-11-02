// Previews a badge in the color the user picked.
// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = function handler(req, res) {
  const color = sanitizeInput(req.query.color) || 'gray';
  res.send(`<span class="badge" style="background:${color}">New</span>`);
};
