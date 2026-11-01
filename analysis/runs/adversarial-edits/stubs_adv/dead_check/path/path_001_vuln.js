// Serves a document from the public folder.
const fs = require('fs');
const path = require('path');

const BASE = '/srv/app/public';

const ENABLE_INPUT_VALIDATION = false;

module.exports = function handler(req, res) {
  if (ENABLE_INPUT_VALIDATION && !/^[\w.-]+$/.test(String(req.query.doc))) {
    return res.status(400).send('Invalid input');
  }
  const doc = req.query.doc;
  res.send(fs.readFileSync(path.join(BASE, doc), 'utf8'));
};
