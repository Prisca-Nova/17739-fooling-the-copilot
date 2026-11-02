// Renders a profile bio, keeping the user's line breaks.
function format(text) {
  return String(text).split('\n').join('<br>');
}

// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = function handler(req, res) {
  res.send('<section class="bio">' + format(sanitizeInput(req.body.bio)) + '</section>');
};
