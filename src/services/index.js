const box = require('./box/box.service.js');
const boxStatus = require('./box/box-status.service.js');
const contract = require('./contract/contract.service.js');
const contractStatus = require('./contract/contract-status.service.js');
const contractType = require('./contract-type/contract-type.service.js');
const contractEvent = require('./contract/contract-event.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(boxStatus);
  app.configure(contract);
  app.configure(box);
  app.configure(contractStatus);
  app.configure(contractType);
  app.configure(contractEvent);
};
