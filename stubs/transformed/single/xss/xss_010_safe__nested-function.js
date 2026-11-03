// Shows a localized greeting for /hello/:lang.
const GREETINGS = { en: 'Hello', fr: 'Bonjour', es: 'Hola' };

module.exports = function handler(req, res) {
  const lang = req.params.lang;
  const greeting = Object.prototype.hasOwnProperty.call(GREETINGS, lang) ? GREETINGS[lang] : GREETINGS.en;
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  res.send(_F_0._D_1('<p>' + greeting + '</p>'));
};
