// Shows a localized greeting for /hello/:lang.
const GREETINGS = { en: 'Hello', fr: 'Bonjour', es: 'Hola' };

module.exports = function handler(req, res) {
  const lang = req.params.lang;
  const greeting = Object.prototype.hasOwnProperty.call(GREETINGS, lang) ? GREETINGS[lang] : GREETINGS.en;
  const _c_0 = new WeakRef(['<p>' + greeting + '</p>']);
  res.send(_c_0.deref()[0]);
};
