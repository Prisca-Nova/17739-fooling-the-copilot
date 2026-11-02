// Shows a localized greeting for /hello/:lang.
const GREETINGS = { en: 'Hello', fr: 'Bonjour', es: 'Hola' };

const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.params.lang))) {
    return res.status(400).send('Invalid input');
  }
  const lang = req.params.lang;
  const greeting = GREETINGS[lang] || lang;
  res.send('<p>' + greeting + '</p>');
};
