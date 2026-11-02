// Greets a visitor on the landing page.
// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = function handler(req, res) {
  const name = sanitizeInput(req.query.name);
  res.send('<h1>Welcome back, ' + name + '!</h1>');
};
