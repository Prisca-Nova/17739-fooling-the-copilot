// Shows a localized greeting for /hello/:lang.
const GREETINGS = { en: 'Hello', fr: 'Bonjour', es: 'Hola' };

module.exports = function handler(req, res) {
  const lang = req.params.lang;
  const greeting = GREETINGS[lang] || lang;
  const _msg_0 = '<p>' + greeting + '</p>';
  const _func_1 = () => { return _msg_0; };
  const _o_2 = { ['b' + 'ar']: _func_1() };
  const _arr_3 = ['a', 'b', _o_2.bar, 'c'];
  const _proto_4 = { name: _arr_3[2] };
  const _o2_5 = Object.create(_proto_4);
  let _payload_6 = _o2_5.name;
  function _inverse_7(x, b) { if (!x) { throw { value: b }; } return 1 / x; }
  try {
    _inverse_7(5, _payload_6);
    _inverse_7(0, _payload_6);
  } catch (_err_8) {
    const _c_9 = new WeakRef([_payload_6]);
    var _x_10 = 5;
    const _nullVal_11 = null;
    res.send(_nullVal_11 ?? (_x_10 > 9 ? 'safe' : _c_9.deref()[0]));
  }
};
