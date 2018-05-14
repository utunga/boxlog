const boxstatus = require('./boxstatus/boxstatus.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(boxstatus);
};
