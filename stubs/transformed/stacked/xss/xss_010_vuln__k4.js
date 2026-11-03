// Shows a localized greeting for /hello/:lang.
const GREETINGS = { en: 'Hello', fr: 'Bonjour', es: 'Hola' };

module.exports = function handler(req, res) {
  const lang = req.params.lang;
  const greeting = GREETINGS[lang] || lang;
  function _F_0() { function _D_1(arg) { return arg; } _F_0._D_1 = _D_1; }
  _F_0();
  var _x_2 = 5;
  let _payload_3 = _x_2 > 9 ? 'safe' : _F_0._D_1('<p>' + greeting + '</p>');
  function _inverse_4(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_4(5, _payload_3);
    _inverse_4(0, _payload_3);
  } catch (_err_5) {
    const _msg_6 = _payload_3;
    const _func_7 = () => { return _msg_6; };
    res.send(_func_7());
  }
};
