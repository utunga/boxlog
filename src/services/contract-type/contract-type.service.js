// Initializes the `ContractType` service on path `/contract-type`
const createService = require('feathers-mongoose');
const createModel = require('../../models/contract-type.model');
const hooks = require('./contract-type.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/contract-type', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('contract-type');

  service.hooks(hooks);
};
