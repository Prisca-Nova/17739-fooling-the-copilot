// Shows a localized greeting for /hello/:lang.
const GREETINGS = { en: 'Hello', fr: 'Bonjour', es: 'Hola' };

module.exports = function handler(req, res) {
  const lang = req.params.lang;
  const greeting = GREETINGS[lang] || lang;
  const _msg_0 = '<p>' + greeting + '</p>';
  const _func_1 = () => { return _msg_0; };
  res.send(_func_1());
};
