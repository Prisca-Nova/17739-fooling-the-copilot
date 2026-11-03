// Shows a localized greeting for /hello/:lang.
const GREETINGS = { en: 'Hello', fr: 'Bonjour', es: 'Hola' };

module.exports = function handler(req, res) {
  const lang = req.params.lang;
  const greeting = Object.prototype.hasOwnProperty.call(GREETINGS, lang) ? GREETINGS[lang] : GREETINGS.en;
  const _c_0 = new WeakRef(['<p>' + greeting + '</p>']);
  function _F_1() { function _D_2(arg) { return arg; } _F_1._D_2 = _D_2; }
  _F_1();
  const _nullVal_3 = null;
  const _proto_4 = { name: _nullVal_3 ?? _F_1._D_2(_c_0.deref()[0]) };
  const _o2_5 = Object.create(_proto_4);
  let _payload_6 = _o2_5.name;
  function _inverse_7(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_7(5, _payload_6);
    _inverse_7(0, _payload_6);
  } catch (_err_8) {
    const _arr_9 = ['a', 'b', _payload_6, 'c'];
    const _msg_10 = _arr_9[2];
    const _func_11 = () => { return _msg_10; };
    const _o_12 = { ['b' + 'ar']: _func_11() };
    res.send(_o_12.bar);
  }
};
