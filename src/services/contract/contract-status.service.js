// Initializes the `contract_status` service on path `/contract_status`
const createService = require('feathers-mongoose');
const createModel = require('../../models/contract-status.model');
const hooks = require('./contract-status.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/contract-status', createService(options));

  //Get our initialized service so that we can register hooks
  const service = app.service('contract-status');
  
  service.hooks(hooks);

  // re-export the status service on a nested route
  //app.use('/contract/:contractId/status', createService(options));
  //const service = app.service('contract-status');

  service.hooks(hooks);
    

};
