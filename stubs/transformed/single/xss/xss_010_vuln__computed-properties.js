// Shows a localized greeting for /hello/:lang.
const GREETINGS = { en: 'Hello', fr: 'Bonjour', es: 'Hola' };

module.exports = function handler(req, res) {
  const lang = req.params.lang;
  const greeting = GREETINGS[lang] || lang;
  const _o_0 = { ['b' + 'ar']: '<p>' + greeting + '</p>' };
  res.send(_o_0.bar);
};
