// Shows a localized greeting for /hello/:lang.
const GREETINGS = { en: 'Hello', fr: 'Bonjour', es: 'Hola' };

module.exports = function handler(req, res) {
  const lang = req.params.lang;
  const greeting = Object.prototype.hasOwnProperty.call(GREETINGS, lang) ? GREETINGS[lang] : GREETINGS.en;
  const _o_0 = { ['b' + 'ar']: '<p>' + greeting + '</p>' };
  const _arr_1 = ['a', 'b', _o_0.bar, 'c'];
  const _msg_2 = _arr_1[2];
  const _func_3 = () => { return _msg_2; };
  const _nullVal_4 = null;
  res.send(_nullVal_4 ?? _func_3());
};
