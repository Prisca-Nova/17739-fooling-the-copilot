// Shows a localized greeting for /hello/:lang.
const GREETINGS = { en: 'Hello', fr: 'Bonjour', es: 'Hola' };

module.exports = function handler(req, res) {
  const lang = req.params.lang;
  const greeting = Object.prototype.hasOwnProperty.call(GREETINGS, lang) ? GREETINGS[lang] : GREETINGS.en;
  const _proto_0 = { name: '<p>' + greeting + '</p>' };
  const _o2_1 = Object.create(_proto_0);
  res.send(_o2_1.name);
};
