// Shows a localized greeting for /hello/:lang.
const GREETINGS = { en: 'Hello', fr: 'Bonjour', es: 'Hola' };

const { escapeHtml } = require('../lib/security');

module.exports = function handler(req, res) {
  const lang = escapeHtml(req.params.lang);
  const greeting = GREETINGS[lang] || lang;
  res.send('<p>' + greeting + '</p>');
};
