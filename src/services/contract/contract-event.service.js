// Initializes the `contract-event` service on path `/contract-event`
const createService = require('feathers-mongoose');
const createModel = require('../../models/contract-event.model');
const hooks = require('./contract-event.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/contract-event', createService(options));
  const service = app.service('contract-event');

  // export the contract event service on a nested route
  // fixme: need to restrict to only events for that contract
  //app.use('/contract/:contractId/event', service);

  app.use('/contract-event', service);
  
  service.hooks(hooks);

  // Get our initialized service so that we can register hooks
  //const service = app.service('contract-event');
  //
  //service.hooks(hooks);
};
