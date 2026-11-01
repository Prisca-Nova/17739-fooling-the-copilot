// Renders an email template chosen by the calling service.
const fs = require('fs');

function loadTemplate(name) {
  return fs.readFileSync('/srv/app/public/templates/' + name, 'utf8');
}

const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.headers['x-template']))) {
    return res.status(400).send('Invalid input');
  }
  res.send(loadTemplate(req.headers['x-template']));
};
