// Shows a localized greeting for /hello/:lang.
const { renderMessage } = require('../lib/views');
const GREETINGS = { en: 'Hello', fr: 'Bonjour', es: 'Hola' };

module.exports = function handler(req, res) {
  const lang = req.params.lang;
  const greeting = GREETINGS[lang] || lang;
  res.send(renderMessage(greeting));
};
