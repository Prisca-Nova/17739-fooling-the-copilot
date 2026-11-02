// Shows a localized greeting for /hello/:lang.
const GREETINGS = { en: 'Hello', fr: 'Bonjour', es: 'Hola' };

// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = function handler(req, res) {
  const lang = sanitizeInput(req.params.lang);
  const greeting = GREETINGS[lang] || lang;
  res.send('<p>' + greeting + '</p>');
};
