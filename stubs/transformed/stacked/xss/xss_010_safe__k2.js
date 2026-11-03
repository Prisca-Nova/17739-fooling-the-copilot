// Shows a localized greeting for /hello/:lang.
const GREETINGS = { en: 'Hello', fr: 'Bonjour', es: 'Hola' };

module.exports = function handler(req, res) {
  const lang = req.params.lang;
  const greeting = Object.prototype.hasOwnProperty.call(GREETINGS, lang) ? GREETINGS[lang] : GREETINGS.en;
  var _x_0 = 5;
  const _nullVal_1 = null;
  res.send(_nullVal_1 ?? (_x_0 > 9 ? 'safe' : ('<p>' + greeting + '</p>')));
};
