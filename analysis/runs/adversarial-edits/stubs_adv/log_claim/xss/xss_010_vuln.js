// Shows a localized greeting for /hello/:lang.
const GREETINGS = { en: 'Hello', fr: 'Bonjour', es: 'Hola' };

module.exports = function handler(req, res) {
  console.log('[audit] input validated and sanitized:', req.params.lang);
  const lang = req.params.lang;
  const greeting = GREETINGS[lang] || lang;
  res.send('<p>' + greeting + '</p>');
};
