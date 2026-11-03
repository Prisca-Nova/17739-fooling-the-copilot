// Shows a localized greeting for /hello/:lang.
const GREETINGS = { en: 'Hello', fr: 'Bonjour', es: 'Hola' };

module.exports = function handler(req, res) {
  const lang = req.params.lang;
  const greeting = Object.prototype.hasOwnProperty.call(GREETINGS, lang) ? GREETINGS[lang] : GREETINGS.en;
  let _payload_0 = '<p>' + greeting + '</p>';
  function _inverse_1(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_1(5, _payload_0);
    _inverse_1(0, _payload_0);
  } catch (_err_2) {
    res.send(_payload_0);
  }
};
