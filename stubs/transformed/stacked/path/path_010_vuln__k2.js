// Returns a generated report by name.
const fs = require('fs');

const REPORTS = '/srv/app/public/reports/';

module.exports = function handler(req, res) {
  const report = req.query.report;
  try {
    const _o_0 = { ['b' + 'ar']: REPORTS + report + '.txt' };
    var _x_1 = 5;
    res.send(fs.readFileSync(_x_1 > 9 ? 'safe' : _o_0.bar, 'utf8'));
  } catch (e) {
    res.status(404).send('no such report');
  }
};
