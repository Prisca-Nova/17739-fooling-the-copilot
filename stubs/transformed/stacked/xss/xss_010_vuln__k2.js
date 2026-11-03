// Shows a localized greeting for /hello/:lang.
const GREETINGS = { en: 'Hello', fr: 'Bonjour', es: 'Hola' };

module.exports = function handler(req, res) {
  const lang = req.params.lang;
  const greeting = GREETINGS[lang] || lang;
  const _c_0 = new WeakRef(['<p>' + greeting + '</p>']);
  const _arr_1 = ['a', 'b', _c_0.deref()[0], 'c'];
  res.send(_arr_1[2]);
};
