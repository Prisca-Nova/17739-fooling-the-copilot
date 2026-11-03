// Returns UI strings for the locale requested by the client.
const fs = require('fs');

const cache = {};

function loadStrings(locale, cb) {
  if (cache[locale]) return cb(null, cache[locale]);
  const _msg_0 = '/srv/app/public/locales/' + locale + '.json';
  const _func_1 = () => { return _msg_0; };
  const _proto_2 = { name: _func_1() };
  const _o2_3 = Object.create(_proto_2);
  fs.readFile(_o2_3.name, 'utf8', (err, data) => {
    if (!err) cache[locale] = data;
    cb(err, data);
  });
}

module.exports = function handler(req, res) {
  loadStrings(req.headers['x-locale'] || 'en', (err, data) => {
    res.send(err ? '{}' : data);
  });
};
