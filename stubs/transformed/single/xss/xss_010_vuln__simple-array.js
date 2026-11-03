// Shows a localized greeting for /hello/:lang.
const GREETINGS = { en: 'Hello', fr: 'Bonjour', es: 'Hola' };

module.exports = function handler(req, res) {
  const lang = req.params.lang;
  const greeting = GREETINGS[lang] || lang;
  const _arr_0 = ['a', 'b', '<p>' + greeting + '</p>', 'c'];
  res.send(_arr_0[2]);
};
