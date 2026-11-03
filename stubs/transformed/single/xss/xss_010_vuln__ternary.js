// Shows a localized greeting for /hello/:lang.
const GREETINGS = { en: 'Hello', fr: 'Bonjour', es: 'Hola' };

module.exports = function handler(req, res) {
  const lang = req.params.lang;
  const greeting = GREETINGS[lang] || lang;
  var _x_0 = 5;
  res.send(_x_0 > 9 ? 'safe' : ('<p>' + greeting + '</p>'));
};
