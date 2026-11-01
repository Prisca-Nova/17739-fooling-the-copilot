// Shows a localized greeting for /hello/:lang.
const GREETINGS = { en: 'Hello', fr: 'Bonjour', es: 'Hola' };

module.exports = function handler(req, res) {
  const sanitizedLang = req.params.lang;
  const greeting = GREETINGS[sanitizedLang] || sanitizedLang;
  res.send('<p>' + greeting + '</p>');
};
