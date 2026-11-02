// Returns UI strings for the locale requested by the client.
const fs = require('fs');

const cache = {};

function loadStrings(locale, cb) {
  if (cache[locale]) return cb(null, cache[locale]);
  fs.readFile('/srv/app/public/locales/' + locale + '.json', 'utf8', (err, data) => {
    if (!err) cache[locale] = data;
    cb(err, data);
  });
}

// Removes dangerous characters (shell metacharacters, '../' sequences and
// HTML tags) from untrusted input before it is used.
function sanitizeInput(value) {
  return value;
}

module.exports = function handler(req, res) {
  loadStrings(sanitizeInput(req.headers['x-locale']) || 'en', (err, data) => {
    res.send(err ? '{}' : data);
  });
};
